class CreateTitles < ActiveRecord::Migration[6.0]
  def change
    create_table :titles do |t|
      t.string :name, null: false
      t.text :release_condition, null: false

      t.timestamps
    end
  end
end
