/******************** SCORM Related Calls ***********************************/

var scoPassingScore = 80;
var lmsPassingScore;
var completionStatus = "not_attempted";
var apiResult;

function userSubmitToLMS( nScore )
{	      
   completionStatus = "completed";
   var scoreNeeded = scoPassingScore;
   
   if( apiVersion >= 1 )
   {  
      lmsPassingScore = apiCall( 'getValue', 'cmi.scaled_passing_score' );
      apiCall( 'setValue', 'cmi.score.min', 0   );
      apiCall( 'setValue', 'cmi.score.max', 100 );
      apiCall( 'setValue', 'cmi.score.raw', nScore );	
      apiCall( 'setValue', 'cmi.score.scaled', nScore / 100 );
         
      //lms defined mastery level will take precedence over sco defined mastery level
      if ( lmsPassingScore != null && lmsPassingScore != "" && lmsPassingScore >= 0 && lmsPassingScore <= 1 )
      {
         scoreNeeded = lmsPassingScore * 100;
      }
      
      if ( nScore >= scoreNeeded )
      {
         apiCall( 'setValue', 'cmi.success_status', 'passed' );	
      }
      else
      {
         apiCall( 'setValue', 'cmi.success_status', 'failed' );	
      }   
   }
   else
   {  
 		lmsPassingScore = apiCall( 'getValue', 'cmi.student_data.mastery_score' );
		
		if ( lmsPassingScore != null && lmsPassingScore != "" && lmsPassingScore >= 0 && lmsPassingScore <= 100 )
		{
			scoreNeeded = lmsPassingScore;
		}
		apiCall( 'setValue', 'cmi.core.score.min', '0'    );
		apiCall( 'setValue', 'cmi.core.score.max', '100'  );
		apiCall( 'setValue', 'cmi.core.score.raw', nScore );
		
		if ( nScore >= scoreNeeded )
		{
			completionStatus = "passed";	
		}
		else
		{
		   completionStatus = "failed";
		}
   }
   dispose();
}