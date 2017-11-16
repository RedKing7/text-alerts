class RemoveAuthyIdAndEmailAndPasswordFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :authy_id, :string
    remove_column :users, :email, :string
    remove_column :users, :password, :string
  end
end
