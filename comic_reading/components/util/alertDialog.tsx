import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from '@emotion/styled';


const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDialog-paper': {
    backgroundColor: '#4B4B4B',
    border: '2px solid #6A6A6A',
  },
  '& .MuiDialogTitle-root': {
    color: '#ED1B1B',
    textAlign: 'center', 
  },
  '& .MuiDialogContent-root': {
    color: 'white',
    textAlign: 'center', 
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 24px',
  },
  '& .MuiButton-contained': {
    borderRadius: '10px',
    width: '120px',
  },
}));


const AlertDialog: React.FC<{ type: 'SUCCESS' | 'FAILED'; message: string; onClose: () => void }> = ({
  type,
  message,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      TransitionProps={{
        onEntering: (node) => {
          // Add animation for smooth appearing
          node.style.opacity = '0';
          node.style.transform = 'translateY(-50px)';
          setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }, 100);
        },
        onExiting: (node) => {
          // Add animation for smooth disappearing
          node.style.opacity = '1';
          setTimeout(() => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(-50px)';
          }, 100);
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" style={{ color: type === 'SUCCESS' ? 'green' : 'red' }}>
          {type === 'SUCCESS' ? 'Thành công' : 'Thất bại'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AlertDialog;