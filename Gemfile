source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.4'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '6.0.3.6'
# Use sqlite3 as the database for Active Record
# gem 'sqlite3', '~> 1.4'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  # Set up for development and test environments
  gem 'sqlite3', '~> 1.4'
  # Call 'binding.pry' anywhere in the code to stop execution and get a debugger console
  gem 'pry-byebug'
  gem 'rspec-rails', '~> 5.0.0'
  gem 'factory_bot_rails'
end

group :development do
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  # Ruby code style checking and code formatting tool
  gem 'rubocop'
  gem 'rubocop-rails'
  # A code metric tool for rails codes
  gem 'rails_best_practices'
  # Provides a better error page
  gem 'better_errors'
  # Add a console to the error page
  gem 'binding_of_caller'
  # Detect vulnerable code
  gem 'brakeman'
  # help to kill N+1 queries and unused eager loading
  gem 'bullet'
  # RailsAdmin is a Rails engine that provides an easy-to-use interface for managing your data
  # gem 'rails_admin', '~> 2.0.0'
  gem 'letter_opener_web', '~> 1.0'
end

group :production do
  gem 'pg'

  # S3用のgem
  gem 'aws-sdk-s3', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'sprockets', '~> 3.7.2'

# User authentication
gem 'sorcery'

# APIとクライアント側を一つのコマンドで動かす為に導入する。
gem 'foreman'

# Use it to create data
gem 'faker'

# 環境ごとに分けて定数を使用するためのgem
gem 'config'

# シリアライザー
gem 'active_model_serializers'

# seed_fu
gem 'seed-fu'

# new Relic
gem 'newrelic_rpm'

# Sentry
gem 'sentry-rails'
gem 'sentry-ruby'
