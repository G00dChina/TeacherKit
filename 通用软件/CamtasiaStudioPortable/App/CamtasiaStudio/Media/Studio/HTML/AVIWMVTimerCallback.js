$JavaScriptScrollWindow

function timerInit() 
{
   //Sets the timer to check every .1 second
   window.setInterval("timer()", 100);
}

function timer() 
{       
   if( document.$ObjectIDName == undefined || document.$ObjectIDName == null )
   {
      return;
   }
   
   if( document.$ObjectIDName.PlayState == 3 ) 
   {
      var destIndex = null;
      
$SetIndexColors
      
      if( destIndex != null )
      {
         ScrollToIndex( document.getElementById('$LinkDivID'), destIndex );
      }
   }     
}
