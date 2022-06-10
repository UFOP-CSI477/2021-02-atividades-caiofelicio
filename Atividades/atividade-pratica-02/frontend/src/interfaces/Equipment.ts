import { Register } from './Register';

export interface Equipment {
  id: string;
  name: string;
  registers: Register[];
  createdAt: string;
}
