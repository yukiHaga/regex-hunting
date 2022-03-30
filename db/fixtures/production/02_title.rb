# 解放条件
release_condition = %w[
  ユーザー登録に成功
  レベルが2に到達
  レベルが4に到達
  レベルが6に到達
  レベルが8に到達
  レベルが10に到達
  レベルが12に到達
  レベルが14に到達
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
