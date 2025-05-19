import {
  type Teachers,
  type TeacherDivisions,
  type Divisions,
  Role,
  Division,
  TeacherRole,
} from "@prisma/client";

interface TeacherWithDivisionRelation extends Teachers {
  teacherDivisions: (TeacherDivisions & {
    division: Divisions;
  })[];
}

export function teacherTransformer(teacher: any) {
  return {
    id: teacher.id,
    name: teacher.name,
    nik: teacher.nik,
    userId: teacher.userId,
    divisions: teacher.teacherDivisions.map((td: any) => ({
      id: td.division.id,
      name: td.division.name,
      role: td.role,
    })),
  };
}
