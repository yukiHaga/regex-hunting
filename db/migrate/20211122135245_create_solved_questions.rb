class CreateSolvedQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :solved_questions do |t|
      t.integer :judgement
      t.references :game_management, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
