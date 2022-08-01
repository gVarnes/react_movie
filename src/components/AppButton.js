import React from 'react';

import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(
  ({ theme }) => `
    transition: all 1s ease;
    border-image: linear-gradient(150deg, ${theme.palette.buttonColor.dark} 22%, ${theme.palette.buttonColor.main} 60%, ${theme.palette.buttonColor.light} 100%) 1;
    &:hover {
      border-image: linear-gradient(-45deg, ${theme.palette.buttonColor.dark} 22%, ${theme.palette.buttonColor.main} 60%, ${theme.palette.buttonColor.light} 100%) 1;
    },
`
);

const AppButton = () => {
  return (
    <StyledButton color="inherit" variant="outlined">
      Login
    </StyledButton>
  );
};

export default AppButton;
