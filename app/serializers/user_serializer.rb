class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :rank,
             :total_experience,
             :maximum_experience_per_rank,
             :temporary_experience,
             :open_rank,
             :active_title,
             :email
end
