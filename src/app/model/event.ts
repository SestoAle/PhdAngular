import { Student } from './student';

export class Event {
  id: number;
  studentId: number;
  description: string;
  link: string;
  date = new Date();
  proposedCfu: number;
  approvedByAdvisor = false;
  approved = false;
  phdProgramId: number;
  student: Student;
}
