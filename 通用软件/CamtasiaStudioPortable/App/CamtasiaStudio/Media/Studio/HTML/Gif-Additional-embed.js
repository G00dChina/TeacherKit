   function SwitchPlayer( elementId, styleId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, toc1, toc2 )
   {        
      var n = (typeof elementId == 'string') ? document.getElementById( elementId ) : elementId;
      n.innerHTML = getGIFHTML( styleId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, toc1, toc2 );
      return true;
   }  
      
   function getGIFHTML( divId, VideoFileName, VideoWidth, VideoHeight, MediaDirectory, toc1, toc2 ) 
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
            + '<img src="' + MediaDirectory + VideoFileName +'" width="' + VideoWidth + '" height="' + VideoHeight + '" alt=""/>'            
            + toc2
            + '</div>';
     
      return node;
   }  
