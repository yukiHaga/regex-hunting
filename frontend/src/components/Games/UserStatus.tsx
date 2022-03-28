import React, { memo } from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

// Presentational Components
import { StatusExperienceBox } from '../Games/StatusExperienceBox';

// Colors
import { COLORS } from '../../style_constants';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

import { WIDTH } from '../../style_constants';

// ステータスのラッパー
const StatusWrapper = styled.div`
  width: 55%;
  padding-top: 2.9%;
  padding-bottom: 2.9%;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1%;
`;

const CustomTable = styled.table`
  width: 50%;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-weight: normal;
  font-size: 1.1em;
  border: none;
  margin-left: 2%;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 0.9em;
  }
`;

const CustomTd = styled.td`
  padding: 2% 3%;
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const NameTd = styled(CustomTd)`
  font-style: normal;
  font-weight: bold;
  font-size: 2.0em;
  text-align: left;
  color: ${COLORS.BLACK};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 1.5em;
  }
`;

const MetaTd = styled(CustomTd)`
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
`;

const ExpTd = styled(CustomTd)`
  text-align: left;
  border: none;
`;

// UserStatussの引数の型
type UserStatusArg = {
  name: string;
  rank: number;
  activeTitle: string;
  temporaryExperience: number;
  totalExperience: number;
  maximumExperiencePerRank: number;
  image: string | null | undefined;
};

export const UserStatus = memo(({
  name,
  rank,
  activeTitle,
  temporaryExperience,
  totalExperience,
  maximumExperiencePerRank,
  image
}: UserStatusArg): JSX.Element => {

  // sxを%指定すると、円から楕円形になってしまったのでやめた
  return (
    <>
      <StatusWrapper>
        <Avatar
          alt="Hunter"
          src={image || DefaultAvatarImage}
          sx={{
            width: {xs: 140, sm: 160, md: 180, lg: 213},
            height: {xs: 140, sm: 160, md: 180, lg: 213},
            ml: '0.4%',
            mr: '3.6%'
          }}
        />
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
              <CustomTd>{activeTitle}</CustomTd>
            </tr>
            <tr>
              <ExpTd colSpan={2}>
                <StatusExperienceBox
                  temporaryExperience={temporaryExperience}
                  totalExperience={totalExperience}
                  maximumExperiencePerRank={maximumExperiencePerRank}
                />
              </ExpTd>
            </tr>
          </tbody>
        </CustomTable>
      </StatusWrapper>
    </>
  );
});
