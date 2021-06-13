import React from 'react';

import { ThemeType } from '../../../theme/Theme';
import { Cube, CubeGrid } from './Spinner.styled';
import { SpinnerProps } from './Spinner.types';

const cubeDelaysInOrder = [200, 300, 400, 100, 200, 300, 0, 100, 200];

const Spinner = ({ color = ThemeType.dark, size, margin }: SpinnerProps) => (
  <CubeGrid size={size} margin={margin}>
    {cubeDelaysInOrder.map((animationDelay, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Cube color={color} key={index} animationDelay={animationDelay} />
    ))}
  </CubeGrid>
);

export default Spinner;
