import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

// Sounds
import GageUpSounds from '../../sounds/gage_up.mp3';

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
      }, 2000);
      return () => clearTimeout(timer);
    }
  },[
    temporary_experience,
    dialog_gage_up
  ]);

  // ランクアップの際に実行されるuseEffect
  // ゲージが上がるようなアクションを見せたかったが、temporary_experienceが
  // サーバー側と整合性が取れなそうなので、ランクが上がったら、
  // ゲージが0になるような仕様にする。
  // 見た目はどうでも良く、サーバー側にちゃんとデータが入っていれば良い
  // 多分必要ないから消す
  /*
  useEffect(() => {
    if(temporary_experience >= maximum_experience_per_rank) {
      const timer = setTimeout(() => {
        const rankUpAudio = new Audio(rankUpSounds);
        rankUpAudio.play();
        setGameState((prev) => ({
          ...prev,
          rank: prev.rank + 1,
          prev_temporary_experience: 0,
          temporary_experience: 0,
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
  */

  console.log(maximum_experience_per_rank);
  console.log(temporaryExperienceState.temporary_experience);

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
