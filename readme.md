# Front

## Старт
+ `npm install && bower install && npm install -g modernizr && npm run-script modernizr`  
+ `gulp`

## Сборка

### gulp
gulp ['jade', 'sass', 'js', 'browser-sync', 'watch']  
gulp img  
gulp sprite  
gulp base64  
gulp build  
gulp build:del  
gulp gitkeep	// rm gitkeep files

### modernizr
+ npm install -g modernizr  
+ добавить файл modernizr-config.json в /root Пример файла https://gist.github.com/rosivanov/58541f2126e63d91bb89db89ff286ad1 или есть в modernizr модуле npm/node_modules/modernizr/lib/config-all.json  
+ в modernizr-config.json ненужные проверки закомментированы, чтобы добавить проверку нужно найти и перенести нужную строку в 'feature-detects', затем выполнить npm run-script modernizr  
+ билд modernizr ```npm run-script modernizr``` или ```modernizr --config modernizr-config.json --dest dev/components/modernizr/ --uglify```  
+ добавить modernizr.js в head без async/defer

## Libs
см bower.json

## CSS

### SCSS

### Сетка Lost
[https://github.com/peterramsing/lost](https://github.com/peterramsing/lost)

## Адаптив, точки
$w480: 480px;
$w640: 640px;
$w768: 768px;
$w1024: 1024px;
$w1280: 1280px;
$w1366: 1366px;

## Адаптив, контейнеры
.container  

## Шрифт
