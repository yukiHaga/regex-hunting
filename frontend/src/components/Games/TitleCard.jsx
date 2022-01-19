import React, { memo } from 'react';
import styled from 'styled-components';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style.js';

const InnerTitleCardWrapper = styled.div`
  width: 40%;
  height: 69px;
  border-radius: 3px;
  background-color: #E4E826;
`;

const TitleCardSentenceWrapper = styled(DescriptionWrapper)`
  font-style: normal;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const TitleCard = memo(({
  name,
  release_date
}) => {

  return (
    <>
      <InnerTitleCardWrapper>
        <TitleCardSentenceWrapper>
          学習カレンダー
        </TitleCardSentenceWrapper>
      </InnerTitleCardWrapper>
    </>
  );
});
