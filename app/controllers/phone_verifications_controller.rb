class PhoneVerificationsController < ApplicationController
  def create
    user = User.find(params[:user_id])
    @response = Authy::PhoneVerification.start(
      via: 'sms',
      country_code: 1, # US country code
      phone_number: params[:phone_number]
    )
    if @response.ok?
      render json: 'success'
    else
      render json: @response
    end
  end

  def verify
    user = User.find(params[:user_id])
    @response = Authy::PhoneVerification.check(
      verification_code: params[:code],
      country_code: 1,
      phone_number: params[:phone_number]
    )
    if @response.ok?
      user.verified = true
      user.save
      render json: 'success'
    else
      render json: @response
    end
  end

  # start delayed job to un-verify user in 20-30 minutes
end
