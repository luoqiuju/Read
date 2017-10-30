# Read

- Read
- |- img(app应用icon等)
- |- jqm (JQueryMobile文件)
- |- js
-     |- Jquery.js
-     |- lesson.js (课程页面对应的操作,课程列表, 控制音频播放等)
-     |- pic.js (图片列表, 查看大图)
-     |- sound.js (加载sound.html, 音标点读)
-     |- theme.js (加载时的主题,切换夜间主题)
- |- source
-          |-images
-          |- lesson (音频和相应的lrc文件,文件可随意添加 )
-          |- sound (音标音频)
-          |- lessonList.php (读取lrc文件内容,提取文件名; 生成列表链接)
-          |- lessonMp3.php (检测lesson文件夹内是否含有与传入文件名同名的Mp3文件)
-          |- lessonText.php (读取输出lrc文字内容)
- |- index.html
- |- index.css
- |- sound.html


-涉及的内容有:
-HTML5 
-CSS
-JQueryMobile
-Ajax
-PHP
