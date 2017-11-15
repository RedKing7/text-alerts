class User < ApplicationRecord
  validates :name, presence: true
  validates :phone_number, presence: true

  has_many :alarms, dependent: :destroy
  has_many :reminders, dependent: :destroy
end
