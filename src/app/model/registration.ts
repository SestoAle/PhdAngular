import { Student } from './student';
import { Course } from './course';

export class Registration {
  id: number;
  grade: number = null;
  courseId: number;
  studentId: number;
  student: Student;
  course: Course;
}
