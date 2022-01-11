import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton.jsx';

const CustomDialogInnerWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  width: 623px;
  height: 100%;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

// backボタンのラッパー 
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  background-color: ${COLORS.SUB};
  width: 600px;
  z-index: 2;
`;

const MetaMenuBarWrapper = styled.div`
  background-color: ${COLORS.MAIN};
  border-radius: 3px;
  height: 80%;
  width: 90%;
  display: inline-block;
  margin-top: 50px;
`;

// white-space: nowrapは、カラム内のテキストを折り返さない為に使う
// overflow-x: autoは横スクロールを可能にする。
// overflow-y: autoは縦スクロールを可能にする。
const MetaContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  white-space: nowrap;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.SUB};
  font-family: YuGothic;
  font-weight: normal;
`;

const CustomTh = styled.th`
  padding: 8px 6px; 
  background-color: ${COLORS.OCHER};
  border-left: solid 1px #c79344;
  border-right: solid 1px #c79344;
`;

const TitleTh = styled(CustomTh)`
  background-color: ${COLORS.MAIN};
  color: ${COLORS.SUB};
  border-top: solid 1px #c79344;
  border-bottom: solid 1px #c79344;
  height: 30px;
  font-size: 21px;
  line-height: 30px;
  font-family: YuGothic;
  font-weight: bold;
  text-align: center;
`;

const MeaningTh = styled(CustomTh)`
  text-align: center;
`;

const CustomTd = styled.td`
  border: solid 1px #c79344;
  padding: 8px 6px; 
`;

const MetaTd = styled(CustomTd)`
  text-align: center;
`;

// click_meta_openがtrueの時に開くモーダル
export const CheckMetaDialog = ({
  isOpen,
  setGameState
}) => {

  return(
    <Dialog
      open={isOpen}
      maxWidth='xl'
    >
      <CustomDialogInnerWrapper> 
        <BackToModalButtonWrapper>
          <BackToModalButton 
            onClick={
              () => setGameState((prev) => ({
                ...prev,
                click_meta_open: false
              }))
            }
          />
        </BackToModalButtonWrapper>
        <CustomDialogContent>
          <MetaMenuBarWrapper>
            <MetaContentWrapper>
              <CustomTable>
                <thead>
                  <tr>
                    <TitleTh colSpan={2}>メタ文字一覧</TitleTh> 
                  </tr>
                  <tr>
                    <CustomTh>メタ文字</CustomTh> 
                    <MeaningTh>意味</MeaningTh>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <MetaTd>\d</MetaTd> 
                    <CustomTd>1桁の数字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[0-9]</MetaTd> 
                    <CustomTd>1桁の数字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\d{'{'}n,m}</MetaTd> 
                    <CustomTd>n桁以上、m桁以下の数字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\d{'{'}n}</MetaTd> 
                    <CustomTd>n桁の数字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\d{'{'}n,}</MetaTd> 
                    <CustomTd>n桁以上の数字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[AB]</MetaTd> 
                    <CustomTd>A, Bのいずれか1文字(A, Bは任意の1文字)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[ABC]</MetaTd> 
                    <CustomTd>A, B, Cのいずれか1文字(A, B, Cは任意の1文字)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[a-z]</MetaTd> 
                    <CustomTd>小文字アルファベットのいずれか1文字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[A-Z]</MetaTd> 
                    <CustomTd>大文字アルファベットのいずれか1文字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>ABC|DEF</MetaTd> 
                    <CustomTd>文字列ABCまたは文字列DEF</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>ABC|DEF|GHR</MetaTd> 
                    <CustomTd>文字列ABCまたは文字列DEFまたは文字列GHR</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\d+</MetaTd> 
                    <CustomTd>1桁以上の数字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\w</MetaTd> 
                    <CustomTd>[a-zA-Z0-9_]</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>.</MetaTd> 
                    <CustomTd>任意の1文字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>+</MetaTd> 
                    <CustomTd>直前の文字が1文字以上</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>*</MetaTd> 
                    <CustomTd>直前の文字が0文字以上</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>.+</MetaTd> 
                    <CustomTd>任意の文字が1文字以上(貪欲なマッチ)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>.*</MetaTd> 
                    <CustomTd>任意の文字が0文字以上(貪欲なマッチ)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>?</MetaTd> 
                    <CustomTd>直前の文字が1文字または無し</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>(ABC)?</MetaTd> 
                    <CustomTd>文字列ABCまたは無し</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\n</MetaTd> 
                    <CustomTd>改行</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[^A]*</MetaTd> 
                    <CustomTd>A以外の任意の文字が0文字以上</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>.+?</MetaTd> 
                    <CustomTd>任意の文字が1文字以上(控えめなマッチ)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>.*?</MetaTd> 
                    <CustomTd>任意の文字が0文字以上(控えめなマッチ)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>()</MetaTd> 
                    <CustomTd>グループ化。 ()内をキャプチャする機能も併せ持つ。</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>(?:)</MetaTd> 
                    <CustomTd>()と?:を合わせると、キャプチャをしなくなる。</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>^</MetaTd> 
                    <CustomTd>行頭を表す。</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>$</MetaTd> 
                    <CustomTd>行末を表す。</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\t</MetaTd> 
                    <CustomTd>タブ文字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>[ \t]+</MetaTd> 
                    <CustomTd>スペースまたはタブ文字が1文字以上(貪欲なマッチ)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\r</MetaTd> 
                    <CustomTd>復帰文字</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\s</MetaTd> 
                    <CustomTd>[ \t\r\n\f]</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\b</MetaTd> 
                    <CustomTd>単語の境界を表す。</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>\B</MetaTd> 
                    <CustomTd>単語の境界以外を表す。</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>(?{"<"}=abc)</MetaTd> 
                    <CustomTd>文字列abcの直後を表す(肯定の後読み)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>(?=abc)</MetaTd> 
                    <CustomTd>文字列abcの直前を表す(肯定の先読み)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>(?{"<!"}abc)</MetaTd> 
                    <CustomTd>文字列abc以外の直後を表す(否定の後読み)</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>(?!abc)</MetaTd> 
                    <CustomTd>文字列abc以外の直前を表す(否定の先読み)</CustomTd>
                  </tr>
                </tbody>
              </CustomTable>
            </MetaContentWrapper>
          </MetaMenuBarWrapper>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
