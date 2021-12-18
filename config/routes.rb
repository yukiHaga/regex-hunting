Rails.application.routes.draw do
  # React Routerを本番環境で動かす為に必要なルーティング
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  namespace :api do
    namespace :v1 do
      get 'start', to: 'game_managements#start'
      post 'finish', to: 'game_managements#finish'

      resources :users, only: :create do
        get 'my-page', to: 'my_pages#index'
        get 'percent', to: 'percents#get_correct_percents'
        patch 'account-settings', to: 'account_settings#update'
        patch 'title-settings', to: 'title_settings#update'
      end
      get 'ranking', to: 'rankings#index'
      post 'login', to: 'user_sessions#create'
      delete 'logout', to: 'user_sessions#destroy'
      get 'current_user_logged_in', to: 'user_sessions#current_user_logged_in?'
      post "oauth/callback", to: "oauths#callback"
      resources :password_resets, only: %i[create edit update]
    end
  end
end
