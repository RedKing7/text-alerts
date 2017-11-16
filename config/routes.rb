Rails.application.routes.draw do

  resources :phone_verifications, :only => [:new, :create] do |p|
    collection do
      get 'challenge'
      post 'verify'
      get 'success'
    end
  end

  get '/', to: 'application#index'
  namespace :api do
    # get "users/verify", to: 'users#show_verify', as: 'verify'
    # post "users/verify"
    # post "users/resend"
    resources :users do
      resources :reminders
      resources :alarms
    end
  end
end
