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
   
   var StartTime = document.$ObjectIDName.GetTime();
   var destIndex = null;
   
   $SetIndexColors
   
   var EndTime = document.$ObjectIDName.GetTime();
   
   if( destIndex != null && StartTime != EndTime )
   {
      ScrollToIndex( document.getElementById('$LinkDivID'), destIndex );
   }
}
