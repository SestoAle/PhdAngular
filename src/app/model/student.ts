import { Faculty } from './faculty';
import { Scholar } from './scholar';

export class Student {
  id: number;
  facultyId = [];
  firstname: string;
  lastname: string;
  webpage: string;
  email: string;
  faculties: Faculty[];
  externalAdvisor: Scholar = new Scholar();
  role = 'student';
  username: string;
  password: string;
  cycleOfPhdId: number;
  phdProgramId: number;
}
