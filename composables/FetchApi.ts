import { useSessionStore } from "~/stores/session";

export default async (url: string, { headers, ...options }: { headers?: { [key: string]: any }; [key: string]: any } = {}) => {
  // Mengambil data dari store sesi
  const session = useSessionStore();

  try {
    // Melakukan permintaan jaringan dengan header autorisasi
    const response = await $fetch(url, {
      ...options,
      headers: {
        ...headers,
        authorization: `Bearer ${session.authToken}`,
      },
    });

    // Mengembalikan respons dari permintaan jaringan
    return response;
  } catch (error) {
    // Menangani kesalahan yang mungkin terjadi saat melakukan permintaan jaringan
    console.error("Error fetching data:", error);
    throw error; // Melemparkan kembali kesalahan untuk ditangani di luar fungsi ini jika perlu
  }
};
