import React from 'react';
import { UserLoginPage } from '.';

export default {
  component: UserLoginPage,
  title: 'User Login Page',
};

const Template = (args) => <UserLoginPage {...args} />;

export const Default = Template.bind({});

Default.args = {
};
