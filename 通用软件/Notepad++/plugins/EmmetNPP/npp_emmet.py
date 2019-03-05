import Npp
import sys
import os.path
import PyV8
from emmet.context import Context

BASE_PATH = os.path.abspath(os.path.dirname(__file__))
EXT_PATH = os.path.join(Npp.notepad.getPluginConfigDir(), 'emmet')
UTF8_ENC = 65001

def is_utf8_doc():
	return Npp.editor.getCodePage() == UTF8_ENC

def decoded_content():
	text = Npp.editor.getText()
	return text.decode('utf8' if is_utf8_doc() else 'latin-1')

def char_to_byte(pos):
	if pos == 0:
		return 0;

	text = decoded_content()
	text_len = len(text)
	if pos > text_len:
		pos = text_len

	substr = text[0:pos]
	char_pos = len(substr.encode('utf8') if is_utf8_doc() else substr)
	return char_pos

def byte_to_char(pos):
	if pos == 0:
		return 0;

	text = decoded_content()
	offset = 0
	for i, ch in enumerate(text):
		if pos <= offset:
			return i

		offset += len(ch.encode('utf8') if is_utf8_doc() else ch)

	return len(text)

# provide some contributions to JS
contrib = {
	'notepad': Npp.notepad,
	'console': Npp.console,
	'editor': Npp.editor,
	'Npp': Npp,
	'ctb': char_to_byte,
	'btc': byte_to_char
}

# create JS environment
ctx = Context(
	files=[os.path.join(BASE_PATH, 'editor.js')], 
	ext_path=EXT_PATH, 
	contrib=contrib, 
	logger=lambda msg: Npp.console.write('%s\n' % msg)
)

def run_action(name):
	lang = str(Npp.notepad.getLangType()).lower()
	ctx.js().locals.pySetupEditorProxy(lang)
	return ctx.js().locals.pyRunAction(name)

def expand_abbreviation(is_tab=False):
	e = Npp.editor
	if is_tab and len(e.getSelText()):
		return e.tab()
	
	result = run_action('expand_abbreviation')
	if is_tab and not result:
		e.tab()

def add_entry(type):
	pass

			
def _get_autocomplete_list_for_lang(lang):
	return []

	
def _create_autocomplete_list():
	pass

def _get_user_file():
	return os.path.dirname(os.path.abspath( __file__ )) + '\\user_settings.pickle'
	

def load_user_settings():
	pass
	
def save_user_settings():
	pass

def _get_autocomplete_list(syntax, start):
	return []

def _get_autocomplete_leader():
	pos = Npp.editor.getCurrentPos()
	lineStart = Npp.editor.positionFromLine(Npp.editor.lineFromPosition(pos))
	begin = ''
	for pos in range(pos - 1, lineStart - 1, -1):
		c = chr(Npp.editor.getCharAt(pos))
		if c in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:_-':
			begin = c + begin
		else:
			break
	return begin

	
def _handle_selection(args):
	Npp.editor.clearCallbacks(_handle_selection)
	Npp.editor.clearCallbacks(_handle_cancel)
	Npp.editor.clearCallbacks(_handle_charadded)
	
	
def _handle_cancel(args = None):
	Npp.editor.clearCallbacks(_handle_selection)
	Npp.editor.clearCallbacks(_handle_cancel)
	Npp.editor.clearCallbacks(_handle_charadded)
	
	
def _handle_charadded(args):
	_handle_cancel()
	Npp.editor.autoCCancel()
	show_autocomplete()
	
def show_autocomplete():
	global _originalSeparator, _initialAutoCompleteLength
	
	begin = _get_autocomplete_leader()
	_originalSeparator = Npp.editor.autoCGetSeparator()
	Npp.editor.autoCSetSeparator(ord('\n'))
	_initialAutoCompleteLength = len(begin)
	autolist = _get_autocomplete_list(_npp_editor.get_syntax(), begin)
	
	Npp.editor.autoCSetCancelAtStart(False)
	Npp.editor.autoCSetFillUps(">+{[(")
	Npp.editor.callback(_handle_selection, [Npp.SCINTILLANOTIFICATION.AUTOCSELECTION])
	Npp.editor.callback(_handle_cancel, [Npp.SCINTILLANOTIFICATION.AUTOCCANCELLED])
	Npp.editor.callback(_handle_charadded, [Npp.SCINTILLANOTIFICATION.CHARADDED, Npp.SCINTILLANOTIFICATION.AUTOCCHARDELETED])
	Npp.editor.autoCShow(_initialAutoCompleteLength, "\n".join(autolist))
	
def set_profile(profile):
	pass
	