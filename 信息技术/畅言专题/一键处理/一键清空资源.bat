@echo on
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

rd /s /q "%ATeach%\Resources\ebook\"
rd /s /q "%ATeach%\Resources\userbook\"
rd /s /q "%ATeach%\Resources\userbook_bak\"
rd /s /q "%AMate%\resources\ebook\"

md "%ATeach%\Resources\ebook\"
md "%ATeach%\Resources\userbook\"
md "%ATeach%\Resources\userbook_bak\"
md "%AMate%\resources\ebook\"

del ����ƽ̨��ǰĿ¼.txt
del ����ƽ̨����Ŀ¼.txt
del ��ѧϵͳ��ǰĿ¼.txt
del ��ѧϵͳ����Ŀ¼.txt
