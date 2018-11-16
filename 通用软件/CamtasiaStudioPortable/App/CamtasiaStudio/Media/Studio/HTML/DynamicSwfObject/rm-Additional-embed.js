   function SwitchPlayer( elementId, styleId, VideoFileName, VideoWidth, VideoHeight, ActualVideoHeight, MediaDirectory, ObjectIDName, ObjectType, EmbedType, EmbedPluginsPage, ParamLoop, ParamControls, ParamConsole, ParamAutoStart, RMControllerWidth, RMControllerHeight, RMControllerControls, toc1, toc2 )
   {        
      var n = (typeof elementId == 'string') ? document.getElementById( elementId ) : elementId;
      n.innerHTML = getRMHTML( styleId, VideoFileName, VideoWidth, VideoHeight, ActualVideoHeight, MediaDirectory, ObjectIDName, ObjectType, EmbedType, EmbedPluginsPage, ParamLoop, ParamControls, ParamConsole, ParamAutoStart, RMControllerWidth, RMControllerHeight, RMControllerControls, toc1, toc2 );
      return true;
   }  
   
   function getRMHTML( divId, VideoFileName, VideoWidth, VideoHeight, ActualVideoHeight, MediaDirectory, ObjectIDName, ObjectType, EmbedType, EmbedPluginsPage, ParamLoop, ParamControls, ParamConsole, ParamAutoStart, RMControllerWidth, RMControllerHeight, RMControllerControls, toc1, toc2 ) 
   {
      if ( toc1 == undefined || toc1 == null )
		{
			toc1 = "";
		}
		
		if ( toc2 == undefined || toc2 == null )
		{
		   toc2 = "";	
		}
      var node = '<div id="' + divId + '">' 
                + toc1
                + '<EMBED name        ="' + ObjectIDName + '"'
                + 'src         ="' + MediaDirectory + VideoFileName + '"'
                + 'width       ="' + VideoWidth + '"'
                + 'height      ="' + ActualVideoHeight + '"'
                + 'loop        ="' + ParamLoop + '"'
                + 'type        ="' + EmbedType + '"'
                + 'controls    ="' + ParamControls + '"'
                + 'console     ="' + ParamConsole + '"'
                + 'autostart   ="' + ParamAutoStart + '"'
                + 'pluginspage ="' + EmbedPluginsPage + '" >'
                + '</EMBED>'
                + '<BR><EMBED src       = "' + MediaDirectory + VideoFileName + '"'
                + 'width     = "' + RMControllerWidth + '"'
                + 'height    = "' + RMControllerHeight + '"'
                + 'controls  = "' + RMControllerControls + '"'
                + 'type      = "' + ObjectType + '"'
                + 'console   = "' + ParamConsole + '"'
                + 'autostart = "' + ParamAutoStart + '" >'
                + '</EMBED>'
                + toc2
                + '</div>';
                       
      return node;
   }  
