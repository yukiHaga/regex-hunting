if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_regex_hunting_session',
                                                        domain: '.regex-hunting.com',
                                                        same_site: :none,
                                                        secure: true
else
  Rails.application.config.session_store :cookie_store, key: '_regex_hunting_session'
end

