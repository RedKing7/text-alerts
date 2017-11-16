class PhoneVerificationsController < ApplicationController
  def create
    # session[:phone_number] = params[:phone_number]
    # session[:country_code] = '+1' # US country code
    @response = Authy::PhoneVerification.start(
      via: "sms",
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
    @response = Authy::PhoneVerification.check(
      verification_code: params[:code],
      country_code: 1,
      # phone_number: session[:phone_number]
      phone_number: params[:phone_number]
    )
    if @response.ok?
      # session[:phone_number] = nil
      # session[:country_code] = nil
      render json: 'success'
    else
      render json: @response
    end
  end
end
