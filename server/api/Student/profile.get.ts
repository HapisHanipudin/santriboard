import { prisma } from "~/server/db";
import { defineEventHandler, getQuery } from "h3";
import select from "#build/ui/select";

export default defineEventHandler(async (event) => {
  try {
    // Ambil parameter ID dari query string
    const query = getQuery(event);
    const id = query.id ? parseInt(query.id as string) : null;

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "ID is required" });
    }

    // Ambil data student dari database dengan hanya field yang dibutuhkan
    const student = await prisma.students.findUnique({
      where: { id },
      select: {
        name: true,
        title: true,
        birth_date: true, // umur
        level: true,
        Pondok: true,
        SekolahPayung: true,
        photo: true, // jika menyimpan URL foto

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
            imageUrl: true,
          },
        },
        evaluations: {
          select: {
            field: true,
            score: true,
          },
        },
        classes: {
          select: {
            class: {
              select: {
                name: true, // Nama kelas
                division: {
                  select: {
                    name: true, // Nama division
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw createError({
        statusCode: 404,
        statusMessage: "Student not found",
      });
    }

    return {
      success: true,
      data: student,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
});
