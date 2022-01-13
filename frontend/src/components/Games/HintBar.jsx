import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const HintBarWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 10px;
  height: 370px;
  width: 220px;
  border: 8px solid ${COLORS.GRAY};
  display: inline-block;
`;

const TitleWrapper = styled.div`
  height: 60px;
  line-height: 60px;
  color: ${COLORS.MAIN};
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 32px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const OuterMessageWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  background-color: ${COLORS.SUB};
  text-align: center;
  margin: 0 auto;
`;

const MessageWrapper = styled.div`
  display: inline-block;
  text-align: justify;
  text-justify: inter-ideograph;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
`;

// ヒントを動的に出力するバー
export const HintBar = ({
  hint
}) => {
  return (
    <>
      <HintBarWrapper>
        <TitleWrapper>
          Hint
        </TitleWrapper>
        <OuterMessageWrapper>
          <MessageWrapper>
            {hint}
          </MessageWrapper>
        </OuterMessageWrapper>
      </HintBarWrapper>
    </>
  );
};
