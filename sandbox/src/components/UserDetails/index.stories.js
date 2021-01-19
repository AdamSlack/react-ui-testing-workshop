import React from 'react';
import { UserDetails } from '.';

export default {
  component: UserDetails,
  title: 'User Details',
};

const Template = (args) => <UserDetails {...args} />;

export const Default = Template.bind({});

Default.args = {
  firstName: 'Aaron',
  lastName: 'Rogers',
  email: 'aaron@greenbaypackers.com',
  jsBeatsTs: 100
};
