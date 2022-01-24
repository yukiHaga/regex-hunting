class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  # userパラメータをreset_password_emailに追加した
  # なぜなら、sorceryがこのreset_password_emailにuserを送ってくるからである
  # maleメソッドによって、メールが作成、送信される
  # mailメソッドでのメール作成時、インスタンス変数を含めることができる
  def reset_password_email(user)
    @user = User.find(user.id)
    @url  = edit_password_reset_url(@user.reset_password_token)
    mail(:to => user.email,
         :subject => "Your password has been reset")
  end
end
