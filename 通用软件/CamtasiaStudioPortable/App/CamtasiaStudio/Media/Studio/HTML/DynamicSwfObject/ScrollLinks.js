function ScrollToIndex( DivID, destIndex ) 
{
   var nDestYCoord = destIndex.offsetTop; 
   var thisNode    = destIndex; 
   
   while ( thisNode.offsetParent && ( thisNode.offsetParent !=  document.body) ) 
   { 
      thisNode     = thisNode.offsetParent; 
      nDestYCoord += thisNode.offsetTop; 
   }

   nCurWindowYPos = GetCurrentScrollYPos( DivID.id );

   //Only scroll if it's needed..
   if( destIndex.offsetTop + destIndex.offsetHeight > DivID.clientHeight )
   {      
      nDestYCoord -= DivID.clientHeight;
      
      if( nDestYCoord > DivID.scrollTop )
      {
         DivID.scrollTop = nDestYCoord;
      }
   }
}

function GetCurrentScrollYPos( DivID ) 
{ 
   var aDivs = document.body.getElementsByTagName("DIV");

   for ( var i=0; i < aDivs.length; i++ ) 
   { 
      var Div = aDivs[i]; 

      if ( Div.id == DivID ) 
      { 
         return Div.scrollTop
      }
   }

   return 0;
}
