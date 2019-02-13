import { Schedule } from './schedule';
import { Material } from './material';
import { Scholar } from './scholar';
import { ScholarService } from '../services/scholar.service';

export class Course {
  id: number;
  title: string;
  abs: string;
  duration: number;
  cfu: number;
  site: string;
  phdProgramId: number;
  year: number;
  schedules: Schedule[] = [];
  teacherIds = {'scholars': [], 'faculties': []};
  materials: Material[] = [];
}
