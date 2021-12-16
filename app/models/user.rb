class User < ApplicationRecord
  authenticates_with_sorcery!
  class << self; undef :open; end

  has_many :game_managements, dependent: :destroy
  has_many :release_titles, dependent: :destroy
  accepts_nested_attributes_for :authentications

  enum open_rank: { open: 0, close: 1 }
  enum active_title: {
                       見習いハンター: 0,
                       一人前ハンター: 1,
                       先輩ハンター: 2,
                       玄人ハンター: 3,
                       熟練ハンター: 4,
                       いにしえのハンター: 5,
                       天才と呼ばれしハンター: 6,
                       伝説のハンター: 7,
                       無我の境地: 8,
                       語り継がれし英雄: 9,
                     }
  validates :name, presence: true, length: { maximum: 10 }

  REGEX_PATTERN = /\A[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}\z/
  validates :email, presence: true, format: { with: REGEX_PATTERN }
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
end
