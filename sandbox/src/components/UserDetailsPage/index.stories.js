import React from 'react';
import { UserDetailsPage } from '.';

export default {
  component: UserDetailsPage,
  title: 'User Details Page',
};

const Template = (args) => <UserDetailsPage {...args} />;

export const Default = Template.bind({});

