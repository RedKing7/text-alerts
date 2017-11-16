class Api::RemindersController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    if @user.verified
      @reminders = @user.reminders
      render json: @reminders
    else
      render json: { error: 'not verified' }
    end
  end

  def show
    @user = User.find(params[:user_id])
    if @user.verified
      @reminder = Reminder.find(params[:id])
  
      render json: @reminder
    else
      render json: { error: 'not verified' }
    end
  end

  def create
    @user = User.find(params[:user_id])
    if @user.verified
      @reminder = Reminder.new(reminder_params)

      @user.reminders << @reminder
      @user.save!

      render json: @reminder
    else
      render json: { error: 'not verified' }
    end
  end

  def update
    @user = User.find(params[:user_id])
    if @user.verified
      @reminder = Reminder.find(params[:id])
      @reminder.update_attributes(reminder_params)
  
      render json: @reminder
    else
      render json: { error: 'not verified' }
    end
  end

  def destroy
    @user = User.find(params[:user_id])
    if @user.verified
      @reminder = Reminder.find(params[:id]).delete
      
      render status: :ok
    else
      render json: { error: 'not verified' }
    end

  end

  private

  def reminder_params
    params.require(:reminder).permit(:title, :task, :time_of_reminder)
  end
end
