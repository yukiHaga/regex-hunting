class Title < ApplicationRecord
  validates :name, presence: true
  has_many :release_titles, dependent: :destroy
  has_many :user, through: :release_titles
end
