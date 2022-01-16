import React, { useMemo } from 'react';
import styled from 'styled-components';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style.js';

const InnerChangeGraphBoxWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const ChangeGraphBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  text-align: left;
`;

export const ChangeGraphBox = ({
  game_frequencies_per_day
}) => {

  return (
    <>
      <InnerChangeGraphBoxWrapper>
        <ChangeGraphBoxSentenceWrapper>
          学習カレンダー
        </ChangeGraphBoxSentenceWrapper>
      </InnerChangeGraphBoxWrapper>
    </>
  );
};
