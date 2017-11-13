class Api::AlarmsController < ApplicationController
  def index
    @alarms = User.find(params[:user_id]).alarms
    render json: @alarms
  end

  def show
    @alarm = Alarm.find(params[:id])

    render json: @alarm
  end

  def create
    @user = User.find(params[:user_id])
    @alarm = Alarm.new(alarm_params)

    @user.alarms << @alarm
    @user.save!

    render json: @alarm
  end

  def update
    @alarm = Alarm.find(params[:id])
    @alarm.update_attributes(alarm_params)

    render json: @alarm
  end

  def destroy
    @alarm = Alarm.find(params[:id]).delete

    render status: :ok
  end

  private

  def alarm_params
    params.require(:alarm).permit(:name, :task, :time_of_alarm, :repeat)
  end
end
