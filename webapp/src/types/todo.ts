export interface ITask {
  id: number;
  title: string;
  status: 0 | 1 | 2; // 0: Pending, 1: Done, 2: Archived
}
