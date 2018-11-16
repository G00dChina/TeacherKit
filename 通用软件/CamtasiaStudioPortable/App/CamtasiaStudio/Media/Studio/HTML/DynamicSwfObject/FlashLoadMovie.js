var args = new Object();
var query = location.search.substring(1);

// Get query string
var pairs = query.split( "," );
//do i go here????? ------------------------------------
        function detectIE()
        // Returns the version of Internet Explorer or a -1
        // (indicating the use of another browser).
        {
           var rv = false;
           var path = ( document.location.href );
           if (navigator.appName == 'Microsoft Internet Explorer' && path.indexOf("http") == 0 )
           {
              rv = true;
           }
           return rv;
        }

        function runOnServer() //if runs on a server or local firefox
        {
           var rv = false;
           var path = ( document.location.href );
           if ( path.indexOf("http") == 0 || navigator.appName != 'Microsoft Internet Explorer' )
           {
              rv = true;
           }
           return rv;
        }

        function mediaLocation()
        {
           var path = ( document.location.href );
           var baseindex = path.lastIndexOf("/");
           var basex = path.substring( 0 , baseindex+1 );
           if( runOnServer()==true )
              basex = encodeURI(basex);
           basex = basex.split("%25").join("%");
           return basex;
        }


//-------------------------------------------------------
// Break at comma
for ( var i = 0; i < pairs.length; i++ )
{
   var pos = pairs[i].indexOf('=');
   if( pos == -1 ) 
   {   
      continue; // Look for "name=value"
   }

   var argname  = pairs[i].substring( 0, pos );  // If not found, skip
   var value    = pairs[i].substring( pos + 1 ); // Extract the name
   args[argname] = unescape( value );            // Extract the value
} 

