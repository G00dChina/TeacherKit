   var intervalId;
   
   function SwitchPlayer( elementId, styleId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, ObjectIDName, ObjectClassID, ObjectCodebase, EmbedName, EmbedEnableJS, EmbedPluginsPage, ParamLoop, ParamAutoStart, ParamController, toc1, toc2 )
   {        
      var n = (typeof elementId == 'string') ? document.getElementById( elementId ) : elementId;
      n.innerHTML = getQTHTML( styleId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, ObjectIDName, ObjectClassID, ObjectCodebase, EmbedName, EmbedEnableJS, EmbedPluginsPage, ParamLoop, ParamAutoStart, ParamController, toc1, toc2 );
      
      intervalId = setInterval( statusCheck, 1 );	
      return true;
   }  
   
   function statusCheck()
   {
      var status = document.QuickTimePlayer.GetPluginStatus();
      if ( status == "Complete" )
      {
         clearInterval( intervalId );
         document.QuickTimePlayer.SetControllerVisible( true );
      }
   }

   function getQTHTML( divId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, ObjectIDName, ObjectClassID, ObjectCodebase, EmbedName, EmbedEnableJS, EmbedPluginsPage, ParamLoop, ParamAutoStart, ParamController, toc1, toc2 ) 
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
            + '<object id="' + ObjectIDName + '" classid="' + ObjectClassID + '"'
            + 'width="' + VideoWidth + '" height="' + VideoHeight + '"'
            + 'codebase="' + ObjectCodebase + '">'
            + '   <param name="src"        value="' + MediaDirectory + VideoFileName + '"/>'
            + '   <param name="autoplay"   value="' + ParamAutoStart + '" />'
            + '   <param name="loop"       value="' + ParamLoop + '" />'                                                      
            + '   <param name="controller" value="' + ParamController + '" />'                                     
            + '   <embed id       ="' + EmbedName + '"'
            + '       pluginspage ="' + EmbedPluginsPage + '"'
            + '       src         ="' + MediaDirectory + VideoFileName + '"'
            + '       autoplay    ="' + ParamAutoStart + '"'
            + '       loop        ="' + ParamLoop + '"'
            + '       controller  ="' + ParamController + '"'
            + '       enablejavascript ="' + EmbedEnableJS + '"'
            + '       width       ="' + VideoWidth + '"'
            + '       height      ="' + VideoHeight + '">'
            + '   </embed>'
            + '</object>'
            + toc2
            + '</div>';
     
      return node;
   }  
