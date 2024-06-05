import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (mangaId: number, commentId: number, reason: string) => void;
  mangaId: number;
  commentId: number;
}

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

const ReportDialog: React.FC<ReportDialogProps> = ({ isOpen, onClose, onReport, mangaId, commentId }) => {
  const [reason, setReason] = useState('');

  const handleReport = () => {
    onReport(mangaId, commentId, reason);
    onClose();
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        Báo cáo
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Lý do báo cáo"
          multiline
          rows={4}
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ marginTop: '16px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" style={{ backgroundColor: '#ED1B1B', color: 'white' }}>
          Hủy
        </Button>
        <Button onClick={handleReport} variant="contained" style={{ backgroundColor: '#ED741B', color: 'white' }}>
          Báo cáo
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ReportDialog;