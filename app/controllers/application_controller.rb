class ApplicationController < ActionController::API
  def index
    render json: 'Hello, from ApplicationController!'
  end
  def twilio_test
    @client = Twilio::REST::Client.new TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
    message = @client.messages.create(
      body: "Hello from Rails!",
      to: TEST_NUMBER,    # Replace with your phone number
      from: TWILIO_NUMBER)  # Replace with your Twilio number
    puts message.sid

    render json: message.sid
  end
end
