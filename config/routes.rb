Rails.application.routes.draw do
  get '/', to: 'application#index'
  # namespace :api do
  #   get "/thing(s)", to: "thing(s)#index", as: "thing(s)"
  # end
  get '/test', to: 'application#twilio_test'
end
