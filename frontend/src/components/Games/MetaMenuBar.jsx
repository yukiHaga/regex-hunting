import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const MetaMenuBarWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 3px;
  height: 490px;
  width: 220px;
  outline: 8px solid ${COLORS.GRAY};
  display: inline-block;
`;

const TitleWrapper = styled.div`
  height: 60px;
  font-size: 21px;
  line-height: 60px;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-weight: normal;
  text-align: center;
`;

const MetaContentWrapper = styled.div`

`;

export const MetaMenuBar = () => {
  return (
    <>
      <MetaMenuBarWrapper>
        <TitleWrapper>
          メタ文字一覧
        </TitleWrapper>
        <MetaContentWrapper>
          <table>
            <tr>
              <th>メタ文字</th> <th>意味</th>
            </tr>
            <tr>
              <td>\d</td> <td>1桁の数字</td>
            </tr>
            <tr>
              <td>[0-9]</td> <td>1桁の数字</td>
            </tr>
            <tr>
              <td>\d+</td> <td>1桁以上の数字</td>
            </tr>
            <tr>
              <td>{'{'}n,m}</td> <td>直前の文字がn個以上、m個以下</td>
            </tr>
            <tr>
              <td>{'{'}n}</td> <td>直前の文字がちょうどn個</td>
            </tr>
            <tr>
              <td>{'{'}n,}</td> <td>直前の文字がn個以下</td>
            </tr>
            <tr>
              <td>{'{'},n}</td> <td>直前の文字がn個以下</td>
            </tr>
            <tr>
              <td>[AB]</td> <td>A, Bのいずれか1文字(A, Bは任意の1文字)</td>
            </tr>
            <tr>
              <td>[ABC]</td> <td>A, B, Cのいずれか1文字(A, B, Cは任意の1文字)</td>
            </tr>
            <tr>
              <td>[a-z]</td> <td>小文字アルファベットのいずれか1文字</td>
            </tr>
            <tr>
              <td>?</td> <td>直前の文字が1文字または無し</td>
            </tr>
            <tr>
              <td>(2文字以上の文字列)?</td> <td>直前の文字が2文字以上の文字列または無し</td>
            </tr>
            <tr>
              <td>.</td> <td>任意の1文字</td>
            </tr>
            <tr>
              <td>\n</td> <td>改行</td>
            </tr>
            <tr>
              <td>+</td> <td>直前の文字が1文字以上</td>
            </tr>
            <tr>
              <td>*</td> <td>直前の文字が0文字以上</td>
            </tr>
            <tr>
              <td>.+</td> <td>任意の文字が1文字以上(貪欲なマッチ)</td>
            </tr>
            <tr>
              <td>.*</td> <td>任意の文字が0文字以上(貪欲なマッチ)</td>
            </tr>
            <tr>
              <td>[^A]*</td> <td>A以外の任意の文字が0文字以上</td>
            </tr>
            <tr>
              <td>.+?</td> <td>任意の文字が1文字以上(控えめなマッチ)</td>
            </tr>
            <tr>
              <td>.*?</td> <td>任意の文字が0文字以上(控えめなマッチ)</td>
            </tr>
            <tr>
              <td>()</td> <td>()内をキャプチャする。</td>
            </tr>
            <tr>
              <td>(?{"<"}name>pattern)</td> <td>名前付きキャプチャ(nameはキャプチャ名)</td>
            </tr>
            <tr>
              <td>\k{"<"}name></td> <td>名前付きキャプチャで取得した文字列</td>
            </tr>
            <tr>
              <td>(?:)</td> <td>()と?:を合わせると、キャプチャをしなくなる。</td>
            </tr>
            <tr>
              <td>\w</td> <td>[a-zA-Z0-9_]</td>
            </tr>
            <tr>
              <td>^</td> <td>行頭を表す。</td>
            </tr>
            <tr>
              <td>$</td> <td>行末を表す。</td>
            </tr>
            <tr>
              <td>\t</td> <td>タブ文字</td>
            </tr>
            <tr>
              <td>[ \t]+</td> <td>スペースまたはタブ文字が1文字以上(貪欲なマッチ)</td>
            </tr>
            <tr>
              <td>\r</td> <td>復帰文字</td>
            </tr>
            <tr>
              <td>\s</td> <td>[ \t\r\n\f]</td>
            </tr>
            <tr>
              <td>ABC|DEF</td> <td>文字列ABCまたは文字列DEF</td>
            </tr>
            <tr>
              <td>\b</td> <td>単語の境界を表す。</td>
            </tr>
            <tr>
              <td>\B</td> <td>単語の境界以外を表す。</td>
            </tr>
            <tr>
              <td>(?{"<"}=abc)</td> <td>文字列abcの直後を表す(肯定の後読み)</td>
            </tr>
            <tr>
              <td>(?=abc)</td> <td>文字列abcの直前を表す(肯定の先読み)</td>
            </tr>
            <tr>
              <td>(?{"<!"}abc)</td> <td>文字列abc以外の直後を表す(否定の後読み)</td>
            </tr>
            <tr>
              <td>(?!abc)</td> <td>文字列abc以外の直前を表す(否定の先読み)</td>
            </tr>
          </table>
        </MetaContentWrapper>
      </MetaMenuBarWrapper>
    </>
  );
};
