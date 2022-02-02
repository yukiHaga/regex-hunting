import styled from 'styled-components';
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
