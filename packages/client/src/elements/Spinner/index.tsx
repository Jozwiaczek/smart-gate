import React from 'react';
import { CubeGrid, Cube } from './Spinner.styled';
import { SpinnerProps } from './Spinner.types';

const cubeDelaysInOrder = [200, 300, 400, 100, 200, 300, 0, 100, 200];

const Spinner = ({ color = 'primary', size = '18px', margin }: SpinnerProps) => (
  <CubeGrid size={size} margin={margin}>
    {cubeDelaysInOrder.map((animationDelay, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Cube color={color} key={index} animationDelay={animationDelay} />
    ))}
  </CubeGrid>
);

export default Spinner;
