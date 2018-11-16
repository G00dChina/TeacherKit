function SeekTime( Time )
{
    if( swfMovie == undefined || swfMovie == null )
    {
      return;
    }
   
    var FrameRate        = $VideoFPS;
    var Frame            = Math.floor(Time * FrameRate);
    var swfMovie;
    
    $JavaScriptGetFlashPlayerObject    
	
    var TotalFrames = swfMovie.TGetProperty("$SWFStreamName", 5);
    if ( Frame > TotalFrames-1 ) Frame = TotalFrames-1;

    swfMovie.TGotoFrame("$SWFStreamName", Frame);
    swfMovie.TPlay("$SWFStreamName");
    swfMovie.TCallFrame("$SWFStreamName", Frame);
}
