import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js'; 

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton.jsx';

const CustomDialogInnerWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  width: 450px;
  height: 250px;
`;

const CustomDialogTitleWrapper = styled.div`
  height: 74px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 74px;
  color: ${COLORS.MAIN};
  padding-top: 30px;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

const CustomDialogContentSentence = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-family: YuGothic;
  font-style: normal;
  font-size: 20px;
`;

const CustomDialogContentReleaseSentence = styled(CustomDialogContentSentence)`
  color: ${COLORS.RED};
`;

// backボタンのラッパー 
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  background-color: ${COLORS.SUB};
  width: 450px;
  z-index: 2;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

// gameStateのrank_upがtrueの時に開くモーダル
// サーバーに送ったゲームデータの戻り値のrank_upがtrueの場合、開く
// このコンポーネントに渡るpropsは、サーバーに送ったゲームデータの戻り値のデータ
// このrankはランクアップ後のランク値が格納されている
export const ReleaseConditionDialog = ({
  isOpen,
  onClose,
  release_date,
  release_condition
}) => {

  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
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
            {release_condition}
          </CustomDialogContentSentence>
        </CustomDialogContent>
        {
          release_date && 
            <CustomDialogContent>
              <CustomDialogContentReleaseSentence>
                {`${release_date.replace(/-/g, '/')}に解放`}
              </CustomDialogContentReleaseSentence>
            </CustomDialogContent>
        }
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
