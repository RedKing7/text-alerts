Rails.application.routes.draw do
  resources :phone_verifications, :only => [:new, :create] do |p|
    collection do
      get 'challenge'
      post 'verify'
      get 'success'
    end
  end
  # get '/', to: 'application#index'
  namespace :api do
    resources :users do
      post 'logout', to: 'users#log_out'
      resources :reminders
      resources :alarms
    end
  end
end
