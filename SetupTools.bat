
@echo off
cd  �𰲽�ʦ������
echo set WshShell = WScript.CreateObject("WScript.Shell")>tmp.vbs
echo strDesktop = WshShell.SpecialFolders("Desktop")>>tmp.vbs
echo set oShellLink = WshShell.CreateShortcut(strDesktop ^& "\�𰲽�ʦ������.lnk")>>tmp.vbs
echo  currentpath = createobject("Scripting.FileSystemObject").GetFolder(".").Path+"\�𰲽�ʦ������.exe">>tmp.vbs
echo oShellLink.TargetPath =currentpath>>tmp.vbs
echo oShellLink.WindowStyle ="1">>tmp.vbs
echo oShellLink.Hotkey = "CTRL+SHIFT+Q">>tmp.vbs
echo oShellLink.IconLocation = currentpath>>tmp.vbs
echo oShellLink.Description = "�𰲽�ʦ�����䣬�����ڽ𰲵���ʦ�ǡ�">>tmp.vbs
echo oShellLink.WorkingDirectory = strDesktop>>tmp.vbs
echo oShellLink.Save>>tmp.vbs
call tmp.vbs
@del /f /q tmp.vbs
@start readme.txt
@del /f /q SetupTools.bat