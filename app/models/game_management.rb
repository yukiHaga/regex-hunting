class GameManagement < ApplicationRecord
  belongs_to :user
  has_many :solved_questions, dependent: :destroy
  has_many :questions_per_game, through: :solved_questions, source: :question

  enum difficulty: { elementary: 0, intermediate: 1, advanced: 2 }
  enum game_result: { progress: 0, win: 1, lose: 2 }
  validates :difficulty, :game_result, :result_time, :play_date, :user_id, presence: true
  validates :user, presence: true, if: -> { user_id.present? }

  def add_correct_questions(correct_questions)
    solved_questions << Array.new(correct_questions.length) do |i|
      SolvedQuestion.new(
        judgement: :correct,
        question_id: correct_questions[i][:question][:id]
      )
    end
  end

  def add_incorrect_questions(incorrect_questions)
    solved_questions << Array.new(incorrect_questions.length) do |i|
      SolvedQuestion.new(
        judgement: :incorrect,
        question_id: incorrect_questions[i][:question][:id]
      )
    end
  end
end
