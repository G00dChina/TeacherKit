@ECHO OFF&PUSHD %~DP0 &TITLE �̻���ѡ��
mode con cols=36 lines=20
color 2F
Rd "%WinDir%\system32\test_permissions" >NUL 2>NUL
Md "%WinDir%\System32\test_permissions" 2>NUL||(Echo ��ʹ���Ҽ�����Ա������У�&&PAUSE >NUL&&EXIT)
Rd "%WinDir%\System32\test_permissions" 2>NUL
SetLocal EnableDelayedExpansion
:Menu
Cls
@ echo.
@ echo.���������� �� �� ѡ ��
@ echo.
@ echo.     �̻�[����] �� ������1
@ echo.
@ echo.     ��������ͼ�� �� ������2
@ echo.
@ echo.     ж�� �� ������3
@ echo.
set /p xj= �������ְ��س���
if /i "%xj%"=="1" Goto Install
if /i "%xj%"=="2" Goto Establish
if /i "%xj%"=="3" Goto Uninstall
@ echo.
echo      ѡ����Ч������������
ping -n 2 127.1>nul 
goto menu
:Install
@ echo.
ECHO ���������ڰ�װ��..���Ե�..
taskkill /f /im et*>NUL 2>NUL
taskkill /f /im wpp*>NUL 2>NUL
taskkill /f /im wps*>NUL 2>NUL
taskkill /f /im wpscloudsvr*>NUL 2>NUL
cd office6 2>NUL
ksomisc.exe -register 2>NUL
ksomisc.exe -reg_kso 2>NUL
ksomisc.exe -reg_kde 2>NUL
ksomisc.exe -reg_wps 2>NUL
ksomisc.exe -reg_wpp 2>NUL
ksomisc.exe -reg_et 2>NUL
ksomisc.exe -regksee 2>NUL
ksomisc.exe -regmtfont 2>NUL
ksomisc.exe -rename 2052 install 2>NUL
ksomisc.exe -Assoword 2>NUL
ksomisc.exe -Assoexcel 2>NUL
ksomisc.exe -Assopowerpnt 2>NUL
ksomisc.exe -compatiblemso 2>NUL
ksomisc.exe -saveas_mso 2>NUL
ksomisc.exe -rebuildicon 2>NUL
rd/s/q "%AppData%\Kingsoft\office6"2>NUL
rd/s/q "%AppData%\Kingsoft\wps"2>NUL
rd/s/q "%AppData%\Kingsoft\kaccountsdk"2>NUL
rd/s/q "%AppData%\Kingsoft\kdynsdk"2>NUL
rd/s/q "%LocalAppData%\Kingsoft\WPS Cloud Files"2>nul
reg delete HKCU\Software\Kingsoft\Office /F>NUL 2>NUL
reg add HKCR\.doc\WPS.Doc.6\ShellNew /v FileName /d "%cd%\mui\zh_CN\templates\newfile.wps" /F>NUL 2>NUL
reg add HKCR\.docx\WPS.Docx.6\ShellNew /v "FileName" /d "%cd%\mui\zh_CN\templates\newfile.wps" /F>NUL 2>NUL
reg add HKCR\.ppt\WPP.PPT.6\ShellNew /v "FileName" /d "%cd%\mui\zh_CN\templates\newfile.dps" /F>NUL 2>NUL
reg add HKCR\.pptx\WPP.PPTX.6\ShellNew /v "FileName" /d "%cd%\mui\zh_CN\templates\newfile.pptx" /F>NUL 2>NUL
reg add HKCR\.xls\ET.Xls.6\ShellNew /v "FileName" /d "%cd%\mui\zh_CN\templates\newfile.et" /F>NUL 2>NUL
reg add HKCR\.xlsx\ET.Xlsx.6\ShellNew /v "FileName" /d "%cd%\mui\zh_CN\templates\newfile.xlsx" /F>NUL 2>NUL
reg add HKCR\.xlsm\ET.Xlsm.6\ShellNew /v "FileName" /d "%cd%\mui\zh_CN\templates\newfile.xlsx" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\plugins\officespace /v "roaminghomepageguidedtag" /d "10.1.0.5866" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\et /v "uifile" /d "res/etongmani.kui" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\wps /v "uifile" /d "res/wpsongmani.kui" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\wpp /v "uifile" /d "res/wppongmani.kui" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\common /v "InstallRoot" /d "%~dp0" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\Common\wpshomeoptions /v "StartWithType" /t "REG_DWORD" /d "0" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\plugins\homepage /v "HasShowTip" /t "REG_SZ" /d "true" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\plugins\homepage /v "PresetChannel" /t "REG_SZ" /d "drive" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\Office\6.0\plugins\officespace\flogin /v "userPaneShowed" /t "REG_SZ" /d "1" /F>NUL 2>NUL
reg add HKCU\Software\Kingsoft\wpscloud /v "LibPath" /d "%~dp0office6/addons//qing/qingbangong.dll" /F>NUL 2>NUL
md "%LocalAppData%\Kingsoft\WPS Cloud Files\userdata\qing" 2>NUL
cd /d %LocalAppData%\Kingsoft\WPS Cloud Files\userdata\qing 2>NUL
echo [General]>>config.ini 2>NUL
echo autologin=1 >>config.ini 2>NUL
goto Install2
:Establish
cd office6 2>NUL
ksomisc.exe -createlink desktop 2>NUL
goto fanhui
:Uninstall
@ echo.
echo ����������ж����..���Ե�..
taskkill /f /im et*>NUL 2>NUL
taskkill /f /im wpp*>NUL 2>NUL
taskkill /f /im wps*>NUL 2>NUL
taskkill /f /im wpscloudsvr*>NUL 2>NUL
cd office6 2>NUL
ksomisc.exe -deletelink desktop 2>NUL
ksomisc.exe -externaltask delete 2>NUL
ksomisc.exe -rename 2052 uninstall 2>NUL
ksomisc.exe -uncompatiblemso 2>NUL
ksomisc.exe -unassoword 2>NUL
ksomisc.exe -unassopowerpnt 2>NUL
ksomisc.exe -unassoexcel 2>NUL
ksomisc.exe -unregister 2>NUL
ksomisc.exe -unregksee 2>NUL
ksomisc.exe -unreg_wps 2>NUL
ksomisc.exe -unreg_wpp 2>NUL
ksomisc.exe -unreg_et 2>NUL
ksomisc.exe -unreg_kso 2>NUL
ksomisc.exe -unreg_kde 2>NUL
ksomisc.exe -unregoledefhndlr 2>NUL
ksomisc.exe -unregmtfont 2>NUL
reg delete "HKCR\.doc\WPS.Doc.6" /F>NUL 2>NUL
reg delete "HKCR\.docx\WPS.Docx.6" /F>NUL 2>NUL
reg delete "HKCR\.ppt\WPP.PPT.6" /F>NUL 2>NUL
reg delete "HKCR\.pptx\WPP.PPTX.6" /F>NUL 2>NUL
reg delete "HKCR\.xls\ET.Xls.6" /F>NUL 2>NUL
reg delete "HKCR\.xlsx\ET.Xlsx.6" /F>NUL 2>NUL
reg delete "HKCR\.xlsm\ET.Xlsm.6" /F>NUL 2>NUL
reg delete "HKCU\Software\Kingsoft\Office" /F>NUL 2>NUL
reg delete "HKCU\Software\Kingsoft\wpscloud" /F>NUL 2>NUL
rd/s/q "%AppData%\Kingsoft\office6"2>NUL
rd/s/q "%AppData%\Kingsoft\wps"2>NUL
rd/s/q "%AppData%\Kingsoft\kaccountsdk"2>NUL
rd/s/q "%AppData%\Kingsoft\kdynsdk"2>NUL
rd/s/q "%LocalAppData%\Kingsoft\WPS Cloud Files"2>nul
goto Uninstall2
:fanhui
@ ECHO.
ECHO �������������..
ping -n 2 127.8>nul
goto menu
:Install2
@ ECHO.
ECHO ��������װ���..
ping -n 2 127.8>nul
goto menu
:Uninstall2
@ ECHO.
ECHO ������ж�����..
ping -n 2 127.8>nul
goto menu
