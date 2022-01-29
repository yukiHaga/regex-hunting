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
  width: 49.8%;
  height: 70%;
  padding-top: 2%;
  padding-bottom: 2%;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
`;

const CustomTable = styled.table`
  width: 60%;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 1.1em;
  border: none;
  margin-left: 2%;
`;

const CustomTd = styled.td`
  padding: 2% 3%; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const NameTd = styled(CustomTd)`
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 2.0em;
  text-align: left;
  color: ${COLORS.BLACK};
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
        <Avatar
          alt="Hunter"
          src={image || DefaultAvatarImage}
          sx={{ width: 200, height: 200, mx: '2%' }}
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
      </StatusWrapper>
    </>
  );
});
