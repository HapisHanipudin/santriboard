import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Ambil parameter ID dari request
    const id = event.context.params?.id;
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "ID is required" });
    }

    // Ambil data student dari database
    const student = await prisma.students.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            name: true,
            title: true,
          },
        },
        achievements: {
          select: {
            title: true,
            description: true,
          },
        },
        projects: {
          select: {
            title: true,
            description: true,
            imageUrl: true, // Menampilkan gambar proyek
          },
        },
        classes: {
          include: {
            class: {
              select: {
                name: true,
              },
            },
          },
        },
        pondok: {
          select: {
            level: true,
          },
        },
        school: {
          select: {
            SekolahPayung: true,
          },
        },
        plp_students: {
          select: {
            name: true,
          },
        },
        evaluations: {
          select: {
            field: true,
            score: true,
          },
        },
      },
    });

    if (!student) {
      throw createError({ statusCode: 404, statusMessage: "Student not found" });
    }

    return {
      success: true,
      data: student,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});
