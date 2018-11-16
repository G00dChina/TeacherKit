function SeekTime( Time )
{   
   if( document.realplayer == undefined || document.realplayer == null )
   {
      return;
   }
   
   if ( document.realplayer.GetPlayState() == 0 || document.realplayer.GetPlayState() == 4 ) 
   {
      document.realplayer.DoPlay();
   }
   else 
   {
      MSTime = Time * 1000;
      document.realplayer.SetPosition( MSTime );
   }
}
