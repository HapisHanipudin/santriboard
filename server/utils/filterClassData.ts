import { studentBaseTransformer } from "../transformers/student";

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

export function filterClassData(data: ClassRaw) {
  return {
    id: data.id,
    name: data.name,
    divisionId: data.divisionId,

    teachers: data.teachers.map((t) => ({
      id: t.id,
      teacherId: t.teacherId,
      semesterId: t.semesterId,
      teacher: {
        name: t.teacher.name,
      },
    })),

    students: data.students.map((s) => ({
      id: s.id,
      studentId: s.studentId,
      semesterId: s.semesterId,
      student: studentBaseTransformer(s.student),
      // student: {
      //   name: s.student.name,
      //   nis: s.student.nis,
      //   photo: s.student.photo,
      // },
    })),
  };
}
