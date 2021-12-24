class Monster < ApplicationRecord
  validates :name, :max_hp, :attack, :defence, presence: true
  enum difficulty: { elementary: 0, intermediate: 1, advanced: 2 }
end
