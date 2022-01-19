import React, { memo } from 'react';
import styled from 'styled-components';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style.js';

// Colors
import { COLORS } from '../../style_constants.js';

// 鍵のアイコン
import LockIcon from '@mui/icons-material/Lock';

const InnerTitleCardWrapper = styled.div`
  width: 36%;
  height: 69px;
  border-radius: 3px;
  background-color: #d6e685;
  margin: 20px;
  margin-left: 0;
  margin-right: 0;
  position: relative;
`;

const MaskTitleCardWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0,0,0,0.3);
`;

const LockWrapper = styled.div`
  font-size: 40px;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  return (
    <>
      <InnerTitleCardWrapper>
        {
          !release_date &&
            <>
              <MaskTitleCardWrapper />
              <LockWrapper>
                <LockIcon
                  fontSize='inherit' 
                  sx={{ color: `${COLORS.BLACK}` }}
                />
              </LockWrapper>
            </>
        }
        <TitleCardSentenceWrapper>
          {name}
        </TitleCardSentenceWrapper>
      </InnerTitleCardWrapper>
    </>
  );
});
