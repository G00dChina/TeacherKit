/**
 * @author Brooks Andrus 
 * October 30, 2006
 *
 * Real Player JavaScript detection and embed script
 * Inspired by Geoff Stern's SWFObject http://blog.deconcept.com/swfobject/
 *
 * Tested and found to work on:
 *    - Windows XP, IE 6, Firefox 1.5
 *    - Mac OS X, Firefox 1.5, Firefox 2.0, Safari 2.0.4
 *
 * Known Issues
 *    - Opera & Real Media fail on all platforms
 */
 
 
 
/**
 * Here's our JavaScript constructor function.
 * 
 * @param src - the file name / path
 * @param id  - the object id for the embedded wmp
 * @param w   - the width of the object / embed area
 * @param h   - the height of the object / embed area
 */
RealEmbed = function( src, id, w , h )
{
	this.params     = new Object();
	this.attributes = new Array();
	
	if ( id  )  { this.setAttribute('id'    , id  ); }
	if ( src )  { this.setAttribute( 'src'  , src ); }
	if ( w   )  { this.setAttribute('width' , w   ); }
	if ( h   )  { this.setAttribute('height', h   ); }
}

/**
 * Stuffs attributes array with name value pairs.
 *
 */
RealEmbed.prototype.setAttribute = function( name, value )
{
	this.attributes[name] = value;
}

/**
 * Returns value for a given attribute array key.
 *
 */
RealEmbed.prototype.getAttribute = function( name )
{
	return this.attributes[name];
}

/**
 * Allows name / value parameter tags to be chained onto the
 * RealEmbed object - keeps the constructor from being enormous
 *
 */
RealEmbed.prototype.addParam = function( name, value )
{
	this.params[name] = value;
}

/**
 * Returns a keyed array of name / value parameters
 *
 */
RealEmbed.prototype.getParams = function()
{
	return this.params;
} 

/**
 * Returns a string of html param tags with name / value pairs set.
 *
 */
RealEmbed.prototype.getParamTags = function( ie )
{
	var params = "";
	if ( ie )
	{
		var paramObj = this.getParams();
		
		for ( var i in paramObj )
		{
			params += '<param name="' + i + '" value="' + paramObj[i] + '" />'
		}
	}
	else
	{
		var paramObj = this.getParams();
		for ( var i in this.getParams() )
		{
			params += ' ' + i + '="' +  paramObj[i] + '"';
		}
	}
	return params;
}

RealEmbed.prototype.getFormattedName = function()
{
	var videofile =  this.getAttribute( 'src' );
	// this will be the final video link (absolute path)
	var videolink = location.href;
			
	// remove the file:// because windows media doesn't understand that
	var file = videolink.indexOf( "file://");

	if ( file > -1 )
	{
		// this is a local path
		videolink = videolink.substring( file + 8 );
		// remove the %20 because media player doesn't understand those
		while( videolink.lastIndexOf( "%20" ) != -1 )
		{
			videolink = videolink.replace( "%20", " " );
		}
		//remove the html file name now
		var lastslash = videolink.lastIndexOf( "/");
		if ( lastslash > -1 )
		{
			videolink = videolink.substring( 0, lastslash );
		}
		//add the video file name
		videolink = videolink + "/" + videofile;
	}
	if ( navigator && navigator.userAgent.substr( 0, navigator.userAgent.indexOf( "/" ) ) == "Opera" )
	{
		videolink = videofile;
	}
	else
	{
		videolink = videofile;
	}
	return videolink;
}

/**
 * Creates the object and embed tags needed to display Real Player
 * in a web page. 
 *
 */
RealEmbed.prototype.getHTML = function()
{	
	var node;
	if ( navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length )
	{
		node  = '<embed name="' + this.getAttribute( 'id' ) + '"'	
				+ ' id="' + this.getAttribute( 'id' ) + '"'
				+ ' width="' + this.getAttribute( 'width' ) + '"'
				+ ' height="' + this.getAttribute( 'height' ) + '"'
				+ ' src="' + this.getFormattedName() + '"'
				+ ' type="audio/x-pn-realaudio-plugin"'
				+ this.getParamTags( false )
		node += ' />';
	}
	else
	{
		node  = '<object id="' + this.getAttribute( 'id' ) + '"'
				+ ' classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA"'
				+ ' width="' + this.getAttribute( 'width' ) + '"'
				+ ' height="' + this.getAttribute( 'height' ) 
				+ ' type="audio/x-pn-realaudio-plugin"'
				+ '">'
				+ '<param name="src" value="' + this.getAttribute( 'src' ) + '" />'
				+ this.getParamTags( true )
				+ '</object>';
	}
	return node
}

/**
 * Responsible for writing out the innerHTML for the element identified
 *
 */
RealEmbed.prototype.write = function( elementId )
{
	var n = ( typeof elementId == 'string' ) ? document.getElementById( elementId ) : elementId;
	n.innerHTML = this.getHTML();
	return true;
}

/**
 * Returns boolean value indicating whether Real Player 
 * plugin is installed for the browser in use. A touch of vb 
 * script is actually used when IE is the browser.
 */
function isRealInstalled() 
{
	var installed = false;
	realObj = false;
	if ( navigator.mimeTypes && navigator.mimeTypes.length )
	{	
		for ( var i = 0; i < navigator.mimeTypes.length; i++ )
		{
			var mt = navigator.mimeTypes[i];
			if ( mt.type == "audio/x-pn-realaudio-plugin" )
			{
				installed = true;
			}
		}
	}
	else 
	{
		execScript( 'on error resume next: realObj = IsObject( CreateObject( "rmocx.RealPlayer G2 Control.1" ) )','VBScript' );
		installed = realObj;
	}
	return installed;
}