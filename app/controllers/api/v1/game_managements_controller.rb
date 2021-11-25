class Api::V1::GameManagementsController < ApplicationController

  def start
    play_date = Date.today
    result_time = Time.zone.now

    @game_management = current_user.game_managements.create(difficulty_level: params[:difficulty_level],
                                                            game_result: "progress",
                                                            result_time: result_time,
                                                            play_date: play_date
                                                           )

  end

  def finish
  end
end
