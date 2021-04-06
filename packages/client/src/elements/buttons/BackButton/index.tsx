import React from 'react';
import { useHistory } from 'react-router-dom';

import TextButton from '../TextButton';
import { BackIcon } from './BackButton.styled';

const BackButton = () => {
  const history = useHistory();

  return (
    <TextButton onClick={() => history.goBack()}>
      <BackIcon />
      <b>back</b>
    </TextButton>
  );
};

export default BackButton;
