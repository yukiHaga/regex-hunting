Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'start', to: 'game_managements#start'
      post 'finish', to: 'game_managements#finish'

      resources :user, only: :create do
        get 'my-page', to: 'my_pages#index'
        get 'percent', to: 'percents#get_correct_percents'
        get 'account-settings', to: 'account_settings#update'
        get 'title-settings', to: 'title_settings#update'
      end
      get 'ranking', to: 'rankings#index'
      post 'login', to: 'user_sessions#create'
      delete 'logout', to: 'user_sessions#destroy'
      resources :password_resets, only: %i[create edit update]
    end
  end
end
