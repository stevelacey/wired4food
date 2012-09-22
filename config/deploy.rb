# Project

set :application, "wired4food"
set :repository, "git://github.com/stevelacey/#{application}.git"

# Environment

set :domain, "stevelacey.net"
set :branch, "master"

set :deploy_to, "/var/www/#{domain}/subdomains/#{application}"

role :web, domain # Your HTTP server, Apache/etc
role :app, domain # This may be the same as your `Web` server
role :db, domain, :primary => true

# Tasks

## Hooks

after "deploy:update", "deploy:cleanup"

# General

set :scm, :git
set :git_enable_submodules, 1

# Server

set :user, "steve"
set :group, "www-data"

set :use_sudo, false

ssh_options[:forward_agent] = true

# Remote Cache

set :deploy_via, :remote_cache
set :repository_cache, "cache"
