class CreateAlarms < ActiveRecord::Migration[5.1]
  def change
    create_table :alarms do |t|
      t.string :name
      t.datetime :time_of_alarm
      t.boolean :repeat
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
