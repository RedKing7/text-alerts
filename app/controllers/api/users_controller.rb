class Api::UsersController < ApplicationController
  def index
    @users = User.all
    @safe_users = []
    @users.each do |user|
      @safe_users.push({name: user.name, id: user.id, has_been_verified: user.has_been_verified})
    end
    render json: @safe_users
  end

  def create
    @user = User.create!(user_params)
    render json: @user
  end

  def show
    @user = User.find(params[:id])
    if @user.verified
      render json: @user
    else
      render json: { name: @user.name, id: @user.id, verified: @user.verified, has_been_verified: @user.has_been_verified}
    end
  end

  def update
    user_id = params[:id]
    @user = User.find_by_id(user_id)
    if @user.verified
      @user.update_attributes(user_params)
      render json: @user
    else
      render json: { error: 'not verified' }
    end
  end

  def destroy
    user_id = params[:id]
    @user = User.find_by_id(user_id)
    if @user.verified || !@user.has_been_verified
      @user = User.find(params[:id]).delete
      render status: :ok
    else
      render json: { error: 'not verified' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :phone_number)
  end
end
