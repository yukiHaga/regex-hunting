import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const MetaMenuBarWrapper = styled.div`
  background-color: ${COLORS.MAIN};
  border-radius: 3px;
  height: 490px;
  width: 220px;
  outline: 8px solid ${COLORS.GRAY};
  display: inline-block;
`;

const TitleWrapper = styled.div`
  height: 50px;
  font-size: 21px;
  line-height: 50px;
  color: ${COLORS.SUB};
  font-family: YuGothic;
  font-weight: bold;
  text-align: center;
`;

// white-space: nowrapは、カラム内のテキストを折り返さない為に使う
// overflow-x: autoは横スクロールを可能にする。
// overflow-y: autoは縦スクロールを可能にする。
const MetaContentWrapper = styled.div`
  height: 440px;
  white-space: nowrap;
  overflow-x: auto; 
  overflow-y: auto;
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
  position: sticky;
  top: 0;
  border-left: solid 1px #c79344;
  border-right: solid 1px #c79344;
`;

const MeaningTh = styled(CustomTh)`
  text-align: left;
`;

const CustomTd = styled.td`
  border: solid 1px #c79344;
  padding: 8px 6px; 
`;

const MetaTd = styled(CustomTd)`
  text-align: center;
`;

// キャプチャ関係は問題で出てこないので、消した
export const MetaMenuBar = () => {
  return (
    <>
      <MetaMenuBarWrapper>
        <TitleWrapper>
          メタ文字一覧
        </TitleWrapper>
        <MetaContentWrapper>
          <CustomTable>
            <thead>
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
                <MetaTd>\d+</MetaTd> 
                <CustomTd>1桁以上の数字</CustomTd>
              </tr>
              <tr>
                <MetaTd>{'{'}n,m}</MetaTd> 
                <CustomTd>直前の文字がn個以上、m個以下</CustomTd>
              </tr>
              <tr>
                <MetaTd>{'{'}n}</MetaTd> 
                <CustomTd>直前の文字がちょうどn個</CustomTd>
              </tr>
              <tr>
                <MetaTd>{'{'}n,}</MetaTd> 
                <CustomTd>直前の文字がn個以下</CustomTd>
              </tr>
              <tr>
                <MetaTd>{'{'},n}</MetaTd> 
                <CustomTd>直前の文字がn個以下</CustomTd>
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
                <MetaTd>?</MetaTd> 
                <CustomTd>直前の文字が1文字または無し</CustomTd>
              </tr>
              <tr>
                <MetaTd>(ABC)?</MetaTd> 
                <CustomTd>文字列ABCまたは無し</CustomTd>
              </tr>
              <tr>
                <MetaTd>.</MetaTd> 
                <CustomTd>任意の1文字</CustomTd>
              </tr>
              <tr>
                <MetaTd>\n</MetaTd> 
                <CustomTd>改行</CustomTd>
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
                <MetaTd>\w</MetaTd> 
                <CustomTd>[a-zA-Z0-9_]</CustomTd>
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
                <MetaTd>ABC|DEF</MetaTd> 
                <CustomTd>文字列ABCまたは文字列DEF</CustomTd>
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
    </>
  );
};
