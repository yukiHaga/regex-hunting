import React from 'react';
import styled from 'styled-components';

const FakeHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 55px;
`;

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const FakeHeader = ({onClickLink}) => {

  return (
    <>
      <FakeHeaderWrapper>
      </FakeHeaderWrapper>
    </>
  );
};
