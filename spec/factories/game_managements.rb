FactoryBot.define do
  factory :game_management do
    trait :elementary do
      difficulty { 'elementary' }
      game_result { 'win' }
      result_time { '120000' }
      play_date { Faker::Date.between(from: '2021-12-01', to: '2021-12-10') }
      user
    end
    trait :intermediate do
      difficulty { 'intermediate' }
      game_result { 'win' }
      result_time { '120000' }
      play_date { Faker::Date.between(from: '2021-12-01', to: '2021-12-10') }
      user
    end
    trait :advanced do
      difficulty { 'advanced' }
      game_result { 'win' }
      result_time { '120000' }
      play_date { Faker::Date.between(from: '2021-12-01', to: '2021-12-10') }
      user
    end
  end
end
