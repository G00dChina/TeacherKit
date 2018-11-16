function PlayItem( ItemNum )
{
   if( document.mediaPlayer == undefined || document.mediaPlayer == null )
   {
      return;
   }
   
   if( document.mediaPlayer.playState != 3 )
      document.mediaPlayer.controls.play();
   
   if( navigator.appName == "Netscape" && !window.GeckoActiveXObject ) 
   {
      // Retrieve the media item at the position in the current playlist.
      var media = document.mediaPlayer.getCurrentPlaylist().item(ItemNum);

      // Play the media item.
      document.mediaPlayer.getControls().playItem(media);	
   } 
   else 
   {
      var media = document.mediaPlayer.currentPlaylist.item(ItemNum);
      
      // Play the media item.
      document.mediaPlayer.controls.playItem(media);
   }		
}
