echo off
set /p var=请输入已备份在当前文件夹内的资源名称:

for %%i in (c:,d:,e:) do dir %%i\"Program files\iFlytek BBT Mat?" /a:d /b>>备课平台当前目录.txt
for %%j in (c:,d:,e:) do dir %%j\"Program files\iFlytek BBT20 Mat?" /a:d /b>>备课平台当前目录.txt
for /f "delims=" %%k in (.\备课平台当前目录.txt) do set Mate=%%k
for %%l in (c:,d:,e:) do if exist "%%l\Program files\%Mate%" echo %%l\Program files\%Mate%>>备课平台完整目录.txt
for /f "delims=" %%m in (.\备课平台完整目录.txt) do set AMate=%%m

for %%I in (c:,d:,e:) do dir %%I\"Program files\iFlytek BB?" /a:d /b>>教学系统当前目录.txt
for %%J in (c:,d:,e:) do dir %%J\"Program files\iFlytek BBT2?" /a:d /b>>教学系统当前目录.txt
for /f "delims=" %%K in (.\教学系统当前目录.txt) do set Teach=%%K
for %%L in (c:,d:,e:) do if exist %%L\"Program files\%Teach%" echo %%L\Program files\%Teach%>>教学系统完整目录.txt
for /f "delims=" %%M in (.\教学系统完整目录.txt) do set ATeach=%%M

for %%n in ("iFlytek BBT20 Mate","iFlytek BBT Mate") do if exist .\"%var%\%Mate%" xcopy /q /y /e .\"%var%\%Mate%"\* "%AMate%"\
for %%N in ("iFlytek BBT20","iFlytek BBT") do if exist .\"%var%\%Teach%" xcopy /q /y /e .\"%var%\%Teach%"\* "%ATeach%"\

del 备课平台当前目录.txt
del 备课平台完整目录.txt
del 教学系统当前目录.txt
del 教学系统完整目录.txt