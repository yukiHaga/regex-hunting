Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'start', to: 'game_managements#start'
      post 'finish', to: 'game_managements#finish'

      resources :user, only: %i(create update) do
        get 'my-page', to: 'my_pages#index'
        get 'ranking', to: 'rankings#index'
        get 'percent', to: 'percents#get_correct_percent'
      end
      post 'login', to: 'user_sessions#create'
      delete 'logout', to: 'user_sessions#destroy'
    end
  end
end
