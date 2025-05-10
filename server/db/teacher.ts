import { prisma } from "../db";


export async function getTeachers() {
    try {
      const teachers = await prisma.teachers.findMany({
        select: {
          name: true,
          user: {
            select: {
              email: true,
              username: true,
            },
          },
          divisions: {
            select: {
              division: {
                select: {
                  name: true,
                },
              },
            },
          },
          classes: {
            select: {
              class: {
                select: {
                  name: true,
                },
              },
            },
          },
          notes: true,
        },
      });
      return teachers;
    } catch (error) {
      throw new Error("Failed to fetch teachers");
    }
  }
  
  
  export async function deleteTeacher(id: string) {
    const teacherId = String(id); // Konversi ID ke string
  
    const existingTeacher = await prisma.teachers.findUnique({
      where: { id: teacherId }, // Pastikan ini string
    });
  
    if (!existingTeacher) {
      throw new Error("Teacher not found");
    }
  
    await prisma.teacherDivisions.deleteMany({
      where: { teacherId: teacherId }, // Gunakan string
    });
  
    await prisma.teachers.delete({
      where: { id: teacherId }, // Gunakan string
    });
  
    return true;
  }

export async function updateTeacher(
  id: string,
  name?: string,
  divisions?: { divisionId: string; role: string }[]
) {
  // Cek apakah teacher ada
  const existingTeacher = await prisma.teachers.findUnique({
    where: { id },
  });

  if (!existingTeacher) {
    throw new Error("Teacher not found");
  }

  // Update data guru
  const updatedTeacher = await prisma.teachers.update({
    where: { id },
    data: { name },
  });

  // Jika ada perubahan di divisions, update relasi teacherDivisions
  if (divisions) {
    await prisma.teacherDivisions.deleteMany({
      where: { teacherId: id },
    });

    await prisma.teacherDivisions.createMany({
      data: divisions.map((division) => ({
        teacherId: id,
        divisionId: division.divisionId,
        role: division.role as any, // Enum TeacherRole
      })),
    });
  }

  return updatedTeacher;
}
  

export async function createTeacher(
  name: string,
  divisions: { divisionId: string; role: string }[]
) {
  if (!name || !divisions || !Array.isArray(divisions)) {
    throw new Error("Invalid data format");
  }

  // Membuat teacher baru
  const teacher = await prisma.teachers.create({
    data: {
      name,
      nik: `NIK${Date.now()}`, // Dummy NIK
    },
  });

  // Membuat relasi teacherDivisions
  await prisma.teacherDivisions.createMany({
    data: divisions.map((division) => ({
      teacherId: teacher.id,
      divisionId: division.divisionId,
      role: division.role as any, // Enum TeacherRole
    })),
  });

  return teacher;
}
