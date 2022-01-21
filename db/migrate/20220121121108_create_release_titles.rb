class CreateReleaseTitles < ActiveRecord::Migration[6.0]
  def change
    create_table :release_titles do |t|
      t.date :release_date, null: false
      t.references :user, null: false, foreign_key: true
      t.references :title, null: false, foreign_key: true

      t.timestamps
    end
  end
end
