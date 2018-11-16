
        var id = "video1";
        var req = swfobject.hasFlashPlayerVersion("$PlayerVersion");
        var bookmark = args.movie ? args.movie : 0;
        var node = '<div id="cs_noexpressUpdate">'
            + '<p align="center">The Camtasia Studio video content presented here </p><p align="center"> requires JavaScript to be enabled and the latest version </p><p align="center">of the Adobe Flash Player.  If you are using </p><p align="center">a browser with JavaScript disabled please enable it now.</p><p align="center"> Otherwise, please update your version of the </p><p align="center">free Flash Player by <a href="http://www.adobe.com/go/getflashplayer">downloading here</a>. </p>'
            + '</div>';
        if( runOnServer() == true )
        {
           var flashvars = { csConfigFile: encodeURIComponent(mediaLocation()+encodeURI("$FlashConfig")), csColor: "$SWFBGColor", $SWFcsLoadingKeyword csFilesetBookmark: bookmark }; 
           flashvars.contentpath = mediaLocation(); 
           if ( flashvars.csPreloader )
           {
              flashvars.csPreloader  =  encodeURIComponent(mediaLocation()+encodeURI(flashvars.csPreloader))
           }
        }
        else
        {
           var flashvars = { csConfigFile: "$FlashConfig", csColor: "$SWFBGColor", $SWFcsLoadingKeyword csFilesetBookmark: bookmark }; 
           //flashvars.contentpath = mediaLocation(); 
        }
 
        var params = {}; 
        params.quality = "best"; 
        params.bgcolor = "$SWFBGColor";
        params.allowscriptaccess = "always"; 

        var attributes = {}; 
        attributes.id      = "csPlayer"; 
        attributes.name    = "csPlayer"; 
        attributes.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";

        if( runOnServer() == true )
           attributes.data  = mediaLocation() + encodeURI("$FlashController");
        else
           attributes.data  = "$FlashController";

        if ( req )
        {
           if( runOnServer() == true )
              swfobject.embedSWF( attributes.data , id, "$Width", "$Height", "$PlayerVersion", null, flashvars, params, attributes);
           else
              swfobject.embedSWF( "$FlashController", id, "$Width", "$Height", "$PlayerVersion", null, flashvars, params, attributes);  
        }
        else 
        {
          var n = (typeof id == 'string') ? document.getElementById( id ) : id;
          n.innerHTML = node;
        }






/*var req = swfobject.hasFlashPlayerVersion("$PlayerVersion");
   var id = "video1";

   var bookmark = args.movie ? args.movie : 0;
   var node = '<div id="cs_noexpressUpdate">'
            + '<p align="center">The Camtasia Studio video content presented here </p><p align="center"> requires JavaScript to be enabled and the latest version </p><p align="center">of the Adobe Flash Player.  If you are using </p><p align="center">a browser with JavaScript disabled please enable it now.</p><p align="center"> Otherwise, please update your version of the </p><p align="center">free Flash Player by <a href="http://www.adobe.com/go/getflashplayer">downloading here</a>. </p>'
            + '</div>';

   if ( req )
   {
      swfobject.embedSWF( "$FlashController", id, "$Width", "$Height", "$PlayerVersion", null, { csConfigFile: "$FlashConfig", csColor: "$SWFBGColor", $SWFcsLoadingKeyword csFilesetBookmark: bookmark }, { bgcolor: "$SWFBGColor", quality: "best", allowscriptaccess: "always" } );
   }
   else
   {
      var n = (typeof id == 'string') ? document.getElementById( id ) : id;
      n.innerHTML = node;
   }*/