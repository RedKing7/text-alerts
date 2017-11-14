class Alarm < ApplicationRecord
  belongs_to :user
  validates :name, :time_of_alarm, presence: true

  after_create :send_reminder
  before_create :confirmation

  def send_reminder
    @phone_number = User.find(user_id).phone_number
    puts @phone_number
    alarm = "#\n#{name}"
    @client = Twilio::REST::Client.new ACCOUNT_SID, AUTH_TOKEN
    message = @client.messages.create(
      :from => TWILIO_NUMBER,
      :to => @phone_number,
      :body => alarm
    )

    # :completed = true
  end

  def when_to_run
    time_of_alarm
  end

  handle_asynchronously :send_reminder, :run_at => proc { |i| i.when_to_run }

  def confirmation
    time_str = ((time_of_alarm).localtime).strftime("%I:%M%p on %b. %d, %Y")
    @phone_number = User.find(user_id).phone_number
    puts @phone_number
    @client = Twilio::REST::Client.new ACCOUNT_SID, AUTH_TOKEN
    message = @client.messages.create(
      body: "\nYou scheduled an alarm for #{time_str}.",
      to: @phone_number,
      from: TWILIO_NUMBER
    )
  end
end
