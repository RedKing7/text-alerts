class AddHasBeenVerifiedToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :has_been_verified, :boolean
  end
end
