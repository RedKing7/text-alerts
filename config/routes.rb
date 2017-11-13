Rails.application.routes.draw do
  get '/', to: 'application#index'
  namespace :api do
    resources :users do
      resources :reminders
      resources :alarms
    end
  end
  # get '/test', to: 'application#twilio_test'
end
