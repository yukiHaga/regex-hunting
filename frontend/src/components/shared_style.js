import styled from 'styled-components';

// constants
import { COLORS } from '../style_constants';

// Link
import { Link } from 'react-router-dom';

// リンクの元となるコンポーネント
export const BaseLink = styled(Link)`
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
  }
  :focus {
    outline: 0;
  }
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
