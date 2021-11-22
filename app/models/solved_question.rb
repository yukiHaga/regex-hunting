class SolvedQuestion < ApplicationRecord
  belongs_to :game_management
  belongs_to :question
end
