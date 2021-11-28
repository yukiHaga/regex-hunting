# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_22_142141) do

  create_table "game_managements", force: :cascade do |t|
    t.integer "difficulty_level", default: 0, null: false
    t.integer "game_result", default: 0, null: false
    t.datetime "result_time", null: false
    t.date "play_date", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_game_managements_on_user_id"
  end

  create_table "monsters", force: :cascade do |t|
    t.string "name", null: false
    t.integer "max_hp", null: false
    t.integer "attack", null: false
    t.integer "defence", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "questions", force: :cascade do |t|
    t.text "sentence", null: false
    t.string "target_sentence", null: false
    t.string "sample_answer", null: false
    t.text "commentary", null: false
    t.integer "difficulty_level", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "release_titles", force: :cascade do |t|
    t.date "release_date", null: false
    t.integer "user_id", null: false
    t.integer "title_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["title_id"], name: "index_release_titles_on_title_id"
    t.index ["user_id"], name: "index_release_titles_on_user_id"
  end

  create_table "solved_questions", force: :cascade do |t|
    t.integer "judgement", default: 0, null: false
    t.integer "game_management_id", null: false
    t.integer "question_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_management_id"], name: "index_solved_questions_on_game_management_id"
    t.index ["question_id"], name: "index_solved_questions_on_question_id"
  end

  create_table "titles", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "game_managements", "users"
  add_foreign_key "release_titles", "titles"
  add_foreign_key "release_titles", "users"
  add_foreign_key "solved_questions", "game_managements"
  add_foreign_key "solved_questions", "questions"
end
