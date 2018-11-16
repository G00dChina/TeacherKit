var req = swfobject.hasFlashPlayerVersion("$PlayerVersion");
   var id = "video1";
   var bookmark = args.movie ? args.movie : 0;
   var node = '<div id="cs_noexpressUpdate">'
            + '<p align="center">The Camtasia Studio video content presented here </p><p align="center"> requires JavaScript to be enabled and the latest version </p><p align="center">of the Adobe Flash Player.  If you are using </p><p align="center">a browser with JavaScript disabled please enable it now.</p><p align="center"> Otherwise, please update your version of the </p><p align="center">free Flash Player by <a href="http://www.adobe.com/go/getflashplayer">downloading here</a>. </p>'
            + '</div>';

   if ( req )
   {
      swfobject.embedSWF( "$URI", id, "$Width", "$Height", "$PlayerVersion", null, { csColor: "$SWFBGColor", csFilesetBookmark: bookmark }, { bgcolor: "$SWFBGColor", quality: "best", allowscriptaccess: "always" } );
   }
   else
   {
      var n = (typeof id == 'string') ? document.getElementById( id ) : id;
      n.innerHTML = node;
   }