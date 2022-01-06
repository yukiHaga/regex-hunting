import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const ExperienceGageWrapper = styled.div`
  width: 160px;
  height: 15px;
  border: 1px solid ${COLORS.GAGE_GRAY};
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
`;

// ExperienceGageのExperienceの幅を取り扱う関数
const handleExperienceGage = ({
  temporary_experience,
  maximum_experience_per_rank
}) => {
  if(temporary_experience >= maximum_experience_per_rank) {
    return `${160 * (temporary_experience / maximum_experience_per_rank)}px`;
  } else {
    return `${160 * (temporary_experience / maximum_experience_per_rank)}px`;
  }
};

const InnerExperienceGageWrapper = styled.div`
  width: ${(props) => handleExperienceGage(props)};
  transition: 0.5s;
  height: 15px;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const ExperienceGage = ({
  rank,
  total_experience,
  maximum_experience_per_rank, 
  temporary_experience,
  prev_temporary_experience
}) => {

  return (
    <>
      <ExperienceGageWrapper>
        <InnerExperienceGageWrapper 
          temporary_experience={temporary_experience}
          maximum_experience_per_rank={maximum_experience_per_rank}
        />
      </ExperienceGageWrapper>
    </>
  );
};
