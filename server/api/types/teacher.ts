export interface TeacherInput {
    name: string;
    divisions: {
      divisionId: string;
      role: 'ASATIDZ' | 'KADIV'; // Sesuai dengan enum TeacherRole
    }[];
  }
  