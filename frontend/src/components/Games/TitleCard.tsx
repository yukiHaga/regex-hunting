import React, { memo } from 'react';
import styled from 'styled-components';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style';

// Colors
import { COLORS } from '../../style_constants';

// 背景画像
import ProfessionalBackGround from '../../images/professional_background.jpg';
import AntiquityBackGround from '../../images/antiquity_background.jpg';
import LegendBackground from '../../images/legend_background.jpg';
import GeniusBackground from '../../images/genius_background.jpg';
import ApprenticeBackground from '../../images/apprentice_background.jpg';
import ManhoodBackground from '../../images/manhood_background.jpg';
import SelfEffacementBackground from '../../images/self_effacement_background.jpg';
import HeroBackground from '../../images/hero_background.jpg';

// heigthはpx指定しないとダメ
// heightをvhにしてみる
const InnerTitleCardWrapper = styled.div<{name: string}>`
  width: 17%;
  height: 200px;
  border-radius: 3px;
  background-color: #d6e685;
  margin: 2%;
  margin-top: 3%;
  margin-bottom: 0%;
  position: relative;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  box-shadow: 0 2px 4px rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({name}) => getImage(name) });
  background-size: cover;
`;

const MaskTitleCardWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0,0,0,0.5);
  border-radius: 3px;
`;

const TitleCardSentenceWrapper = styled(DescriptionWrapper)`
  font-style: normal;
  font-size: 1.1em;
  text-align: center;
  color: ${COLORS.WHITE};
`;

const getImage = (name: string): string | null => {
  switch (name) {
    case '見習いハンター':
      return ApprenticeBackground;
    case '一人前ハンター':
      return ManhoodBackground;
    case '玄人ハンター':
      return ProfessionalBackGround;
    case 'いにしえのハンター':
      return AntiquityBackGround;
    case '天才と呼ばれしハンター':
      return GeniusBackground;
    case '伝説のハンター':
      return LegendBackground;
    case '無我の境地':
      return SelfEffacementBackground;
    case '語り継がれし英雄':
      return HeroBackground;
    default:
      return null;
  }
};

type TitleCardArg = {
  name: string;
  releaseDate: string;
  onClick: () => void;
};

export const TitleCard = memo(({
  name,
  releaseDate,
  onClick
}: TitleCardArg): JSX.Element => {

  return (
    <>
      <InnerTitleCardWrapper
        onClick={onClick}
        name={name}
      >
        {
          !releaseDate &&
            <>
              <MaskTitleCardWrapper />
            </>
        }
        <TitleCardSentenceWrapper>
          {name}
        </TitleCardSentenceWrapper>
      </InnerTitleCardWrapper>
    </>
  );
});
