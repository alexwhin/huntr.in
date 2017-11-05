<?php

  namespace Deployer;
  require 'recipe/laravel.php';

  // Configuration
  set('repository', 'git@github.com:alexwhin/huntr.in.git');
  set('keep_releases', 1);
  add('shared_files', [
    '.env'
  ]);

  // Servers
  host('production')
  ->hostname('165.227.107.164')
  ->user('root')
  ->identityFile('~/.ssh/id_rsa')
  ->forwardAgent(true)
  ->set('deploy_path', '/var/www/html');

  // Database update
  before('deploy:symlink', 'artisan:migrate');

  // Automatic unlock
  after('deploy:failed', 'deploy:unlock');
