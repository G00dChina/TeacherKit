# coding=utf-8
import sys
import os
import os.path
import codecs
import json
import gc
import imp
import re
from file import File

BASE_PATH = os.path.abspath(os.path.dirname(__file__))
is_python3 = sys.version_info[0] > 2

core_files = ['emmet-app.js', 'python-wrapper.js']

def should_use_unicode():
	"""
	WinXP unable to eval JS in unicode object (while other OSes requires it)
	This function checks if we have to use unicode when reading files
	"""
	ctx = PyV8.JSContext()
	ctx.enter()
	use_unicode = True
	try:
		ctx.eval(u'(function(){return;})()')
	except:
		use_unicode = False

	ctx.leave()

	return use_unicode

def make_path(filename):
	return os.path.normpath(os.path.join(BASE_PATH, filename))

def js_log(message):
	print(message)

def import_pyv8():
	# Importing non-existing modules is a bit tricky in Python:
	# if we simply call `import PyV8` and module doesn't exists,
	# Python will cache this failed import and will always
	# throw exception even if this module appear in PYTHONPATH.
	# To prevent this, we have to manually test if 
	# PyV8.py(c) exists in PYTHONPATH before importing PyV8
	if 'PyV8' in sys.modules and 'PyV8' not in globals():
		# PyV8 was loaded by ST2, create global alias
		globals()['PyV8'] = __import__('PyV8')
		return

	loaded = False
	f, pathname, description = imp.find_module('PyV8')
	bin_f, bin_pathname, bin_description = imp.find_module('_PyV8')
	if f:
		try:
			imp.acquire_lock()
			globals()['_PyV8'] = imp.load_module('_PyV8', bin_f, bin_pathname, bin_description)
			globals()['PyV8'] = imp.load_module('PyV8', f, pathname, description)
			imp.release_lock()
			loaded = True
		finally:
			# Since we may exit via an exception, close fp explicitly.
			if f:
				f.close()
			if bin_f:
				bin_f.close()

	if not loaded:
		raise ImportError('No PyV8 module found')
	

class Context():
	"""
	Creates Emmet JS core context.
	Before instantiating this class, make sure PyV8
	is available in `sys.path`
	
	@param files: Additional files to load with JS core
	@param path: Path to Emmet extensions
	@param contrib: Python objects to contribute to JS execution context
	@param pyv8_path: Location of PyV8 binaries
	"""
	def __init__(self, files=[], ext_path=None, contrib=None, logger=None):
		self.logger = logger

		try:
			import_pyv8()
		except ImportError as e:
			pass

		self._ctx = None
		self._contrib = contrib
		self._should_load_extension = True

		# detect reader encoding
		self._use_unicode = None
		self._core_files = [] + core_files + files

		self._ext_path = None
		self.set_ext_path(ext_path)
		self._user_data = None

	def log(self, message):
		if self.logger:
			self.logger(message)
		
	def get_ext_path(self):
		return self._ext_path

	def set_ext_path(self, val):
		try:
			if val and val[:1] == '~':
				val = os.path.expanduser(val)

			val = os.path.abspath(val)
		except Exception as e:
			return

		if val == self._ext_path:
			return

		self._ext_path = val
		self.reset()

	def load_extensions(self, path=None):
		if path is None:
			path = self._ext_path;

		if path and os.path.isdir(path):
			ext_files = []
			self.log('Loading Emmet extensions from %s' % self._ext_path)
			for dirname, dirnames, filenames in os.walk(self._ext_path):
				for filename in filenames:
					ext_files.append(os.path.join(dirname, filename))

			self.js().locals.pyLoadExtensions(ext_files)

	def js(self):
		"Returns JS context"
		if not self._ctx:
			try:
				import_pyv8()
			except ImportError as e:
				return None 

			if 'PyV8' not in sys.modules:
				# Binary is not available yet
				return None

			if self._use_unicode is None:
				self._use_unicode = should_use_unicode()

			glue = u'\n' if self._use_unicode else '\n'
			core_src = [self.read_js_file(make_path(f)) for f in self._core_files]
			
			self._ctx = PyV8.JSContext()
			self._ctx.enter()
			self._ctx.eval(glue.join(core_src))

			# load default snippets
			self._ctx.locals.pyLoadSystemSnippets(self.read_js_file(make_path('snippets.json')))

			# expose some methods
			self._ctx.locals.log = js_log
			self._ctx.locals.pyFile = File()

			if self._contrib:
				for k in self._contrib:
					self._ctx.locals[k] = self._contrib[k]

		if self._should_load_extension:
			self._ctx.locals.pyResetUserData()
			self._should_load_extension = False
			self.load_extensions()

		if self._user_data:
			self._ctx.locals.pyLoadUserData(self._user_data)
			self._user_data = None

		return self._ctx

	def load_user_data(self, data):
		"Loads user data payload from JSON"
		self._user_data = data
		# self.js().locals.pyLoadUserData(data)

	def reset(self):
		"Resets JS execution context"
		if self._ctx:
			self._ctx.leave()
			self._ctx = None
			PyV8.JSEngine.collect()
			gc.collect()

		self._should_load_extension = True

	def read_js_file(self, file_path):
		if self._use_unicode:
			f = codecs.open(file_path, 'r', 'utf-8')
		else:
			f = open(file_path, 'r')

		content = f.read()
		f.close()

		return content

	def eval(self, source):
		self.js().eval(source)

	def eval_js_file(self, file_path):
		self.eval(self.read_js_file(file_path))
