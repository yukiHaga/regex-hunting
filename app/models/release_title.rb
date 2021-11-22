class ReleaseTitle < ApplicationRecord
  belongs_to :user
  belongs_to :title
end
