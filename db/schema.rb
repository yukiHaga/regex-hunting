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

ActiveRecord::Schema.define(version: 20_220_124_120_114) do
  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.integer 'record_id', null: false
    t.integer 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness',
                                                    unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.bigint 'byte_size', null: false
    t.string 'checksum', null: false
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'authentications', force: :cascade do |t|
    t.integer 'user_id', null: false
    t.string 'provider', null: false
    t.string 'uid', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[provider uid], name: 'index_authentications_on_provider_and_uid'
  end

  create_table 'game_managements', force: :cascade do |t|
    t.integer 'difficulty', default: 0, null: false
    t.integer 'game_result', default: 0, null: false
    t.float 'result_time', default: 0.0, null: false
    t.date 'play_date', null: false
    t.integer 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['user_id'], name: 'index_game_managements_on_user_id'
  end

  create_table 'monsters', force: :cascade do |t|
    t.string 'name', null: false
    t.integer 'max_hp', null: false
    t.integer 'attack', null: false
    t.integer 'defence', null: false
    t.integer 'difficulty', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'questions', force: :cascade do |t|
    t.text 'sentence', null: false
    t.string 'target_sentence', null: false
    t.string 'sample_answer', null: false
    t.text 'hint', null: false
    t.text 'commentary', null: false
    t.integer 'difficulty', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'release_titles', force: :cascade do |t|
    t.date 'release_date', null: false
    t.integer 'user_id', null: false
    t.integer 'title_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['title_id'], name: 'index_release_titles_on_title_id'
    t.index ['user_id'], name: 'index_release_titles_on_user_id'
  end

  create_table 'solved_questions', force: :cascade do |t|
    t.integer 'judgement', default: 0, null: false
    t.integer 'game_management_id', null: false
    t.integer 'question_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['game_management_id'], name: 'index_solved_questions_on_game_management_id'
    t.index ['question_id'], name: 'index_solved_questions_on_question_id'
  end

  create_table 'titles', force: :cascade do |t|
    t.string 'name', null: false
    t.text 'release_condition', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'users', force: :cascade do |t|
    t.string 'name', null: false
    t.integer 'rank', default: 1, null: false
    t.integer 'total_experience', default: 0, null: false
    t.integer 'maximum_experience_per_rank', default: 500, null: false
    t.integer 'temporary_experience', default: 0, null: false
    t.boolean 'open_rank', default: true, null: false
    t.integer 'active_title', default: 0, null: false
    t.string 'email', null: false
    t.string 'crypted_password'
    t.string 'salt'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_token_expires_at'
    t.datetime 'reset_password_email_sent_at'
    t.integer 'access_count_to_reset_password_page', default: 0
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token'
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'game_managements', 'users'
  add_foreign_key 'release_titles', 'titles'
  add_foreign_key 'release_titles', 'users'
  add_foreign_key 'solved_questions', 'game_managements'
  add_foreign_key 'solved_questions', 'questions'
end
