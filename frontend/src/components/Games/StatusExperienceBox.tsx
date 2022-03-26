import React, { memo } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style.js';

import { WIDTH } from '../../style_constants.js';

const ExperienceBoxWrapper = styled.div`
`;

const ExperienceTextWrapper = styled(DescriptionWrapper)`
  font-size: 0.9em;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 0.85em;
  }
`;

const ExperienceGageWrapper = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 10px;
  border: 1px solid #000;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
`;

// ExperienceGageのExperienceの幅を取り扱う関数
const handleExperienceGage = (
  temporaryExperience: number,
  maximumExperiencePerRank: number
): string => {
  if(temporaryExperience >= maximumExperiencePerRank) {
    return '100%';
  } else {
    return `${(temporaryExperience / maximumExperiencePerRank) * 100}%`;
  }
};

const InnerExperienceGageWrapper = styled.div<{temporaryExperience: number, maximumExperiencePerRank: number}>`
  width: ${({
    temporaryExperience,
    maximumExperiencePerRank
  }) => handleExperienceGage(temporaryExperience, maximumExperiencePerRank)};
  height: 10px;
  background-color: ${COLORS.EXPERIENCE};
  border-radius: 10px;
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

// StatusExperienceBoxの引数の型
type StatusExperienceBoxArg = {
  totalExperience: number;
  maximumExperiencePerRank: number;
  temporaryExperience: number;
};

export const StatusExperienceBox = memo(({
  totalExperience,
  maximumExperiencePerRank,
  temporaryExperience,
}: StatusExperienceBoxArg): JSX.Element => {

  return (
    <>
      <ExperienceBoxWrapper>
        <ExperienceTextWrapper>
          現在の経験値： { totalExperience }
        </ExperienceTextWrapper>
        <ExperienceGageWrapper>
          {
            (temporaryExperience / maximumExperiencePerRank) !== 0 &&
              <InnerExperienceGageWrapper
                temporaryExperience={temporaryExperience}
                maximumExperiencePerRank={maximumExperiencePerRank}
              />
          }
        </ExperienceGageWrapper>
        <ExperienceTextWrapper>
          ランクアップに必要な経験値： {
            temporaryExperience >= maximumExperiencePerRank ?
              0
            :
              maximumExperiencePerRank - temporaryExperience
          }
        </ExperienceTextWrapper>
      </ExperienceBoxWrapper>
    </>
  );
});
