import React from 'react';
import { UserLoginForm } from '.';

export default {
  component: UserLoginForm,
  title: 'User Login Form',
};

const Template = (args) => <UserLoginForm {...args} />;

export const Default = Template.bind({});

Default.args = {
  submitHandler: (formData) => console.log(formData) 
};
