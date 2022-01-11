class GameManagement < ApplicationRecord
  belongs_to :user
  has_many :solved_questions, dependent: :destroy
  has_many :questions_per_game, through: :solved_questions, source: :question
  has_many :correct_per_game, -> { where(judgement: :correct) }, class_name: :SolvedQuestion
  has_many :incorrect_per_game, -> { where(judgement: :incorrect) }, class_name: :SolvedQuestion

  enum difficulty: { elementary: 0, intermediate: 1, advanced: 2 }
  enum game_result: { progress: 0, win: 1, lose: 2 }
  validates :difficulty, :game_result, :result_time, :play_date, :user_id, presence: true
  validates :user, presence: true, if: -> { user_id.present? }
end
