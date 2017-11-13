class User < ApplicationRecord
  has_many :alarms, dependent: :destroy
  has_many :reminders, dependent: :destroy
end
