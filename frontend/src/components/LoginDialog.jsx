import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

export const LoginDialog = ({
  isOpen,
  onClose
}) => {
  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        ログイン
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          ログインに関するモーダルです。
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};
