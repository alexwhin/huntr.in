<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Example</title>
  <style>
  html, body {
    font-family: 'Raleway', sans-serif;
    background-color: #f9f9f9;
    padding: 60px 0 30px
    text-align: center
    font-weight: 100;
    color: #636b6f;
    height: 100vh;
    margin: 0;
  }
  </style>
</head>
<body>

  <script type="text/javascript">
    window.huntr = {
      slug: '<?php echo (!empty($_GET['slug'])) ? $_GET['slug'] : '' ?>'
    };
    a = document.createElement('script');
    a.src = '{{ url('/') }}/x.js';
    document.body.appendChild(a);
  </script>
  @if (config('app.env') == 'local')
    <script> window.localhost = true </script>
  @endif

</body>
</html>
