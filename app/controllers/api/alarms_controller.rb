class Api::AlarmsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    if @user.verified
      render json: @user.alarms
    else
      render json: { error: 'not verified' }
    end
  end

  def show
    @user = User.find(params[:user_id])
    if @user.verified
      @alarm = Alarm.find(params[:id])
  
      render json: @alarm
    else
      render json: { error: 'not verified' }
    end
  end

  def create
    @user = User.find(params[:user_id])
    if @user.verified
      @alarm = Alarm.new(alarm_params)
  
      @user.alarms << @alarm
      @user.save!
  
      render json: @alarm
    else
      render json: { error: 'not verified' }
    end
  end

  def update
    @user = User.find(params[:user_id])
    if @user.verified
      @alarm = Alarm.find(params[:id])
      @alarm.update_attributes(alarm_params)
  
      render json: @alarm
    else
      render json: { error: 'not verified' }
    end
  end

  def destroy
    @user = User.find(params[:user_id])
    if @user.verified
      @alarm = Alarm.find(params[:id]).delete
  
      render status: :ok
    else
      render json: { error: 'not verified' }
    end
  end

  private

  def alarm_params
    params.require(:alarm).permit(:name, :task, :time_of_alarm, :repeat)
  end
end
