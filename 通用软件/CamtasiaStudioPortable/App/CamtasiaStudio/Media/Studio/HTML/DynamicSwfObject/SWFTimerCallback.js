$JavaScriptScrollWindow

var g_LastFrame = 0;

function timerInit() 
{
   //Sets the timer to check every .1 second
   window.setInterval("timer()", 100);
}

function timer() 
{    
   var destIndex = null;
   
   $SetIndexColors
 
   if( destIndex != null && g_LastFrame != CurFrame )
   {
      g_LastFrame = CurFrame;
      ScrollToIndex( document.getElementById('$LinkDivID'), destIndex );
   }
}
