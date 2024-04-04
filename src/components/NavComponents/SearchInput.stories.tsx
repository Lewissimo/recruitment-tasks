import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
};

export default meta;

interface SearchInputArgs {
  pattern: string;
  handleChangeSearchByName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fetchTags: () => void;
}

type SearchInputStory = StoryObj<typeof SearchInput> & { args: SearchInputArgs };

export const Default: SearchInputStory = {
  args: {
    pattern: '',
    handleChangeSearchByName: (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`changed pattern to ${event.target.value}`)
    },
    fetchTags: () => {
      alert('Fetching tags with current search pattern...');
    },
  },
};
