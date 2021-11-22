class CreateGameManagements < ActiveRecord::Migration[6.0]
  def change
    create_table :game_managements do |t|
      t.integer :difficulty_level
      t.integer :game_result
      t.datetime :result_time
      t.date :play_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
