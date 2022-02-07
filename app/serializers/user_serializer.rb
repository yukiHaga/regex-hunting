class UserSerializer < ActiveModel::Serializer

  # ゲームの時はこの情報が返される
  attributes :rank,
             :total_experience,
             :maximum_experience_per_rank,
             :temporary_experience,
             :active_title

  attribute :id, if: -> { instance_options[:type] == :profile }
  attribute :name, if: -> { instance_options[:type] == :profile }
  attribute :open_rank, if: -> { instance_options[:type] == :profile }
  attribute :email, if: -> { instance_options[:type] == :profile }

end
