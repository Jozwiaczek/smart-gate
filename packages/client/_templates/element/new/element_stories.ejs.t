---
to: "<%= isStories ? `src/elements/${h.changeCase.pascal(Name)}/${h.changeCase.pascal(Name)}.stories.tsx` : null %>"
---
import React from 'react';
import { Meta, Story } from '@storybook/react';
import <%= h.changeCase.pascal(Name) %> from '.';
import { <%= h.changeCase.pascal(Name) %>Props } from './<%= h.changeCase.pascal(Name) %>.types';

export default {
  title: 'Elements/<%= h.changeCase.pascal(Name) %>',
  component: <%= h.changeCase.pascal(Name) %>,
} as Meta;

const Template: Story<<%= h.changeCase.pascal(Name) %>Props> = (args) => <<%= h.changeCase.pascal(Name) %> {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
