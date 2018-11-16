/******************** SCORM Related Calls ***********************************/
var scoPassingScore = $ScormPassingScore;
var lmsPassingScore;

function userSubmitToLMS( nScore , isComplete )
{	      
   var scoreNeeded = scoPassingScore;
   
   if ( !isNaN( nScore ) ) {
      if ( apiVersion >= 1 )
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
            passingStatus = 'passed';
            apiCall( 'setValue', 'cmi.success_status', passingStatus );	
         }
         else
         {
            apiCall( 'setValue', 'cmi.success_status', passingStatus );	
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
         apiCall( 'setValue', 'cmi.core.score.raw', nScore);
         apiCall( 'setValue', 'cmi.core.score.scaled', nScore / 100);

         if (nScore >= scoreNeeded) {
            passingStatus = 'passed';
            apiCall('setValue', 'cmi.core.lesson_status', passingStatus);
         }
         else {
            apiCall('setValue', 'cmi.core.lesson_status', passingStatus);
         }   
      }
   }

   // Note: isComplete tells us whether quizzing is complete but we want to report
   //       whether the viewing percentage requirement has been met
   if ( percentageComplete >= minimumCompletionRequired ) {
      completionStatus = "completed";
      var exitField = (apiVersion >= 1) ? 'cmi.exit' : 'cmi.core.exit';
      apiCall( 'setValue', exitField, '' );
      apiCall( 'commit' );
      dispose();
   }
   else {
      completionStatus = "incomplete";
   }
}