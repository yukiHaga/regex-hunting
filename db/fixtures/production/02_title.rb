# 解放条件
release_condition = %w[
  ユーザー登録に成功
  ランクが2に到達
  ランクが4に到達
  ランクが6に到達
  ランクが8に到達
  ランクが10に到達
  ランクが12に到達
  ランクが14に到達
]

# タイトル
8.times do |s|
  Title.seed(
    {
      id: s + 1,
      name: User.active_titles.keys[s],
      release_condition: release_condition[s]
    }
  )
end
