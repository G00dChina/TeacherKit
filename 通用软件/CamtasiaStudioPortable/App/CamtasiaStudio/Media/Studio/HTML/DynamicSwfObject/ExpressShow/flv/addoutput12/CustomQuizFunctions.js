// parallel arrays to remember question data
var arrQuizCorrect       = new Array();
var arrQuizScored        = new Array();
var arrQuizUserAnswerIdx = new Array();
var arrQuizUserAnswer    = new Array();
var arrQuizQuestion      = new Array();
var arrQuizType          = new Array();

// generates a string to display for a single question
function questionText( nIndex, bCorrect, bScored, nUserAnswerIdx, strUserAnswer, strQuestion, strQuestionType )
{
   var strMsg = "";
   strMsg += "Question #" + nIndex + ":\n\n";
   strMsg += "Question = " + strQuestion + "\n";
   strMsg += "Type = " + strQuestionType + "\n";
   strMsg += strQuestionType == "mult" ? "User Answer = " + nUserAnswerIdx + "\n" : ""; 
   strMsg += "User Answer = " + strUserAnswer + "\n";
   strMsg += "User answer is " + ( bScored ? bCorrect ? "Correct" : "Incorrect" : "Unscored" ) + "\n";
   return strMsg;
}

// user submits a single question
function userSubmitQuestion( nIndex, bCorrect, bScored, nUserAnswerIdx, strUserAnswer, strQuestion, strQuestionType )
{
   strUserAnswer = strUserAnswer.split("<CR>").join("\n");  // fix new-lines in user input

   alert( questionText( nIndex, bCorrect, bScored, nUserAnswerIdx, strUserAnswer, strQuestion, strQuestionType ) );

   // store data for this question
   arrQuizCorrect[nIndex-1]       = bCorrect;
   arrQuizScored[nIndex-1]        = bScored;
   arrQuizUserAnswerIdx[nIndex-1] = nUserAnswerIdx;
   arrQuizUserAnswer[nIndex-1]    = strUserAnswer;
   arrQuizQuestion[nIndex-1]      = strQuestion;
   arrQuizType[nIndex-1]          = strQuestionType;
}

// user submits entire quiz
function userSubmit( nNumQuestions, nNumCorrect, nNumScored )
{
   var strMsg = "";
   for ( var i = 0; i < nNumQuestions; i++ )
   {
      strMsg += questionText( i, arrQuizCorrect[i], arrQuizScored[i], arrQuizUserAnswerIdx[i], arrQuizUserAnswer[i], arrQuizQuestion[i], arrQuizType[i] ) + "\n";
   }
   alert( strMsg );
}


