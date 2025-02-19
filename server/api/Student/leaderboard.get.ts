import { defineEventHandler, getQuery } from "h3";
import { getLeaderboardByDivision } from "../../db/divisions";

// type bidang = "TAHFIZH" | "IT" | "BAHASA" | "KARAKTER";

// Inisialisasi Prisma Client

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // Pastikan bidang adalah string
  const bidang = typeof query.bidang === "string" ? query.bidang : "";

  if (!bidang) {
    return {
      status: 400,
      message: "bidang harus disertakan dalam query parameter",
    };
  }

  // Ambil data students beserta kelas dan guru
  const divisi = await getLeaderboardByDivision(bidang);
  // // Jika tidak ada students ditemukan
  // if (divisi?.classes.reduce((a, b) => a + b.students.length, 0) === 0) {
  //   return {
  //     status: 404,
  //     message: "Tidak ada siswa yang ditemukan untuk bidang ini.",
  //   };
  // }
  const students = divisi?.classes.flatMap(
    (c) => c.students?.map((s) => s) ?? []
  );

  const score =
    students?.map((s) => ({
      ...s.student,
      score: s.evaluations.reduce((a, b) => a + b.score, 0),
    })) ?? [];

  // // Definisikan bidang yang akan dirangking

  // // Proses setiap student
  // const scores = divisi?.classes.flatMap((c) => c.students.map((s) => ({})));
  // // return students;
  return score;
});
