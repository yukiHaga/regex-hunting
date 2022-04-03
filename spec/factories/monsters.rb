FactoryBot.define do
  factory :monster do
    trait :elementary do
      name { 'スクータム' }
      max_hp { 100 }
      attack { 50 }
      defence { 10 }
      difficulty { 'elementary' }
    end
    trait :intermediate do
      name { 'カスアリウス' }
      max_hp { 100 }
      attack { 50 }
      defence { 10 }
      difficulty { 'intermediate' }
    end
    trait :advanced do
      name { 'オルファ・ラパクス' }
      max_hp { 100 }
      attack { 55 }
      defence { 10 }
      difficulty { 'advanced' }
    end
  end
end
