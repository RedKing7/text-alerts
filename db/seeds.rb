User.destroy_all

rory = User.new();
rory.name = 'Rory'
rory.password = 'password'
rory.phone_number = TEST_NUMBER
rory.save

today = Time.zone.now.to_datetime

Alarm.create({user_id: rory.id, name: 'test alarm', repeat: false, time_of_alarm: today + 5.minutes})
Reminder.create({user_id: rory.id, title: 'test reminder', task: 'test message', time_of_reminder: today + 10.minutes})
