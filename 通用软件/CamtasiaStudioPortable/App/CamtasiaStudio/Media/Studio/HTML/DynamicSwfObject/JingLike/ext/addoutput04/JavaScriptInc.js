var vid;

$JSSCOFunctions

// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
        function detectIE()
        // Returns the version of Internet Explorer or a -1
        // (indicating the use of another browser).
        {
           var rv = false;
           var path = ( document.location.href );
           if (navigator.appName == 'Microsoft Internet Explorer')
           {
              rv = true;
           }
           return rv;
        };

        function runOnServer() //if runs on a server and is IE
        {
           var rv = false;
           var path = ( document.location.href );
           if ( path.indexOf("http") == 0 || navigator.appName != 'Microsoft Internet Explorer' )
           {
              rv = true;
           }
           return rv;
        };

        function mediaLocation()
        {
           var path = ( document.location.href );
           var baseindex = path.lastIndexOf("/");
           var basex = path.substring( 0 , baseindex+1 );
           if( runOnServer()==true )
              basex = encodeURI(basex);
           basex = basex.split("%25").join("%");
           return basex;
        };


        var flashvars = {}; 
       

        flashvars.tocdoc='$TOCDoc';
        flashvars.showsearch='$Searchable';
        flashvars.autostart='$AutoStart';
        flashvars.autohide='true';
        flashvars.containerwidth=$ActualVideoWidth;
        flashvars.containerheight=$ActualVideoHeight;
        flashvars.smoothing='true';
        flashvars.enablejsapi='true';
        flashvars.fullscreen='true';
        flashvars.windowbox='false';
        flashvars.showbranding='false';
        flashvars.showstartscreen='$ShowStartScreen';
        flashvars.showendscreen='$ShowEndScreen';
        flashvars.basecolor=$BaseColor;
        flashvars.loop='$ParamLoop';
		
        if( runOnServer() == true )
        {  
           flashvars.content = mediaLocation() +  encodeURI( "$VideoFileName" );
           flashvars.thumb   = encodeURI( mediaLocation() +  encodeURI( "$FirstFrameFilename" ));
           flashvars.xmp     = encodeURI( mediaLocation() +  encodeURI( "$FlashConfig" ));
        }
        else
        {
           flashvars.content = mediaLocation() + "$VideoFileName"; 
           flashvars.thumb   = mediaLocation() + "$FirstFrameFilename";
           flashvars.xmp     = mediaLocation() + "$FlashConfig";
        }


        var params = {}; 
        params.quality = "best"; 
        params.bgcolor = "#1a1a1a";
        params.scale   = "$ScaleMode"; 
        params.allowscriptaccess = "always"; 
        params.allowfullscreen   = "$FullScreen"; 

        var attributes = {}; 
        attributes.id      = "csPlayer"; 
        attributes.name    = "csPlayer"; 
        attributes.classid ="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";


        if( runOnServer() == true )
           attributes.data  = mediaLocation() + encodeURI("$FlashController");
        else
           attributes.data  = "$FlashController";
              

		   
		   
		   

//adds and event listener across major browser versions
function addEvent( obj, type, fn )
{
   if ( obj.addEventListener )
   {
      obj.addEventListener( type, fn, true );
   }
   else if ( obj.attachEvent )
   {
      obj.attachEvent( "on" + type, fn );
   }
   else
   {
      obj["on" + type] = fn;
   }
}

//removes event listeners across major browser versions
function removeEvent( obj, type, fn )
{
   if ( obj.removeEventListener )
   {
      obj.removeEventListener( type, fn, true );	
   }
   else if ( obj.detachEvent )
   {
      obj.detachEvent( "on" + type, fn );
   }
   else
   {
      delete obj["on" + type];	
   }
}
   
function divClickHandler()
{
   var req = swfobject.hasFlashPlayerVersion("$PlayerVersion");
   var id = "video1";
   var node = '<div id="cs_noexpressUpdate">'
            + '<p align="center">The Camtasia Studio video content presented here </p><p align="center"> requires JavaScript to be enabled and the latest version </p><p align="center">of the Adobe Flash Player.  If you are using </p><p align="center">a browser with JavaScript disabled please enable it now.</p><p align="center"> Otherwise, please update your version of the </p><p align="center">free Flash Player by <a href="http://www.adobe.com/go/getflashplayer">downloading here</a>. </p>'
            + '</div>';

   if ( req )
   {
        if( runOnServer() == true )
           swfobject.embedSWF( attributes.data , id, "$Width", "$Height", "$PlayerVersion", "expressInstall.swf", flashvars, params, attributes);
        else
           swfobject.embedSWF( "$FlashController", id, "$Width", "$Height", "$PlayerVersion", "expressInstall.swf", flashvars, params, attributes);  
   }
   else
   {
      var n = (typeof id == 'string') ? document.getElementById( id ) : id;
      n.innerHTML = node;
   }
}

function pageLoad()
{
   $JSAddClickEvent
   $JSCallLoadPage
}