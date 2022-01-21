class Title < ApplicationRecord
  has_many :release_titles, dependent: :destroy
  has_many :user, through: :release_titles
  validates :name, :release_condition, presence: true
end
