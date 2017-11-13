class CreateReminders < ActiveRecord::Migration[5.1]
  def change
    create_table :reminders do |t|
      t.string :title
      t.text :task
      t.datetime :time_of_reminder
      t.datetime :time_until
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
