@echo off
set /p var=请输入需要备份资源名称:

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

md .\"%var%\%Mate%\resources\ebook"
md .\"%var%\%Teach%\Resources\ebook"\
md .\"%var%\%Teach%\Resources\userbook"\
md .\"%var%\%Teach%\Resources\userbook_bak"\

xcopy /e "%AMate%\resources\ebook\*" ".\%var%\%Mate%\resources\ebook\"
copy "%AMate%\resources"\localresources.dat .\"%var%\%Mate%\resources"\

xcopy /e "%ATeach%\Resources\ebook"\* .\"%var%\%Teach%\Resources\ebook"\
xcopy /e "%ATeach%\Resources\userbook"\* .\"%var%\%Teach%\Resources\userbook"\
xcopy /e "%ATeach%\Resources\userbook_bak"\* .\"%var%\%Teach%\Resources\userbook_bak"\
copy "%ATeach%"\BookshelfInfoSaved.bin .\"%var%\%Teach%"\
copy "%ATeach%"\LatestUsedBookInfoSaved.bin .\"%var%\%Teach%"\
copy "%ATeach%"\LocalBookResourceInfoSaved.bin .\"%var%\%Teach%"\
copy "%ATeach%"\PageIndexSaved.ini .\"%var%\%Teach%"\

del 备课平台当前目录.txt
del 备课平台完整目录.txt
del 教学系统当前目录.txt
del 教学系统完整目录.txt