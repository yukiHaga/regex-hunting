namespace :start do
  desc 'Start dev server'
  task development: :environment do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start production server'
  task production: :environment do
    exec 'NPM_CONFIG_PRODUCTION=true yarn heroku-postbuild && foreman start'
  end
end
task start: 'start:development'
