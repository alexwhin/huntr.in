<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" type="image/png" href="images/fav.png" />
  <title>Product Hunt Reviews Widget - Huntr.in</title>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@alex_whin" />
  <meta name="twitter:creator" content="@alex_whin" />
  <meta property="og:url" content="https://huntr.in/" />
  <meta property="og:title" content="Product Hunt Reviews Widget - Huntr.in" />
  <meta property="og:description" content="Improve product trust and encourage reviews... for free 🙀" />
  <meta property="og:image" content="https://huntr.in/images/shot.jpg" />
</head>
<body>

  <div id="app">

    <div class="container">
      <div class="columns split-columns">
        <div class="column">
          <div class="hero">
            <a href="https://huntr.in/" title="Product Hunt Reviews Widget" class="logo">huntr</a>
            <h1>Product Hunt Reviews Widget</h1>
            <h2>Improve product trust <span class="tablet-text">&amp; encourage reviews</span>... for free 🙀</h2>

            <widget-editor></widget-editor>
          </div>
        </div>

        <div class="column">
          <div class="huntr-example">
            <div id="huntr-example"></div>
          </div>
        </div>
      </div>

      <hr>

      <div class="foot">
        <div class="columns">
          <div class="column">
            <em>huntr</em> &copy; 2017 &nbsp; <span class="affiliated">Not directly affiliated with ProductHunt</span>
          </div>
          <div class="column right">
            <span class="desktop-text">Questions or enquiries? Tweet </span><a href="https://twitter.com/@alex_whin" target="_blank">@alex_whin</a> or email <a href="mailto:hello@huntr.in">hello@huntr.in</a>
          </div>
        </div>
      </div>

    </div>

  </div>

  <link href="app/css/app.css" rel="stylesheet">
  <script src="app/js/app.js"></script>

  @if (config('app.env') == 'local')
    <script> window.localhost = true </script>
  @endif

  <script type="text/javascript">
    window.huntr = {
      slug: 'example',
      exampleWidget: true
    };
    a = document.createElement('script');
    a.src = '{{ url('/') }}/x.js';
    document.body.appendChild(a);
  </script>

  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css">

  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-43130225-8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-43130225-8');
  </script>

</body>
</html>
