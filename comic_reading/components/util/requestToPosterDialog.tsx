import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title?: string; // Make title and content optional
  content?: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  '& .MuiDialog-paper': {
    backgroundColor: '#4B4B4B',
    border: '2px solid #6A6A6A',
  },
  '& .MuiDialogTitle-root': {
    color: '#ED1B1B',
    textAlign: 'center', // Center the title horizontally
  },
  '& .MuiDialogContent-root': { 
    color: 'white', 
    textAlign: 'center', // Center the content horizontally
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

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onAccept, title, content, acceptButtonText, cancelButtonText }) => {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    onAccept();
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {title || 'Xin lên làm người đăng truyện'} {/* Default title */}
      </DialogTitle>
      <DialogContent>
        <p>{content || 'Bạn có chắc chắn muốn gửi yêu cầu lên làm người đăng truyện?'}</p> {/* Default content */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" style={{ backgroundColor: '#ED1B1B', color: 'white' }}>
          {cancelButtonText || 'Hủy'} {/* Default cancel button text */}
        </Button> 
        <Button disabled={isAccepting} onClick={handleAccept} variant="contained" style={{ backgroundColor: '#ED741B', color: 'white' }}>
          {isAccepting ? 'Đang xử lý...' : (acceptButtonText || 'Chấp nhận')} {/* Default accept button text */}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ConfirmationDialog;