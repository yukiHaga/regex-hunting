Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
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
      get 'logged_in', to: 'user_sessions#logged_in?'
      resources :password_resets, only: %i[create edit update]
    end
  end
end
