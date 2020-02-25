Rails.application.routes.draw do
  # resources :reviews
  # namespace :api do
  #   namespace :v1 do

      resources :books do
        # resources :reviews
      end

      resources :lists do
        resources :books
      end

      resources :users do
        resources :reviews
        resources :lists
      end

      resources :reviews

      resources :users

  #   end
  # end

  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :users,
            path: '',
            path_names: {
              sign_in: 'login',
              sign_out: 'logout',
              registration: 'signup'
            },
            controllers: {
              sessions: 'sessions',
              registrations: 'registrations'
            }
            # root to: "api/v1/home#index"
            root to: "home#index"
            get 'profile', to: "home#profile"

end
