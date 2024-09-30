export interface ICursusUser {
  grade: string;
  level: number;
  skills: [
    {
      name: string;
      level: number;
    },
  ];
}
