export type Teacher = {
  id: string;
  teacherId: string;
  semesterId: string;
  teacher: {
    name: string;
  };
};

export type Student = {
  id: string;
  studentId: string;
  semesterId: string;
  student: {
    photo: string;
    name: string;
    nis?: string;
  };
};

export type ClassRaw = {
  id: string;
  name: string;
  divisionId: string;
  teachers: Teacher[];
  students: Student[];
};

export function filterClassData(
  data: ClassRaw,
  options: {
    showDivisionId?: boolean;
    showTeacherIds?: boolean;
    showStudentIds?: boolean;
  }
) {
  return {
    id: data.id,
    name: data.name,
    ...(options.showDivisionId ? { divisionId: data.divisionId } : {}),

    teachers: data.teachers.map((t) => ({
      ...(options.showTeacherIds ? { id: t.id, teacherId: t.teacherId, semesterId: t.semesterId } : {}),
      teacher: {
        name: t.teacher.name,
      },
    })),

    students: data.students.map((s) => ({
      ...(options.showStudentIds ? { id: s.id, studentId: s.studentId, semesterId: s.semesterId } : {}),
      student: {
        name: s.student.name,
        nis: s.student.nis,
        photo: s.student.photo,
      },
    })),
  };
}
