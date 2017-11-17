class User < ApplicationRecord
  has_many :alarms, dependent: :destroy
  has_many :reminders, dependent: :destroy
  
  validates :name, presence: true
  validates :phone_number, presence: true

  before_save :user_timeout, if: :verified_changed?

  def timeout_time
    10.minutes.from_now
  end

  def user_timeout
    self.update_column(:verified, false)
  end
  handle_asynchronously :user_timeout, :run_at => proc { |i| i.timeout_time }
end
