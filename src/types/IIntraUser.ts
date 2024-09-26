import { ICursusUser } from '@/types/ICursusUser';
import { IProjectUser } from '@/types/IProjectUser';

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
