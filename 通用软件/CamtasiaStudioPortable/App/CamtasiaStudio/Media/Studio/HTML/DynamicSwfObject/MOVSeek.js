function SeekTime( Time )
{   
   if( document.QuickTimePlayer == undefined || document.QuickTimePlayer == null )
   {
      return;
   }
   
   document.QuickTimePlayer.SetTime( Time * 600 );
   
   document.QuickTimePlayer.Play();
}
