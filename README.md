## Regex Hunting

## サービス概要
「正規表現を勉強したいけど難しそう。。」と感じている方に、"正規表現が学ベるゲーム"を提供するゲーム型学習サービスです。

## メインのターゲットユーザー
- 正規表現を勉強したいけど、理解するのが難しそうと感じてる人
- 正規表現を一度勉強したけど、使う場面がなくて忘れそうな人

## ユーザーが抱える課題
### 初学者向け教材の少なさ 
初学者向け教材が少ないです。そのため、学習する場合は難しい本やサイトを読まなければならず、学習ハードルが高いです。

### 使う頻度が低い 
正規表現を一度勉強しても、使う場面がなければ忘れてしまいます。

## 解決方法
"正規表現を用いてモンスターを討伐するゲーム"を提供します。このゲームによって、正規表現の学習ハードルを下げます。
また、正規表現を一度勉強したけど忘れそうな方に、"ゲームをする"という能動的な学習環境を提供することで、効率的に正規表現を復習できます。

## 実装予定の機能
- ユーザー
  - 初級, 中級, 上級のゲームができる。

- ゲーム機能
  - 正規表現を自分で入力できる。
  - 1問ごとに制限時間が設定されており、制限時間内では正解するまで、何度も正規表現を入力できる。
  - 制限時間内で正答できない場合、不正解と認識する。
  - 制限時間内に問題を満たす正規表現を入力すると、モンスターに攻撃できる。
  - 制限時間内で問題を満たす正規表現を入力できない場合、モンスターから攻撃を受ける。
  - モンスターのHPが0になったタイミングでゲームクリアとする。
  - プレイヤーのHPが0になったタイミングでゲームオーバーとする。

- ツイート機能
  - クリアした結果をツイートできる。

- 管理ユーザー
  - ゲームの問題をCRUD処理で管理できる。

## 画面遷移図
https://www.figma.com/file/VNjsqixD6sQPJy7ljlJiV0/portfolio?node-id=0%3A://www.figma.com/file/VNjsqixD6sQPJy7ljlJiV0/portfolio?node-id=0%3A1

## なぜこのサービスを作りたいのか？
正規表現を勉強した際に、"いくつかの文字列を一つの形式で表現できる"ことにとても感動しました。そのため、この感動を他の人にも体験してほしいと感じました。しかし、初学者向けに正規表現を解説している本は少ないです。自分が経験した感動を他の人にも体験してほしいので、今回のような学習ハードルを解消するサービスを作ろうと決めました。
