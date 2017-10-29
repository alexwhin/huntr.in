<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Example</title>
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                text-align: center
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                padding: 60px 0 30px
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
          a.src = '{!! url('/') !!}/widget/app.js';
          document.body.appendChild(a);
        </script>

    </body>
</html>
