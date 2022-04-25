require 'rails_helper'

# ログインユーザーは存在しないとする
RSpec.describe 'GameManagement', type: :request do
  # 初級編の問題
  let!(:elementary_question) { create(:question, :elementary) }

  # 初級編のモンスター
  let!(:elementary_monster) { create(:monster, :elementary) }

  # game_managements#startのテスト
  # ゲーム用ユーザーは用意してないので、値があっているかチェックする
  # リクエストスペックは、ステータスコードとレスポンスボディを返す
  describe 'GET /api/v1/start&difficulty=elementary' do
    it 'game_start_data' do
      get api_v1_start_path(difficulty: :elementary)
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)

      # game_management
      expect(json['game_management']['difficulty']).to eq('elementary')
      expect(json['game_management']['game_result']).to eq('progress')
      expect(json['game_management']['result_time']).to eq(0.0)
      expect(json['game_management']['play_date']).to eq(Time.zone.today.to_s)

      # question
      expect(json['questions'][0]['commentary']).to eq(elementary_question.attributes['commentary'])
      expect(json['questions'][0]['difficulty']).to eq(elementary_question.attributes['difficulty'])
      expect(json['questions'][0]['hint']).to eq(elementary_question.attributes['hint'])
      expect(json['questions'][0]['sample_answer']).to eq(elementary_question.attributes['sample_answer'])
      expect(json['questions'][0]['sentence']).to eq(elementary_question.attributes['sentence'])
      expect(json['questions'][0]['target_sentence']).to eq(elementary_question.attributes['target_sentence'])

      # monster
      expect(json['monster']['name']).to eq(elementary_monster.attributes['name'])
      expect(json['monster']['max_hp']).to eq(elementary_monster.attributes['max_hp'])
      expect(json['monster']['attack']).to eq(elementary_monster.attributes['attack'])
      expect(json['monster']['defence']).to eq(elementary_monster.attributes['defence'])
      expect(json['monster']['difficulty']).to eq(elementary_monster.attributes['difficulty'])

      # ゲームで使用するuser
      expect(json['user']['rank']).to eq(1)
      expect(json['user']['total_experience']).to eq(0)
      expect(json['user']['maximum_experience_per_rank']).to eq(500)
      expect(json['user']['temporary_experience']).to eq(0)
      expect(json['user']['prev_temporary_experience']).to eq(0)
      expect(json['user']['active_title']).to eq('見習いハンター')
    end
  end

  # game_managements#finishのテスト
  # csrf対応されていて、テストできないので、一旦保留とする
end
