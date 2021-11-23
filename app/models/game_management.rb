class GameManagement < ApplicationRecord
  belongs_to :user
  has_many :solved_questions, dependent: :destroy
  has_many :questions_per_game, through: :solved_questions, source: :question
  has_many :correct_per_game, -> { where(judgement: :correct) }, class_name: :solved_question
  has_many :correct_questions_per_game, through: :correct_per_game
  has_many :incorrect_per_game, -> { where(judgement: :incorrect) }, class_name: :solved_question
  has_many :incorrect_questions_per_game, through: :incorrect_per_game

  enum difficulty_level: { 初級: 0, 中級: 1, 上級: 2 }
  enum game_result: { Win: 0, Lose: 1 }
  validates :difficulty_level, :game_result, :result_time, :play_date, :user_id, presence: true
  # Userモデルを作るまでは、以下のバリデーションをコメンアウトする。
  # validates :user, presence: true, if: -> { user_id.present? }
end
