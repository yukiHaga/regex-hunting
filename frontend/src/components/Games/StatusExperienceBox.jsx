import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

const ExperienceBoxWrapper = styled.div`
`;

const ExperienceTextWrapper = styled(DescriptionWrapper)`
 font-size: 16px;
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
  temporary_experience,
  maximum_experience_per_rank
) => {
  if(temporary_experience >= maximum_experience_per_rank) {
    return '100%';
  } else {
    return `${(temporary_experience / maximum_experience_per_rank) * 100}%`;
  }
};

const InnerExperienceGageWrapper = styled.div`
  width: ${({
    temporary_experience,
    maximum_experience_per_rank
  }) => handleExperienceGage(temporary_experience, maximum_experience_per_rank)};
  height: 10px;
  background-color: ${COLORS.EXPERIENCE};
  border-radius: 10px;
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

export const StatusExperienceBox = ({
  total_experience,
  maximum_experience_per_rank, 
  temporary_experience,
}) => {

  return (
    <>
      <ExperienceBoxWrapper>
        <ExperienceTextWrapper>
          現在の経験値： { total_experience }
        </ExperienceTextWrapper>
        <ExperienceGageWrapper>
          {
            (temporary_experience / maximum_experience_per_rank) !== 0 &&
              <InnerExperienceGageWrapper 
                temporary_experience={temporary_experience}
                maximum_experience_per_rank={maximum_experience_per_rank}
              />
          }
        </ExperienceGageWrapper>
        <ExperienceTextWrapper>
          ランクアップに必要な経験値： { 
            temporary_experience >= maximum_experience_per_rank ?
              0
            :
              maximum_experience_per_rank - temporary_experience 
          }
        </ExperienceTextWrapper>
      </ExperienceBoxWrapper>
    </>
  );
};
