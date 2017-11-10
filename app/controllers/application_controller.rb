class ApplicationController < ActionController::API
  def index
    render json: 'Hello, from ApplicationController!'
  end
end
