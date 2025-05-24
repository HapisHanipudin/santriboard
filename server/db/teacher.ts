import { prisma } from "../db";
import { TeacherRole, Divisions, TeacherDivisions, Role } from "@prisma/client";
import { Prisma } from "@prisma/client";

// Fetch all teachers with related data
export async function getTeachers() {
  try {
    const teachers = await prisma.teachers.findMany({
      select: {
        id: true,
        name: true,
        user: {
          select: {
            email: true,
            username: true,
          },
        },
        teacherDivisions: {
          select: {
            role: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        classes: {
          select: {
            class: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        notes: true,
      },
    });
    return teachers;
  } catch (error: unknown) {
    console.error("Error fetching teachers:", error);
    throw new Error("Failed to fetch teachers");
  }
}

export function getTeacherByUserId(userId: string) {
  return prisma.teachers.findUnique({
    where: { userId },
    include: {
      teacherDivisions: {
        include: {
          division: true, // ini penting untuk mengambil info Division
        },
      },
    },
  });
}

export const getTeacherClasses = async (teacherId: string, divisionId?: string, role?: Role) => {
  const teacherDivisions: any =
    divisionId && role !== Role.ADMIN
      ? await prisma.teacherDivisions.findUnique({
          where: { teacherId_divisionId: { teacherId, divisionId } },
        })
      : ({} as TeacherDivisions);

  const whereClause: Prisma.TeacherClassesWhereInput = {
    ...(teacherDivisions.role != TeacherRole.KADIV && role !== Role.ADMIN
      ? {
          teacherId,
        }
      : {}),
    ...(divisionId
      ? {
          class: {
            division: {
              id: divisionId, // Field enum
            },
          },
        }
      : {}),
  };

  const teacherClasses = await prisma.teacherClasses.findMany({
    where: whereClause,
    include: {
      teacher: true, // Ambil data guru
      class: {
        include: {
          division: true,
          students: true,
        },
      },
    },
  });

  return teacherClasses.map((tc, index) => ({
    id: tc.class.id,
    name: tc.class.name,
    division: tc.class.division.name,
    teacher: tc.teacher.name,
    studentCount: tc.class.students.length,
    category: tc.class.division.name, // Ganti category → division name
  }));
};

// Delete a teacher along with related data
export async function deleteTeacher(id: string) {
  const teacherId = String(id);

  const existingTeacher = await prisma.teachers.findUnique({
    where: { id: teacherId },
  });

  if (!existingTeacher) {
    throw new Error("Guru tidak ditemukan.");
  }

  // Remove related divisions first
  await prisma.teacherDivisions.deleteMany({
    where: { teacherId },
  });

  // Delete teacher record
  await prisma.teachers.delete({
    where: { id: teacherId },
  });

  return { success: true };
}

// Update teacher information
export async function updateTeacher(id: string, name?: string, divisions?: { divisionId: string; role: TeacherRole }[]) {
  const existingTeacher = await prisma.teachers.findUnique({ where: { id } });

  if (!existingTeacher) {
    throw new Error("Guru tidak ditemukan.");
  }

  // Update teacher's name if provided
  const updatedTeacher = await prisma.teachers.update({
    where: { id },
    data: { name },
  });

  // If divisions data is provided, update them
  if (divisions && divisions.length > 0) {
    // Remove existing divisions
    await prisma.teacherDivisions.deleteMany({ where: { teacherId: id } });

    // Add new divisions
    await prisma.teacherDivisions.createMany({
      data: divisions.map(({ divisionId, role }) => ({
        teacherId: id,
        divisionId,
        role,
      })),
    });
  }

  return updatedTeacher;
}

export async function createTeacher(data: {
  name: string;
  nik: string;
  divisionIds: string[]; // Menggunakan ID divisi, bukan nama
  teacherRole?: TeacherRole;
}) {
  try {
    if (!data.divisionIds || data.divisionIds.length === 0) {
      throw new Error("Minimal satu divisi harus dipilih.");
    }

    // Pastikan semua divisionId valid
    const validDivisions = await prisma.divisions.findMany({
      where: {
        id: {
          in: data.divisionIds,
        },
      },
    });

    if (validDivisions.length !== data.divisionIds.length) {
      throw new Error("Salah satu ID divisi tidak ditemukan.");
    }

    // Buat guru dan hubungkan ke divisi melalui tabel pivot teacherDivisions
    const teacher = await prisma.teachers.create({
      data: {
        name: data.name,
        nik: data.nik,
        teacherDivisions: {
          create: data.divisionIds.map((divisionId) => ({
            divisionId,
            role: data.teacherRole || "ASATIDZ",
          })),
        },
      },
      include: {
        teacherDivisions: {
          include: {
            division: true,
          },
        },
      },
    });

    return teacher;
  } catch (error: any) {
    console.error("Error creating teacher:", error);
    throw new Error(error);
  }
}
