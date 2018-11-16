   function SwitchPlayer( elementId, styleId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, MediaDirectoryNotEscaped, ObjectIDName, ObjectType, ObjectClassID, ObjectCodebase, ObjectStandBy, EmbedName, ParamLoop, ParamAutoStart, ParamUiMode, toc1, toc2 )
   {        
      var n = (typeof elementId == 'string') ? document.getElementById( elementId ) : elementId;
      n.innerHTML = getWMVHTML( styleId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, MediaDirectoryNotEscaped, ObjectIDName, ObjectType, ObjectClassID, ObjectCodebase, ObjectStandBy, EmbedName, ParamLoop, ParamAutoStart, ParamUiMode, toc1, toc2 );
      return true;
   }  
   
   function getWMVHTML( divId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, MediaDirectoryNotEscaped, ObjectIDName, ObjectType, ObjectClassID, ObjectCodebase, ObjectStandBy, EmbedName, ParamLoop, ParamAutoStart, ParamUiMode, toc1, toc2 ) 
   {
      if ( toc1 == undefined || toc1 == null )
		{
			toc1 = "";
		}
		
		if ( toc2 == undefined || toc2 == null )
		{
		   toc2 = "";	
		}
		
      var node = "";

      var videosubdirectory = MediaDirectoryNotEscaped;
      var videofile = VideoFileName;
      //this will be the final video link (absolute path)
      var videolink = location.href;

      //remove the file:// because windows media doesn't understand that
      var file = videolink.indexOf( "file://");

      if ( file > -1 )
      {
         // THIS IS A LOCAL PATH
         videolink = videolink.substring( file + 8 );

         //remove the %20 because media player doesn't understand those
         while( videolink.lastIndexOf( "%20" ) != -1 )
         {
            videolink = videolink.replace( "%20", " " );
         }

         //remove the html file name now
         var lastslash = videolink.lastIndexOf( "/");

         if ( lastslash > -1 )
            videolink = videolink.substring( 0, lastslash );

         //add the subfolder (if there is one) and then the video file name
         if ( videosubdirectory.length > 0 )
            videolink = videolink + "/" + videosubdirectory + videofile;
         else
            videolink = videolink + "/" + videofile;
      }
      else
      {
         if ( videosubdirectory.length > 0 )
            videolink = videosubdirectory + videofile;
         else
            videolink = videofile;
      }
            
      node = '<div id="' + divId + '">' 
           + toc1
           + '   <object id="' + ObjectIDName + '" classid="' + ObjectClassID + '"'
           + '   width="' + VideoWidth + '" height="' + VideoHeight + '"'
           + '   codebase="' + ObjectCodebase + '"'
           + '   standby="' + ObjectStandBy + '"'
           + '   type="' + ObjectType + '">'
           + '      <param name="autoStart" value="' + ParamAutoStart + '"/>'
           + '      <param name="url"       value="' + MediaDirectory + VideoFileName + '" />'
           + '      <param name="wmode"     value="transparent" />'
           + '      <param name="uiMode"    value="' + ParamUiMode + '" />'
           + '      <param name="loop"      value="' + ParamLoop + '" />'               
           + '      <embed id       ="' + EmbedName + '"'
           + '          type        ="application/x-mplayer2"'
           + '          src         ="' + videolink + '"'
           + '          width       ="' + VideoWidth + '"'
           + '          height      ="' + VideoHeight + '">'
           + '      </embed>'
           + '   </object>'
           + toc2
           + '</div>';

      return node;
   }