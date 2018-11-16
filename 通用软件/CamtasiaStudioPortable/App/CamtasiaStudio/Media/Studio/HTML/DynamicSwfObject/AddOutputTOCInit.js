   var toc1     = null;
   var toc2     = null;
   var vid      = null;
     
   //adds and event listener across major browser versions
   function addEvent( obj, type, fn )
   {
	   if ( obj.addEventListener )
	   {
		   obj.addEventListener( type, fn, true );
	   }
	   else if ( obj.attachEvent )
	   {
		   obj.attachEvent( "on" + type, fn );
	   }
	   else
	   {
		   obj["on" + type] = fn;
	   }
   }

   //removes event listeners across major browser versions
   function removeEvent( obj, type, fn )
   {
      if ( obj.removeEventListener )
	   {
	      obj.removeEventListener( type, fn, true );	
	   }
	   else if ( obj.detachEvent )
	   {
	     obj.detachEvent( "on" + type, fn );
	   }
	   else
	   {
		   delete obj["on" + type];	
	   }
   }
   
   function divClickHandler()
   {
      $SwitchPlayerFuncCall$#;
      
      removeEvent( vid, 'click', divClickHandler );
   } 