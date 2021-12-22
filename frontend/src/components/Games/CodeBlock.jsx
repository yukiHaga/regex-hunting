import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const CodeBlockWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px;
  width: 860px;
  height: 53px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const AnchorWrapper = styled.div`
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.WHITE};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  margin-left: 15px;
  margin-right: 15px;
`;

const CodeBlockTextWrapper = styled.div`
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.WHITE};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
`;

export const CodeBlock = () => {
  return (
    <>
      <CodeBlockWrapper>
        <AnchorWrapper>
          /
        </AnchorWrapper>
        <CodeBlockTextWrapper>
         
        </CodeBlockTextWrapper>
        <AnchorWrapper>
          /g
        </AnchorWrapper>
      </CodeBlockWrapper>
    </>
  );
};
