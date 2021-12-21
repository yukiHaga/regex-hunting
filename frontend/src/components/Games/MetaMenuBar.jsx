import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const MetaMenuBarWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 3px;
  height: 490px;
  width: 220px;
  outline: 8px solid ${COLORS.GRAY};
  display: inline-block;
`;

const TitleWrapper = styled.div`

`;

const MetaContentWrapper = styled.div`

`;

export const MetaMenuBar = () => {
  return (
    <>
      <MetaMenuBarWrapper>
        <TitleWrapper>
          メタ文字一覧
        </TitleWrapper>
        <MetaContentWrapper>
        </MetaContentWrapper>
      </MetaMenuBarWrapper>
    </>
  );
};
