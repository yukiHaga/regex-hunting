class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.text :sentence, null: false
      t.string :target_sentence, null: false
      t.string :sample_answer, null: false
      t.text :commentary, null: false
      t.integer :difficulty, null: false, default: 0

      t.timestamps
    end
  end
end
