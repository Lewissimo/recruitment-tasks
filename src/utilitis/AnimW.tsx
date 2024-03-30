import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AnimW = ({ value, defaultDuration = 0 }: { value: string, defaultDuration?: number }) => {
  const [state, setState] = useState<string[]>([]);
  const FadeInText = styled('span')(({ theme }) => ({
    '@keyframes fade-in': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-10px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  }));
  useEffect(() => {
    setState(value.split(''));
  }, [value]);

  return (
    <Box>
      {state.map((char, index) => (
        <FadeInText sx={{
            opacity:0,
            animation: `fade-in 1s ${index * .1 + defaultDuration}s ease-in-out forwards`,

        }} key={index}>{char}</FadeInText>
      ))}
    </Box>
  );
};

export default AnimW;
