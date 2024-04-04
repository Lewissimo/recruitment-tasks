
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Navigation from './Navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightTheme } from '../theme/theme'; // Asumując poprawne ścieżki
import { mockTagsStore } from './mockTagsStore';


const meta: Meta<typeof Navigation> = {
  title: 'Components/NavComponents/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme(lightTheme)}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof Navigation> = {
  render: () => <Navigation tagsStore={mockTagsStore} />,
};
