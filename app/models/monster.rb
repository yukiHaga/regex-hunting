class Monster < ApplicationRecord
  validates :name, :max_hp, :attack, :defence, presence: true
end
