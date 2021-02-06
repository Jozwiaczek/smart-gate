import React from 'react';
import Link from '../Link';
import { Wrapper } from './Copyright.styled';

const Copyright = () => (
  <Wrapper>
    Copyright ©&nbsp;
    <Link to="https://github.com/Jozwiaczek/smart-gate" asOuterLink>
      Smart Gate
    </Link>
    &nbsp;
    {new Date().getFullYear()}.
  </Wrapper>
);

export default Copyright;
