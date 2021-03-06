import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style';

// Sounds
import GageUpSounds from '../../sounds/gage_up_60.mp3';

const ExperienceBoxWrapper = styled.div`
`;

const ExperienceTextWrapper = styled(DescriptionWrapper)`
 font-size: 0.9em;
 padding-top: 1%;
 padding-bottom: 1%;
`;

// ここのheightのpx指定を崩すとレイアウトが崩れた為、やめた
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

const InnerExperienceGageWrapper = styled.div<{dialogGageUp: boolean, temporaryExperience: number, maximumExperiencePerRank: number}>`
  width: ${({
    temporaryExperience,
    maximumExperiencePerRank
  }) => handleExperienceGage(temporaryExperience, maximumExperiencePerRank)};
  transition: ${({ dialogGageUp }) => '2s' };
  transition-timing-function: ${({ dialogGageUp }) => 'linear' };
  height: 10px;
  background-color: ${COLORS.EXPERIENCE};
  border-radius: 10px;
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

//  DialogExperienceBoxの引数の型
type DialogExperienceBoxArg = {
  rank: number;
  totalExperience: number;
  maximumExperiencePerRank: number;
  temporaryExperience: number;
  prevTemporaryExperience: number;
  dialogGageUp: boolean;
};

export const DialogExperienceBox = ({
  rank,
  totalExperience,
  maximumExperiencePerRank,
  temporaryExperience,
  prevTemporaryExperience,
  dialogGageUp,
}: DialogExperienceBoxArg): JSX.Element => {

  const initialState = {
    temporaryExperience:
      dialogGageUp ? prevTemporaryExperience : temporaryExperience
  };

  const [
    temporaryExperienceState,
    setTemporaryExperienceState
  ] = useState(initialState);

  // 最初にマウントされた後に実行されるuseEffect
  useEffect(() => {
    if(dialogGageUp) {
      const timer = setTimeout(() => {
        const audio = new Audio(GageUpSounds);
        audio.play();
        setTemporaryExperienceState((prev) => ({
          ...prev,
          temporaryExperience: temporaryExperience,
        }));
      }, 4900);
      return () => clearTimeout(timer);
    }
  },[
    temporaryExperience,
    dialogGageUp,
    maximumExperiencePerRank,
  ]);

  // 本当はprevTotalExperience的なのを作ればいいのだが、
  // 1つの変更に対する影響範囲が大きい為、やめた
  return (
    <>
      <ExperienceBoxWrapper>
        <ExperienceTextWrapper>
          現在の経験値： {
            temporaryExperienceState.temporaryExperience === prevTemporaryExperience ?
              totalExperience - (temporaryExperience - prevTemporaryExperience )
            :
              totalExperience
          }
        </ExperienceTextWrapper>
        <ExperienceGageWrapper>
          {
            (temporaryExperience / maximumExperiencePerRank) !== 0 &&
              <InnerExperienceGageWrapper
                temporaryExperience={temporaryExperienceState.temporaryExperience}
                maximumExperiencePerRank={maximumExperiencePerRank}
                dialogGageUp={dialogGageUp}
              />
          }
        </ExperienceGageWrapper>
        <ExperienceTextWrapper>
          レベルアップに必要な経験値： {
            temporaryExperienceState.temporaryExperience >= maximumExperiencePerRank ?
              0
            :
              maximumExperiencePerRank - temporaryExperienceState.temporaryExperience
          }
        </ExperienceTextWrapper>
      </ExperienceBoxWrapper>
    </>
  );
};
