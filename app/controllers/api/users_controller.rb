class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.create!(user_params)
    
    render json: @user
  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

  def update
    user_id = params[:id]
    @user = User.find_by_id(user_id)
    @user.update_attributes(user_params)
    render json: @user
  end

  def destroy
    @user = User.find(params[:id]).delete

    render status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:name, :phone_number)
  end
end
