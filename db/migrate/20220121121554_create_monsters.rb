class CreateMonsters < ActiveRecord::Migration[6.0]
  def change
    create_table :monsters do |t|
      t.string :name, null: false
      t.integer :max_hp, null: false
      t.integer :attack, null: false
      t.integer :defence, null: false
      t.integer :difficulty, null: false, default: 0

      t.timestamps
    end
  end
end
