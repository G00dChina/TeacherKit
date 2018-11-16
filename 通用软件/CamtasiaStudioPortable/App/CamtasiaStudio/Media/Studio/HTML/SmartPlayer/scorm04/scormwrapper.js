// SCORM 1.2 and SCORM 2004 API Wrapper

var MAX_PARENTS_TO_SEARCH = 500;
var apiHandle             = null;
var noAPIFound            = "false";
var apiVersion;

/*******************************************************************************
**
** This function is used to communicate with the API, if it is found.
**
** Inputs:  String - Name of the api function to call
**
**         String - Name of the data model defined category or element value
**
**          String - The value that the named element or category will be
**                   assigned
**
** Return:  String - Value returned from the api call.
**
*******************************************************************************/
function apiCall( functionCall, dmeName, dmeValue )
{
   var api = getAPIHandle();
   var result;
      
   if( noAPIFound != "true" )
   {
      switch ( functionCall )
      {
         case "initialize":
			   var dmeName = "";
            if ( apiVersion >=1 )
            {
               dmeName = "cmi.completion_status";
					result = api.Initialize("");			
            }
            else
            {
               dmeName = "cmi.core.lesson_status";
					result = api.LMSInitialize("");	
            }
            
            if ( result == "true" )
            {   
					if ( apiVersion >= 1 )
					{
						result = api.GetValue( dmeName );
					}
					else
					{
                  result = api.LMSGetValue( dmeName );
					}
            } 
            break;
         
         case "terminate":
            if ( apiVersion >= 1 )
            {
               result = api.Terminate("");
            }
            else
            {
               result = api.LMSFinish("");
            }
            break;
         
         case "getValue":
            if ( apiVersion >=1 )
            {
               result = api.GetValue( dmeName );
            }
            else
            {
               result = api.LMSGetValue( dmeName );
            }
            break;
         
         case "setValue":
            if ( apiVersion >= 1 )
            {
               result = api.SetValue( dmeName, dmeValue );
            }
            else
            {
               result = api.LMSSetValue( dmeName, dmeValue );
            }
            break;
         
         case "commit":
            if ( apiVersion >= 1 )
            {
               result = api.Commit("");
            }
            else
            {
               result = api.LMSCommit("");
            }
            break;
         
         case "getLastError":
            if ( apiVersion >= 1 )
            {
               result = api.GetLastError();
            }
            else
            {
               result = api.LMSGetLastError();
            }
            break;
         
         case "getErrorString":
            if ( apiVersion >= 1 )
            {
               result = api.GetErrorString( errCode );
            }
            else
            {
               result = api.LMSGetErrorString( errCode );
            }
            break;
         
         case "getDiagnostic":
            if ( apiVersion >= 1 )
            {
               result = api.GetDiagnostic( error );
            }
            else
            {
               result = api.LMSGetDiagnostic( errorCode );
            }
            break;
      }
      return result;
   }
}

/*******************************************************************************
**
** Searches all the parents of a given window until it finds an object named "API_1484_11" or "API".
** If an object of that name is found, a reference to it is returned. Otherwise, this function
** returns null.
**
** Inputs:  Object - The Window Object
**
** Return:  Object - If the API object is found, it's returned, otherwise null
**          is returned
**
*******************************************************************************/ 
function findAPI( win )
{
	var findAPITries = 0;
	var theAPI       = null;
	// Search each parent window until we find the API, encounter a window with no parent / the 
	// same as the current window, or have reached our MAX_PARENTS_TO_SEARCH to search threshold
	
	while ( ( win.API_1484_11 == null                  ) 
		  && ( win.API         == null                  ) 
		  && ( win.parent      != null                  ) 
		  && ( win.parent      != win                   ) 
		  && ( findAPITries    <= MAX_PARENTS_TO_SEARCH ) )
	{
		findAPITries++;
		win = win.parent;
	}
	if ( win.API_1484_11 != null )
	{
		apiVersion = 1;
		theAPI = win.API_1484_11;
	}
	else if ( win.API != null )
	{
		apiVersion = 0;
		theAPI = win.API;	
	}
	return theAPI;
}

/*******************************************************************************
**
** This function looks for an object named API, first in the current window's
** frame hierarchy and then, if necessary, in the current window's opener window
** hierarchy (if there is an opener window).
**
** Inputs:  none
**
** Return:  Object - If the API object is found, it's returned, otherwise null
**                   is returned
**
*******************************************************************************/
function getAPI()
{
	var api = null;
	// If there are any, search all the parents of the current window
	if ( ( window.parent != null ) && ( window.parent != window ) )
	{
		api = findAPI( window.parent );	
	}
	// If no api was found in this window's chain of parents, then, if there is one, search all 
	// the parents of the opener window
	if ( ( api == null ) && ( window.top.opener != null ) )
	{
		api = findAPI( window.top.opener );	
	}
	if ( api == null )
   {
      var mesgText;
      switch ( TSC.localizationStrings.getLanguage() ) {
         case TSC.languageCodes.GERMAN:
            mesgText = "Die API-Implementierung des LMS-Systems kann nicht gefunden werden.\nDie Kommunikation mit dem LMS-System kann nicht hergestellt werden.";
            break;
         case TSC.languageCodes.JAPANESE:
            mesgText = "LMS の API 実装が見つかりません\nLMS とコミュニケーションできません";
            break;
         case TSC.languageCodes.ENGLISH:
         default:
            mesgText = "Unable to locate the LMS's API Implementation.\nCommunication with the LMS will not occur.";
            break;
      }
      alert( mesgText );
      noAPIFound = "true";
   }
	
	return api;
}

/*******************************************************************************
**
** Returns the handle to API object if it was previously set, otherwise it
** returns null
**
** Inputs:  None
**
** Return:  Object - The value contained by the apiHandle variable.
**
*******************************************************************************/
function getAPIHandle()
{
   if ( apiHandle == null )
   {
      if ( noAPIFound == "false" )
      {
         apiHandle = getAPI();
      }
   }   
   return apiHandle;
}




