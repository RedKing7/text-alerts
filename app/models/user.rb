class User < ApplicationRecord
  validates :name, presence: true
  validates :phone_number, presence: true
  validates :email, presence: true, format: { with: /\A.+@.+$\Z/ }, uniqueness: true

  has_many :alarms, dependent: :destroy
  has_many :reminders, dependent: :destroy
end
