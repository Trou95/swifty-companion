import { IIntraUser } from '@/types/IIntraUser';
import { IUser } from '@/types/IUser';

export const mapUser = (user: IIntraUser): IUser => {
  const cursusUser = user.cursus_users[1];
  return {
    id: user.id,
    fullName: user.displayname,
    email: user.email,
    image: user.image.link,
    wallet: user.wallet,
    level: cursusUser.level,
    skills: cursusUser.skills,
    projects: user.projects_users.map((project) => {
      return {
        final_mark: project.final_mark,
        status: project.status,
        id: project.project.id,
        name: project.project.name,
        slug: project.project.slug,
      };
    }),
  };
};
