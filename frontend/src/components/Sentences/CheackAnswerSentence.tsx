import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants';

// setGameStateの型
import { SetGameState } from '../../types/containers/games';

// SignUpSentenceWrapepr
const CheackAnswerSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
  color: ${COLORS.LIGHT_BLUE};
`;

type CheackAnswerSentenceArg = {
  setGameState: SetGameState;
};

export const CheackAnswerSentence = ({
  setGameState
}: CheackAnswerSentenceArg): JSX.Element => {

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
