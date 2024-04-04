import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box, Switch, ThemeProvider } from "@mui/material"; 
import App from './App';

const meta: Meta<typeof App> = {
  title: 'Entire App',
  component: App,
};

export default meta;

type AppStory = StoryObj<typeof App>;

export const DefaultApp: AppStory = {
  args: {
  },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};
