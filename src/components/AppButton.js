import React from 'react';

import { Button } from '@mui/material';
import { styled } from '@mui/system';

import PropTypes from 'prop-types';

const StyledButton = styled(Button)(
  ({ theme }) => `
    transition: all 1s ease;
    padding: 0.5rem 1.8rem;
    font-weight: 600;
    border-image: linear-gradient(150deg, ${theme.palette.buttonColor.dark} 22%, ${theme.palette.buttonColor.main} 60%, ${theme.palette.buttonColor.light} 100%) 1;
    
    &:hover {
      border-image: linear-gradient(-45deg, ${theme.palette.buttonColor.dark} 22%, ${theme.palette.buttonColor.main} 60%, ${theme.palette.buttonColor.light} 100%) 1;
    } 
  }
`
);

const AppButton = ({ children, actionOnClick }) => {
  return (
    <StyledButton color="inherit" variant="outlined" onClick={actionOnClick}>
      {children}
    </StyledButton>
  );
};

AppButton.propTypes = {
  actionOnClick: PropTypes.func,
};

export default AppButton;
