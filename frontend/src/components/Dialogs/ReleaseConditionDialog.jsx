import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style.js';

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton';

// 称号を変更するボタン
import { TitleSettingButton } from '../Buttons/TitleSettingButton.jsx';

// 背景画像
import DarkProfessionalBackGround from '../../images/dark_professional_background.png';
import DarkAntiquityBackGround from '../../images/dark_antiquity_background.png';
import DarkLegendBackground from '../../images/dark_legend_background.png';
import DarkGeniusBackground from '../../images/dark_genius_background.png';
import DarkApprenticeBackground from '../../images/dark_apprentice_background.png';
import DarkManhoodBackground from '../../images/dark_manhood_background.png';
import DarkSelfEffacementBackground from '../../images/dark_self_effacement_background.png';
import DarkHeroBackground from '../../images/dark_hero_background.png';

const CustomDialogInnerWrapper = styled.div`
  border-radius: 3px;
  text-align: center;
  background-image: url(${({name}) => getImage(name)});
  background-size: cover;
  background-color: ${COLORS.BLACK};
  position: relative;
`;

const CustomDialogTitleWrapper = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 2.0em;
  color: ${COLORS.WHITE};
  padding-top: 10%;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

const CustomDialogContentSentence = styled(DescriptionWrapper)`
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.WHITE}
`;

const CustomDialogContentReleaseSentenceWrapper = styled.div`
  text-align: center;
  padding-top: 5%;
`;

const CustomDialogContentReleaseSentence = styled(CustomDialogContentSentence)`
  font-size: 1.1em;
  padding-bottom: 8%;
`;

// backボタンのラッパー
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  z-index: 1;
  border-radius: 3px;
  color: ${COLORS.WHITE}
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8%;
  padding-bottom: 7%;
`;

const getImage = (name) => {
  switch (name) {
    case '見習いハンター':
      return DarkApprenticeBackground;
    case '一人前ハンター':
      return DarkManhoodBackground;
    case '玄人ハンター':
      return DarkProfessionalBackGround;
    case 'いにしえのハンター':
      return DarkAntiquityBackGround;
    case '天才と呼ばれしハンター':
      return DarkGeniusBackground;
    case '伝説のハンター':
      return DarkLegendBackground;
    case '無我の境地':
      return DarkSelfEffacementBackground;
    case '語り継がれし英雄':
      return DarkHeroBackground;
    default:
      return null;
  }
};

// gameStateのrank_upがtrueの時に開くモーダル
// サーバーに送ったゲームデータの戻り値のrank_upがtrueの場合、開く
// このコンポーネントに渡るpropsは、サーバーに送ったゲームデータの戻り値のデータ
// このrankはランクアップ後のランク値が格納されている
export const ReleaseConditionDialog = ({
  isOpen,
  onClose,
  name,
  releaseDate,
  releaseCondition,
  setMyPageState
}) => {

  return(
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="xs"
    >
      <CustomDialogInnerWrapper
        releaseDate={releaseDate}
        name={name}
      >
        <BackToModalButtonWrapper>
          <BackToModalButton
            onClick={onClose}
          />
        </BackToModalButtonWrapper>
        <CustomDialogTitleWrapper title="Bad">
          解放条件
        </CustomDialogTitleWrapper>
        <CustomDialogContent>
          <CustomDialogContentSentence>
            {releaseCondition}
          </CustomDialogContentSentence>
        </CustomDialogContent>
        <CustomDialogContentReleaseSentenceWrapper>
          <CustomDialogContentReleaseSentence>
            {
              releaseDate ?
                `解放日: ${releaseDate.replace(/-/g, '/')}`
              :
                '未解放'
            }
          </CustomDialogContentReleaseSentence>
        </CustomDialogContentReleaseSentenceWrapper>
        <ButtonsWrapper>
          <TitleSettingButton
            name={name}
            setMyPageState={setMyPageState}
            disabled={!releaseDate}
          />
        </ButtonsWrapper>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
