class Reminder < ApplicationRecord
  belongs_to :user
  validates :title, :time_of_reminder, :task, presence: true

  after_create :send_reminder
  before_create :confirmation

  def send_reminder
    @phone_number = User.find(self.user_id).phone_number
    puts @phone_number
    time_str = ((self.time_of_reminder).localtime).strftime("%I:%M%p on %b. %d, %Y")
    reminder = "#\n#{self.title}\n#{self.task}"
    @client = Twilio::REST::Client.new ACCOUNT_SID, AUTH_TOKEN
    message = @client.messages.create(
      :from => TWILIO_NUMBER,
      :to => @phone_number,
      :body => reminder
    )

    # :completed = true
  end

  def when_to_run
    time_of_reminder
  end

  handle_asynchronously :send_reminder, :run_at => proc { |i| i.when_to_run }

  def confirmation
    time_str = ((time_of_reminder).localtime).strftime("%I:%M%p on %b. %d, %Y")
    @phone_number = User.find(user_id).phone_number
    puts @phone_number
    @client = Twilio::REST::Client.new ACCOUNT_SID, AUTH_TOKEN
    message = @client.messages.create(
      body: "\nYou scheduled a reminder for #{time_str}.",
      to: @phone_number,
      from: TWILIO_NUMBER
    )
  end
end
