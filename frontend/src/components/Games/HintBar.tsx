import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const HintBarWrapper = styled.div`
  background-color: ${COLORS.GRAY};
  border-radius: 10px;
  height: 44vh;
  width: 16.5vw;
  display: inline-block;
  position: relative;
  background-image: -webkit-radial-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: radial-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

const InnerHintBarWrapper = styled.div`
  height: 96%;
  width: 94%;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
  background-color: ${COLORS.SUB};
`;

const TitleWrapper = styled.div`
  color: ${COLORS.MAIN};
  text-align: left;
  padding-top: 5%;
  padding-bottom: 3%;
  padding-left: 9%;
  padding-right: 9%;
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 2em;
`;

const OuterMessageWrapper = styled.div`
  padding-left: 9%;
  padding-right: 9%;
  background-color: ${COLORS.SUB};
  text-align: center;
  margin: 0 auto;
`;

// text-align: justifyは、テキストの改行位置が
// ボックスの両端ぴったりに揃うようにしてくれる
// text-justifyは、text-justify: inter-ideographのIE用
const MessageWrapper = styled.div`
  display: inline-block;
  text-align: justify;
  text-justify: inter-ideograph;
  color: ${COLORS.BLACK};
  font-style: normal;
  font-size: 1em;
`;

// ヒントを動的に出力するバー
export const HintBar = ({
  hint
}: {hint: string}): JSX.Element => {
  return (
    <>
      <HintBarWrapper>
        <InnerHintBarWrapper>
          <TitleWrapper>
            Hint
          </TitleWrapper>
          <OuterMessageWrapper>
            <MessageWrapper>
              {hint}
            </MessageWrapper>
          </OuterMessageWrapper>
        </InnerHintBarWrapper>
      </HintBarWrapper>
    </>
  );
};
