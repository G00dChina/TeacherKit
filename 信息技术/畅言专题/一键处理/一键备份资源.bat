@echo off
set /p var=��������Ҫ������Դ����:

for %%i in (c:,d:,e:) do dir %%i\"Program files\iFlytek BBT Mat?" /a:d /b>>����ƽ̨��ǰĿ¼.txt
for %%j in (c:,d:,e:) do dir %%j\"Program files\iFlytek BBT20 Mat?" /a:d /b>>����ƽ̨��ǰĿ¼.txt
for /f "delims=" %%k in (.\����ƽ̨��ǰĿ¼.txt) do set Mate=%%k
for %%l in (c:,d:,e:) do if exist "%%l\Program files\%Mate%" echo %%l\Program files\%Mate%>>����ƽ̨����Ŀ¼.txt
for /f "delims=" %%m in (.\����ƽ̨����Ŀ¼.txt) do set AMate=%%m

for %%I in (c:,d:,e:) do dir %%I\"Program files\iFlytek BB?" /a:d /b>>��ѧϵͳ��ǰĿ¼.txt
for %%J in (c:,d:,e:) do dir %%J\"Program files\iFlytek BBT2?" /a:d /b>>��ѧϵͳ��ǰĿ¼.txt
for /f "delims=" %%K in (.\��ѧϵͳ��ǰĿ¼.txt) do set Teach=%%K
for %%L in (c:,d:,e:) do if exist %%L\"Program files\%Teach%" echo %%L\Program files\%Teach%>>��ѧϵͳ����Ŀ¼.txt
for /f "delims=" %%M in (.\��ѧϵͳ����Ŀ¼.txt) do set ATeach=%%M

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

del ����ƽ̨��ǰĿ¼.txt
del ����ƽ̨����Ŀ¼.txt
del ��ѧϵͳ��ǰĿ¼.txt
del ��ѧϵͳ����Ŀ¼.txt