class CreateGameManagements < ActiveRecord::Migration[6.0]
  def change
    create_table :game_managements do |t|
      t.integer :difficulty_level, null: false, default: 0
      t.integer :game_result, null: false, default: 0
      t.time :result_time, null: false, default: 0
      t.date :play_date, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
