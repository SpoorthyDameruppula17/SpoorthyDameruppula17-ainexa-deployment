'use client';

import React from 'react';
import { wrapper } from './store';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default wrapper.withRedux(Providers);
