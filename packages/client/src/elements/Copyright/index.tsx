import React from 'react';
import { Wrapper } from './Copyright.styled';

const Copyright = () => (
  <Wrapper>
    Copyright ©&nbsp;
    <a href="https://github.com/Jozwiaczek/smart-gate" rel="noreferrer" target="_blank">
      Smart Gate
    </a>
    &nbsp;
    {new Date().getFullYear()}.
  </Wrapper>
);

export default Copyright;
