import React, { memo } from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

// Presentational Components
import { StatusExperienceBox } from '../Games/StatusExperienceBox.jsx';

// Colors
import { COLORS } from '../../style_constants.js';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

// ステータスのラッパー
const StatusWrapper = styled.div`
  width: 700px;
  height: 260px;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex
`;

// イメージのラッパー
const ImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  background-color: ${COLORS.WHITE};
  display: flex;
  align-items: center;
  padding: 16px;
`;

// カスタムイメージ
// imageタグだと縦横比を維持できない
// background-imageだと縦横比を維持できる
/*
const CustomImage = styled.div`
  background-image: url(${TemporaryUserImage});
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  border: 3px solid silver;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
`;
*/

const TableWrapper = styled.div`
  align-self: center;
`;

const CustomTable = styled.table`
  width: 430px;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  border: none;
`;

const CustomTd = styled.td`
  padding: 10px 40px; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const NameTd = styled(CustomTd)`
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-align: left;
  color: ${COLORS.BLACK};
`;

const MetaTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
`;

const ExpTd = styled(CustomTd)`
  text-align: left;
  border: none;
`;

export const UserStatus = memo(({
  name,
  rank,
  active_title,
  temporary_experience,
  total_experience,
  maximum_experience_per_rank,
  image
}) => {

  return (
    <>
      <StatusWrapper>
        <ImageWrapper>
          <Avatar
            alt="Hunter"
            src={!image && DefaultAvatarImage}
            sx={{ width: 200, height: 200 }}
          />
        </ImageWrapper>
        <TableWrapper>
          <CustomTable>
            <tbody>
              <tr>
                <NameTd colSpan={2}>{name}</NameTd> 
              </tr>
              <tr>
                <MetaTd>ランク</MetaTd> 
                <CustomTd>{rank}</CustomTd>
              </tr>
              <tr>
                <MetaTd>称号</MetaTd> 
                <CustomTd>{active_title}</CustomTd>
              </tr>
              <tr>
                <ExpTd colSpan={2}>
                  <StatusExperienceBox 
                    temporary_experience={temporary_experience}
                    total_experience={total_experience}
                    maximum_experience_per_rank={maximum_experience_per_rank}
                  />
                </ExpTd>
              </tr>
            </tbody>
          </CustomTable>
        </TableWrapper>
      </StatusWrapper>
    </>
  );
});
