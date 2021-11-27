class Api::V1::RankingsController < ApplicationController
  def index
    top_three_ = if current_user
                          else
                            fastest_result_time = GameManagement.minimum(:result_time)
                          end
    render json: @, status: :ok
  end
end
