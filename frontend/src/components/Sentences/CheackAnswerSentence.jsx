import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// Colors
import { COLORS } from '../../style_constants.js';

// SignUpSentenceWrapepr
const CheackAnswerSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
  color: ${COLORS.LIGHT_BLUE};
`;

export const CheackAnswerSentence = ({
  setGameState
}) => {

  const handleAnswer = () => {
    setGameState((prev) => ({
      ...prev,
      checkAnswer: true
    }));
  };

  return (
    <>
      <CheackAnswerSentenceWrapper>
        <BlueBaseLink to={'#'} onClick={handleAnswer}>
          答えを確認する
        </BlueBaseLink>
      </CheackAnswerSentenceWrapper>
    </>
  );
};
