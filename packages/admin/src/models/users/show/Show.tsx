import React from 'react';
import { Show as RaShow, ShowProps, TabbedShowLayout } from 'react-admin';

import { BasicsTab } from './tabs';

const Show = (props: ShowProps) => (
  <RaShow {...props}>
    <TabbedShowLayout>
      <BasicsTab />
    </TabbedShowLayout>
  </RaShow>
);

export default Show;
