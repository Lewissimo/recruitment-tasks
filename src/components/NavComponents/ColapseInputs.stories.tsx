import { Meta, StoryObj } from '@storybook/react';
import ColapseInputs from './ColapseInputs';
import { mockTagsStore } from '../mockTagsStore';

type ColapseInputsStoryArgs = {
  setOpen: (open: boolean) => void; 
  tagsStore: typeof mockTagsStore; 
};

const meta: Meta<typeof ColapseInputs> = {
  title: 'Components/ColapseInputs',
  component: ColapseInputs,
};

export default meta;

export const Default: StoryObj<ColapseInputsStoryArgs> = {
  render: (args) => <ColapseInputs {...args} />,
  args: { 
    setOpen: () => alert('Download data and closed colapse'), 
    tagsStore: mockTagsStore, 
  },
};
