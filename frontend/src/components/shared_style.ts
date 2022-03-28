import styled, { keyframes } from 'styled-components';
//import Button from '@mui/material/Button';

// constants
import { COLORS } from '../style_constants';

// Link
import { Link } from 'react-router-dom';

// 基本的なリンクとなるコンポーネント
export const BaseLink = styled(Link)`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  text-decoration: none;
`;

// ブルーのリンク
export const BlueBaseLink = styled(BaseLink)`
  color: ${COLORS.BLUE};
`;

// モーダルへのリンクとなるコンポーネント
export const FakeLink = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  text-decoration: none;
`;

// ボタンの元となるコンポーネント
export const BaseButton = styled.button`
  cursor: pointer;
  :hover {
    opacity: 0.7;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
  :focus {
    outline: 0;
  }
`;

// 別サイトへのリンクボタンとなるコンポーネント
export const AnchorBaseButton = styled.a`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
`;

export const AnchorRoundButton = styled(AnchorBaseButton)`
  border-radius: 3px;
`;

// 角丸なボタン
export const RoundButton = styled(BaseButton)`
  border-radius: 3px;
`;

// 角丸な赤色ボタン
export const RedRoundButton = styled(BaseButton)`
  border-radius: 3px;
  background-color: ${COLORS.RED};
`;

// 角丸な青色ボタン
export const BlueRoundButton = styled(BaseButton)`
  border-radius: 3px;
  background-color: ${COLORS.BLUE};
`;

// 角丸な緑色ボタン
export const GreenRoundButton = styled(BaseButton)`
  border-radius: 3px;
  background-color: ${COLORS.MAIN};
`;

// テキストのラッパー
export const DescriptionWrapper = styled.div`
  color: ${COLORS.BLACK};
  font-style: normal;
  letter-spacing: 0.05em;
`;

// モンスター関連のアニメーション
//
// 攻撃されたときのアニメーション
export const MonsterFlash = keyframes`
  20%{
    opacity: 0;
  }
  40%{
    opacity: 1;
  }
  60%{
    opacity: 0;
  }
  80%{
    opacity: 1;
  }
`;

// 初登場のアニメーション
export const FadeInAnime = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// 倒されたときのアニメーション
export const FadeOutAnime = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

// スライド関連のアニメーション
//
// transform: translateXは、x方向に動かすって意味
// x方向の位置をどんどん原点に近づけることで、右から左に動いているように見える
export const LeftSlideOutAnime = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%);
  }
`;

export const LeftSlideInAnime = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const RightSlideOutAnime = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(50%);
  }
`;

export const RightSlideInAnime = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// コードブロック関係のスタイル
//
// 特殊文字一覧のコードブロックだけ、margin-topが0.8%
export const CodeBlockWrapper = styled.div`
  border-radius: 3px;
  width: 100%;
  margin: 0 auto;
  margin-top: 3%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
`;

export const CodeBlockDiv = styled.div`
  width: 100%;
  border-radius: 3px;
  font-size: 1.1em;
  background-color: ${COLORS.CODE_BLACK};
  color: ${COLORS.WHITE};
  outline: none;
  border: none;
  padding-top: 2%;
  padding-bottom: 2%;
  margin: 0 auto;
  text-align: center;
`;

export const CodeLineWrapper = styled.div`
  text-align: left;
  width: 85%;
  margin: 0 auto;
`;

export const BlankLineWrapper = styled(CodeLineWrapper)`
  height: 2vh;
`;

export const ComentLineWrapper = styled(CodeLineWrapper)`
  color: ${COLORS.WHITE};
  opacity: 0.7;
`;

export const CodeRedSpan = styled.span`
  color: ${COLORS.CODE_RED};
`;

export const CodeYellowSpan = styled.span`
  color: ${COLORS.CODE_YELLOW};
`;

export const CodeBlueSpan = styled.span`
  color: ${COLORS.CODE_BLUE};
`;

export const CodeComentSpan = styled.span`
  color: ${COLORS.WHITE};
  opacity: 0.7;
`;

// 説明スライドのワーニングセンテンス
//
export const WarningSentenceWrapper = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 1.1em;
  text-align: center;
  margin-top: 5%;
  color: ${COLORS.RED};
`;

