class AddDescriptionToBoard < ActiveRecord::Migration
  def change
    add_column :boards, :description, :string
  end
end
