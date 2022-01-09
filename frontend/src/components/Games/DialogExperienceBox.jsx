import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

// Sounds
import GageUpSounds from '../../sounds/gage_up.mp3';
import rankUpSounds from '../../sounds/game_clear.mp3';

const ExperienceBoxWrapper = styled.div`
`;

const ExperienceTextWrapper = styled(DescriptionWrapper)`
 font-size: 16px;
`;

const ExperienceGageWrapper = styled.div`
  width: 253px;
  height: 10px;
  border: 1px solid ${COLORS.GAGE_GRAY};
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
`;

// ExperienceGageのExperienceの幅を取り扱う関数
const handleExperienceGage = (
  temporary_experience,
  maximum_experience_per_rank
) => {
  if(temporary_experience >= maximum_experience_per_rank) {
    return `${260 * (maximum_experience_per_rank / maximum_experience_per_rank)}px`;
  } else {
    return `${260 * (temporary_experience / maximum_experience_per_rank)}px`;
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
  border-radius: 3px;
  background-color: ${COLORS.EXPERIENCE};
`;

export const DialogExperienceBox = ({
  rank,
  total_experience,
  maximum_experience_per_rank, 
  temporary_experience,
  prev_temporary_experience,
  dialog_gage_up,
  setGameState
}) => {

  const initialState = {
    temporary_experience: 
      dialog_gage_up ? prev_temporary_experience : temporary_experience
  };

  const [ 
    temporaryExperienceState, 
    setTemporaryExperienceState 
  ] = useState(initialState);

  // 最初にマウントされる際に実行されるuseEffect
  useEffect(() => {
    if(dialog_gage_up) {
      const timer = setTimeout(() => {
        const audio = new Audio(GageUpSounds);
        audio.play();
        setTemporaryExperienceState((prev) => ({
          ...prev,
          temporary_experience: temporary_experience,
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  },[
    temporary_experience,
    dialog_gage_up
  ]);

  // ランクアップの際に実行されるuseEffect
  // temporary_experienceは意味的に本来0でないといけないが、
  // ゲージが上がるようなアクションを見せたいので、差分値を設定する
  useEffect(() => {
    if(temporary_experience >= maximum_experience_per_rank) {
      const timer = setTimeout(() => {
        const rankUpAudio = new Audio(rankUpSounds);
        rankUpAudio.play();
        setGameState((prev) => ({
          ...prev,
          rank: prev.rank + 1,
          prev_temporary_experience: 0,
          temporary_experience: temporary_experience - maximum_experience_per_rank,
          maximum_experience_per_rank: maximum_experience_per_rank + 100,
        }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  },[
    temporary_experience,
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
          <InnerExperienceGageWrapper 
            temporary_experience={temporaryExperienceState.temporary_experience}
            maximum_experience_per_rank={maximum_experience_per_rank}
            dialog_gage_up={dialog_gage_up}
          />
        </ExperienceGageWrapper>
        <ExperienceTextWrapper>
          ランクアップに必要な経験値： { 
            maximum_experience_per_rank - temporaryExperienceState.temporary_experience 
          }
        </ExperienceTextWrapper>
      </ExperienceBoxWrapper>
    </>
  );
};
