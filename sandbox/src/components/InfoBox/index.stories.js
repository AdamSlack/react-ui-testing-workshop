import React from 'react';
import { InfoBox } from '.';

export default {
  component: InfoBox,
  title: 'Info Box',
};

const Template = (args) => <InfoBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: {
    first: 'Aaron',
    last: 'Rodgers',
  },
  ranking: 1,
  score: 123,
};
