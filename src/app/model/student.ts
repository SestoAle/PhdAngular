import { Faculty } from './faculty';

export class Student {
  id: number;
  facultyId = -1;
  firstname: string;
  lastname: string;
  webpage: string;
  faculty: Faculty;
}
