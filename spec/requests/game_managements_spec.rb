require 'rails_helper'

RSpec.describe "GameManagements", type: :request do
  describe "GET /game_managements" do
    it "works! (now write some real specs)" do
      get game_managements_path
      expect(response).to have_http_status(200)
    end
  end
end
