---
to: "<%= isStories ? `src/elements/${h.changeCase.pascal(Name)}/${h.changeCase.pascal(Name)}.stories.tsx` : null %>"
---
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import <%= h.changeCase.pascal(Name) %> from '.';

export default {
  title: 'Elements/<%= h.changeCase.pascal(Name) %>',
  component: <%= h.changeCase.pascal(Name) %>,
} as Meta;

const Template: Story<<%= h.changeCase.pascal(Name) %>Props> = (args) => <<%= h.changeCase.pascal(Name) %> {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
