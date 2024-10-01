export interface IProjectUser {
  final_mark: number;
  created_at: Date;
  status: string;
  project: {
    id: number;
    name: string;
    slug: string;
  };
}
