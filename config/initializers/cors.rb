# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# credentials: trueを設定することで、フロント側でCookieを保持することができる
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001', 'https://regex-hunting.herokuapp.com/'

    resource '*',
             headers: :any,
             expose: ['X-CSRF-Token'],
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
