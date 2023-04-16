<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">

 <!-- Open Graph tags -->
 <meta property="og:title" content="nawi 🌪️ 🌊 🔥 🌍 🌪️">
 <meta property="og:description" content="Discover nawi, a captivating game of elemental strategy built by Human+AI collaboration with 💜. Experience the magic of Air, Water, Fire, and Earth in a unique gameplay experience.">
 <meta property="og:image" content="https://nawi.fun/images/nawi-og-image.png">
 <meta property="og:url" content="https://nawi.fun">

 <title>nawi 🌪️ 🌊 🔥 🌍 🌪️</title>

 <!-- Fonts -->
 <link rel="preconnect" href="https://fonts.bunny.net">
 <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

 <!-- Scripts -->
 <script id="mcjs">
  ! function(c, h, i, m, p) {
   m = c.createElement(h), p = c.getElementsByTagName(h)[0], m.async = 1, m.src = i, p.parentNode.insertBefore(m, p)
  }(document, "script", "https://chimpstatic.com/mcjs-connected/js/users/090e23a72386cef05be084574/37e27cbdc393016c7145bb93f.js");
 </script>
 @routes
 @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
 @inertiaHead
</head>

<body class="font-sans antialiased">
 @inertia
</body>

</html>
