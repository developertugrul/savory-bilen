<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent a car | MyDispatch</title>
    <!-- Google font-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" rel="stylesheet">
    <!-- Font Awesome-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/fontawesome.css")}}">
    <!-- ico-font-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/icofont.css")}}">
    <!-- Themify icon-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/themify.css")}}">
    <!-- Flag icon-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/flag-icon.css")}}">
    <!-- Feather icon-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/feather-icon.css")}}">
    <!-- Plugins css start-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/animate.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/chartist.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/date-picker.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/prism.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/vector-map.css")}}">
    <!-- Plugins css Ends-->
    <!-- Bootstrap css-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/bootstrap.css")}}">
    <!-- App css-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/style.css")}}">
    <link id="color" rel="stylesheet" href="{{asset("assets/css/color-1.css")}}" media="screen">
    <!-- Responsive css-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/responsive.css")}}">
    <!-- Web Application Manifest -->
    <link rel="manifest" href="/manifest.json">
    <!-- Chrome for Android theme color -->
    <meta name="theme-color" content="#000000">
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="PWA">
    <link rel="icon" sizes="512x512" href="{{asset("images/icons/icon-512x512.png")}}">
    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="PWA">
    <link rel="apple-touch-icon" href="{{asset("images/icons/icon-512x512.png")}}">
    <link href="{{asset("images/icons/splash-640x1136.png")}}" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-750x1334.png")}}" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-1242x2208.png")}}" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-1125x2436.png")}}" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-828x1792.png")}}" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-1242x2688.png")}}" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-1536x2048.png")}}" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-1668x2224.png")}}" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-1668x2388.png")}}" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="{{asset("images/icons/splash-2048x2732.png")}}" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <!-- Tile for Win8 -->
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{asset("images/icons/icon-512x512.png")}}">
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
<div id="error"></div>
<div id="app"></div>
<script src="{{asset("pwa/promise.js")}}"></script>
<script src="{{asset("pwa/fetch.js")}}"></script>
<script src="{{asset("serviceworker.js")}}"></script>
</body>
</html>
