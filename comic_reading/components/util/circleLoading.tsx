import React from 'react';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
  position: fixed; /* Stay on top */
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure it's on top of other content */
`;

const LoadingScreen = () => {
  return (
    <Container>
      <CircularProgress color="error" size={80} /> 
    </Container>
  );
};

export default LoadingScreen;