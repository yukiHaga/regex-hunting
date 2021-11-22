class CreateMonsters < ActiveRecord::Migration[6.0]
  def change
    create_table :monsters do |t|
      t.string :name
      t.integer :max_hp
      t.integer :attack
      t.integer :defence

      t.timestamps
    end
  end
end
