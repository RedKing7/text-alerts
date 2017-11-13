class Api::RemindersController < ApplicationController
  def index
    @reminders = User.find(params[:user_id]).reminders
    render json: @reminders
  end

  def show
    @reminder = Reminder.find(params[:id])

    render json: @reminder
  end

  def create
    @user = User.find(params[:user_id])
    @reminder = Reminder.new(reminder_params)

    @user.reminders << @reminder
    @user.save!

    render json: @reminder
  end

  def update
    @reminder = Reminder.find(params[:id])
    @reminder.update_attributes(reminder_params)

    render json: @reminder
  end

  def destroy
    @reminder = Reminder.find(params[:id]).delete

    render status: :ok
  end

  private

  def reminder_params
    params.require(:reminder).permit(:title, :task, :time_of_reminder)
  end
end
