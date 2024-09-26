export interface IProjectUser {
  final_mark: number;
  status: string;
  project: {
    id: number;
    name: string;
    slug: string;
  };
}
