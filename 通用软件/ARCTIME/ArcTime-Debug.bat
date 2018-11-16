@echo off
set javapath=\tools\jre1.8.0_73\bin\java.exe
echo --------------------------
echo 该版本已包含了Java和VLC播放器，无需另行安装
echo --------------------------
echo 以下是你的Java版本信息：
echo.
echo Path=%cd%%javapath%
"%cd%%javapath%" -version
echo --------------------------
echo.
echo 正在启动Arctime...
"%cd%%javapath%" -Xms128m -jar ArcTime.jar
echo.
echo --------------------------
echo 程序已结束运行，如果Arctime启动过程中出现了异常，请检将此屏幕截图并上报。
echo --------------------------
pause