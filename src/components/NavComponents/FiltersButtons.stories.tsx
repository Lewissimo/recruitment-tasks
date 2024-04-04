import { Meta, StoryObj } from '@storybook/react';
import FiltersButtons from './FiltersButtons';

const meta: Meta<typeof FiltersButtons> = {
  title: 'Components/FiltersButtons',
  component: FiltersButtons,
};

export default meta;

interface FiltersButtonsStoryArgs {
  open: boolean;
  handleToggle: () => void;
  handleClearAll: () => void;
  valuesChanged: boolean;
  fetchTags: () => Promise<void>;
}

type FiltersButtonsStory = StoryObj<typeof FiltersButtons> & { args: FiltersButtonsStoryArgs };

export const Buttons: FiltersButtonsStory = {
  args: {
    open: false,
    handleToggle: () => alert('Show or hide filters'),
    handleClearAll: () => alert('Set filter to default'),
    valuesChanged: true,
    fetchTags: async () => alert('Fetching tags'),
  },
};


