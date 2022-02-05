import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

// Sounds
import GageUpSounds from '../../sounds/gage_up_25.mp3';

const ExperienceBoxWrapper = styled.div`
`;

const ExperienceTextWrapper = styled(DescriptionWrapper)`
 font-size: 0.9em;
`;

// ここのheightのpx指定を崩すとレイアウトが崩れたので、やめた
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
  transition: ${({ dialog_gage_up }) => '2s' };
  transition-timing-function: ${({ dialog_gage_up }) => 'linear' };
  height: 10px;
  background-color: ${COLORS.EXPERIENCE};
  border-radius: 10px;
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

export const DialogExperienceBox = ({
  rank,
  total_experience,
  maximum_experience_per_rank, 
  temporary_experience,
  prev_temporary_experience,
  dialog_gage_up,
  setGameState,
}) => {

  const initialState = {
    temporary_experience: 
      dialog_gage_up ? prev_temporary_experience : temporary_experience
  };

  const [ 
    temporaryExperienceState, 
    setTemporaryExperienceState 
  ] = useState(initialState);

  // 最初にマウントされた後に実行されるuseEffect
  useEffect(() => {
    if(dialog_gage_up) {
      const timer = setTimeout(() => {
        const audio = new Audio(GageUpSounds);
        audio.play();
        setTemporaryExperienceState((prev) => ({
          ...prev,
          temporary_experience: temporary_experience,
        }));
      }, 4900);
      return () => clearTimeout(timer);
    }
  },[
    temporary_experience,
    dialog_gage_up,
    maximum_experience_per_rank,
    setGameState
  ]);

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
                temporary_experience={temporaryExperienceState.temporary_experience}
                maximum_experience_per_rank={maximum_experience_per_rank}
                dialog_gage_up={dialog_gage_up}
              />
          }
        </ExperienceGageWrapper>
        <ExperienceTextWrapper>
          ランクアップに必要な経験値： { 
            temporaryExperienceState.temporary_experience >= maximum_experience_per_rank ?
              0
            :
              maximum_experience_per_rank - temporaryExperienceState.temporary_experience 
          }
        </ExperienceTextWrapper>
      </ExperienceBoxWrapper>
    </>
  );
};
