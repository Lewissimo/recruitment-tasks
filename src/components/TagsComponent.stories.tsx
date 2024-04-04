import { Meta, StoryObj } from '@storybook/react';
import FetchTags from './TagsComponent'; 
import { mockTagsStore } from './mockTagsStore'; 
import { ThemeProvider, createTheme } from '@mui/material';
import { lightTheme } from '../theme/theme';

const meta: Meta<typeof FetchTags> = {
  title: 'Components/FetchTags',
  component: FetchTags,
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme(lightTheme)}> 
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
export const Default: StoryObj<typeof FetchTags> = {
    args: {
      tagsStore: mockTagsStore, 
    },

  };