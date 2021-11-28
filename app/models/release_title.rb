class ReleaseTitle < ApplicationRecord
  belongs_to :user
  belongs_to :title
  validates :release_date, :user_id, :title_id, presence: true
  validates :user, presence: true, if: -> { user_id.present? }
  validates :title, presence: true, if: -> { title_id.present? }
end
