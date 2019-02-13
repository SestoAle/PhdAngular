import { Student } from './student';

export class Report {
  id: number;
  phdProgramId: number;
  studentId: number;
  proposedCfu: number;
  relation: string;
  year: number;
  approvedByAdvisor = false;
  approved = false;
  student: Student;
}
