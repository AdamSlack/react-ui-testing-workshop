import React from 'react';
import { UserDetailsForm } from '.';

export default {
  component: UserDetailsForm,
  title: 'User Details Form',
};

const Template = (args) => <UserDetailsForm {...args} />;

export const Default = Template.bind({});

Default.args = {
  submitHandler: (formData) => console.log(formData) 
};
