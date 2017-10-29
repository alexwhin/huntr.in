<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Example</title>
    </head>
    <body>

        <!-- <iframe src="https://flowxo.com/" frameborder="0" style="width: 100%; height: 100%;"></iframe> -->

        <script type="text/javascript">
          window.huntr = {
            slug: '<?php echo $_GET['slug'] ?>'
          };
          a = document.createElement('script');
          a.src = 'https://592d8269.ngrok.io/widget/app.js';
          document.body.appendChild(a);
        </script>

    </body>
</html>
