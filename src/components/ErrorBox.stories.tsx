import { Meta, StoryObj } from '@storybook/react';
import ErrorBox from './ErrorBox';

const meta: Meta<typeof ErrorBox> = {
  title: 'Components/ErrorBox',
  component: ErrorBox,
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'The error message to display in the alert',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof ErrorBox> = {
  args: {
    errorMessage: '', 
  },
};

