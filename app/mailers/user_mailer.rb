class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  # userパラメータをreset_password_emailに追加した
  # なぜなら、sorceryがこのreset_password_emailにuserを送ってくるからである
  def reset_password_email(user)
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
