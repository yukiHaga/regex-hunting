class Question < ApplicationRecord
  has_many :solved_questions, dependent: :destroy
  has_many :solved_by_games, through: :solved_questions, source: :game_management

  enum difficulty_level: { 初級: 0, 中級: 1, 上級: 2 }
  validates :sentence, :target_sentence, :sample_answer, :commentary, :difficulty_level, presence: true
end
