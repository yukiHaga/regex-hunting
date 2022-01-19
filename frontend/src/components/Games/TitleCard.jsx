import React, { memo } from 'react';
import styled from 'styled-components';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style.js';

const InnerTitleCardWrapper = styled.div`
  width: 36%;
  height: 69px;
  border-radius: 3px;
  background-color: #d6e685;
  margin: 20px;
  margin-left: 0;
  margin-right: 0;
`;

const TitleCardSentenceWrapper = styled(DescriptionWrapper)`
  font-style: normal;
  font-size: 24px;
  height: 69px;
  text-align: center;
  line-height: 69px;
`;

export const TitleCard = memo(({
  name,
  release_date
}) => {

  console.log(name);
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
