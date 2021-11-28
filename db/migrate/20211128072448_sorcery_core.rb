class SorceryCore < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.integer :rank, null: false, default: 1
      t.integer :total_experience, null: false, default: 0
      t.integer :maximum_experience_per_rank, null: false, default: 500
      t.integer :temporary_experience, null: false, default: 0
      t.integer :public_rank, null: false, default: 0
      t.integer :active_title, null: false, default: 0

      # sorcery
      t.string :email,            null: false, index: { unique: true }
      t.string :crypted_password
      t.string :salt

      t.timestamps                null: false
    end
  end
end
