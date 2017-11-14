class Alarm < ApplicationRecord
  belongs_to :user
  validates :name, :time_of_alarm, :repeat, presence: true

  # after_create
end
