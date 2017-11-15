Rails.application.routes.draw do
  get '/', to: 'application#index'
  namespace :api do
    get "users/verify", to: 'users#show_verify', as: 'verify'
    post "users/verify"
    post "users/resend"
    resources :users do
      resources :reminders
      resources :alarms
    end
  end
end
