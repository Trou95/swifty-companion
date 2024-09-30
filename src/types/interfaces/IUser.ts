import { IProject } from '@/types/interfaces/IProject';
import { ISkill } from '@/types/interfaces/ISkill';

export interface IUser {
  id: number;
  fullName: string;
  login: string;
  email: string;
  image: string;
  wallet: number;
  level: number;
  skills: ISkill[];
  projects: IProject[];
}
