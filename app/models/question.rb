class Question < ApplicationRecord
  has_many :solved_questions, dependent: :destroy
  has_many :solved_by_games, through: :solved_questions, source: :game_management

  enum difficulty: { elementary: 0, intermediate: 1, advanced: 2 }
  validates :sentence, :target_sentence, :sample_answer, :commentary, :hint, :difficulty, presence: true
end
