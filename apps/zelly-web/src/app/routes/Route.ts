import { FC, ReactNode } from 'react';

export interface Route {
  path: string;
  name: string;
  component: ReactNode | FC;
}
