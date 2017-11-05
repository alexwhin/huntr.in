<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Product Hunt Reviews Widget - Huntr.in</title>
  <meta name="google-site-verification" content="O9gKtHAGgu_gPlhVAHQ_6YWGdOLTP_vLBCjSlomzeBA" />
</head>
<body>

  <div id="app">

    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="hero">
            <a href="#" class="logo">huntr</a>
            <h1>Product Hunt Reviews Widget</h1>
            <h2>Improve product trust &amp; encourage reviews... for free 🙀</h2>

            <widget-editor></widget-editor>
          </div>
        </div>

        <div class="column">
          <div class="huntr-example">
            <div id="huntr-example"></div>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="white">

      <div class="container">
        Something
      </div>

    </div>

  </div>

  <link href="app/css/app.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css">
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

  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-43130225-8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-43130225-8');
  </script>

</body>
</html>
