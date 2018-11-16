function SeekTime( Time )
{
   if( document.mediaPlayer == undefined || document.mediaPlayer == null )
   {
      return;
   }
   
   if (navigator.appName == "Netscape" && !window.GeckoActiveXObject ) 
   {
      document.mediaPlayer.getControls().setCurrentPosition( Time );
      document.mediaPlayer.getControls().Play();
   } 
   else 
   {
      document.mediaPlayer.controls.currentPosition = Time;
      document.mediaPlayer.controls.play();
   }	
}
