import { Equipment } from './Equipment';
import { User } from './User';

export interface Register {
  id: string;
  description: string;
  limit: string;
  type: number;
  equipment: Equipment;
  user: User;
}
