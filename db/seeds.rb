User.destroy_all

rory = User.new();
rory.name = 'Rory'
rory.password = 'password'
rory.phone_number = TEST_NUMBER
rory.save

alert_time = 1.minutes.from_now # Time.zone.now.to_datetime

Alarm.create({user_id: rory.id, name: 'test alarm', repeat: false, time_of_alarm: alert_time})
# Reminder.create({user_id: rory.id, title: 'test reminder', task: 'complete [test] task', time_of_reminder: alert_time})
