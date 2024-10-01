import { ICursusUser } from '@/types/interfaces/ICursusUser';
import { IProjectUser } from '@/types/interfaces/IProjectUser';

export interface IIntraUser {
  id: number;
  email: string;
  login: string;
  displayname: string;
  wallet: number;
  image: {
    link: string;
  };
  cursus_users: ICursusUser[];
  projects_users: IProjectUser[];
}
