class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.text :sentence
      t.string :target_sentence
      t.string :sample_answer
      t.text :commentary
      t.integer :difficulty_level

      t.timestamps
    end
  end
end
