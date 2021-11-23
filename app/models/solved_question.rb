class SolvedQuestion < ApplicationRecord
  belongs_to :game_management
  belongs_to :question
  enum judgement: { correct: 0, incorrect: 1 }
  validates :judgement, :game_management_id, :question_id, presence: true
  validates :game_management, presence: true, if: -> { game_management_id.present? }
  validates :question, presence: true, if: -> { question_id.present? }
end
