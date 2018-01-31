<?php

  namespace Deployer;
  require 'recipe/laravel.php';

  // Configuration
  set('repository', 'git@github.com:alexwhin/huntr.in.git');
  set('keep_releases', 1);
  add('shared_folders', [
    'storage',
    'boostrap/cache'
  ]);
  add('shared_files', [
    '.env'
  ]);

  // Servers
  host('production')
  ->hostname('165.227.107.164')
  ->user('root')
  ->forwardAgent(true)
  ->identityFile('~/.ssh/id_rsa')
  ->set('deploy_path', '/var/www/html');

  // Database update
  before('deploy:symlink', 'artisan:migrate');

  // Automatic unlock
  after('deploy:failed', 'deploy:unlock');
