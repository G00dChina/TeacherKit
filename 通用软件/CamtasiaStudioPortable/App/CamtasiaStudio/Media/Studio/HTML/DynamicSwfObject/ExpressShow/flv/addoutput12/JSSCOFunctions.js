$SCORMQuizFunction

function loadPage()
{   
$NONQUIZSCORMInit
}

var isDisposed = false;

function dispose()
{
   if ( !isDisposed )
   {		
      if( apiVersion >= 1 )
      {
         apiCall( 'setValue', 'cmi.completion_status', $SCORMQuizCompletionStatus );
      }
      else
      {
         apiCall( 'setValue', 'cmi.core.lesson_status', $SCORMQuizCompletionStatus );
      }
      apiCall( 'terminate' );
      isDisposed = true;
   }
}
