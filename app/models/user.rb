class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :game_managements, dependent: :destroy
  has_many :release_titles, dependent: :destroy

  enum public_rank: { public: 0, private: 1 }
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
                       語り継がれし英雄: 9
                     }
  validates :name, :email, presence: true

end
