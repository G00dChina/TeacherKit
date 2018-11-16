@echo off
REM autocam.bat
REM
REM Example batch file for simple Camtasia Recorder automation.
REM TechSmith Corporation 10/11/02
REM
REM The following Camtasia Recorder command line options allow you to automate/control
REM Recorder very simply from other applications or a batch file.
REM /r - starts/resumes recording using the current Recorder settings
REM      This option fails if Recorder is already recording
REM /p - pause recording
REM      This option fails if Recorder is not running, or if Recorder is not recording
REM /s - stop recording
REM      This option fails if Recorder is not running, or if Recorder is not recording/paused
REM /h - run hidden (hides the Recorder User Interface and disables the hide/unhide tray icon hotkey)
REM      This option always succeeds
REM /x - causes the running instance of Recorder to exit
REM      This option fails if Recorder is not running.  If a recording session is active, the /x option
REM      aborts the capture and discards any video file.  Note that you can safely perform a /s to stop
REM      recording followed by a /x to cause Recorder to exit (e.g. CamRecorder.exe /s/x).
REM 
REM When the command line options are used, Recorder exits with a exit code of 0 on success and 1 on
REM any failure.  The exit code is reflected as the "errorlevel" in DOS batch files.
REM
REM NOTES:
REM - The current Recorder settings are used during command line automation.
REM - Disable the "pause before starting capture" option in Recorder (Options->Preferences->Program).
REM - To run unattended, configure Recorder to save to a fixed or automatic file name (see Options->Preferences->File).
REM - The "ping 127.0.0.1" command used in this batch file is simply an easy way to pause for a while.
REM   A better method would be to use sleep.exe from the Windows Resource Kit.

REM Startup an instance of Recorder.
start CamRecorder.exe
echo Starting up Recorder...
REM Wait for Recorder to startup.
ping 127.0.0.1 -w 10 -n 5 > NUL

REM Start recording.
CamRecorder.exe /r
if errorlevel 1 goto COMMAND_FAILED
echo Start recording...
REM Record for a while...
ping 127.0.0.1 -w 10 -n 5 > NUL

REM Pause.
CamRecorder.exe /p
if errorlevel 1 goto PAUSE_FAILED
goto PAUSE_SUCCESS

:PAUSE_FAILED
REM Pause failed, maybe "pause before starting capture" is enabled.
echo Pause failed, please disable "pause before starting capture" in Recorder.
goto COMMAND_FAILED

:PAUSE_SUCCESS
echo Pause for a while...
REM Pause for a while...
ping 127.0.0.1 -w 10 -n 5 > NUL

REM Start recording again.
CamRecorder.exe /r
if errorlevel 1 goto COMMAND_FAILED
echo Start recording again...
REM Record for a while...
ping 127.0.0.1 -w 10 -n 5 > NUL

REM Tell Recorder to stop recording, save the movie, then exit.
start CamRecorder.exe /s /x
echo Stop recording, save the movie, then exit...
goto END

:COMMAND_FAILED
echo Command line option failed.
REM Tell the running instance of Recorder to exit.
CamRecorder.exe /x

:END
