import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

// Definisikan tipe untuk user
interface AuthUser {
  id: string;
  username: string;
  role: "ADMIN" | "USER" | string; // Sesuaikan dengan tipe user Anda
  [key: string]: any; // Untuk fleksibilitas properti tambahan
}

// Definisikan tipe untuk decoded JWT
interface DecodedJWT {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

export const useSessionStore = defineStore("SessionStore", {
  state: () => ({
    authToken: "" as string,
    authUser: null as AuthUser | null,
    authLoading: true,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.authToken,
    isAdmin: (state): boolean => state.authUser?.role === "ADMIN",
    isTeacher: (state): boolean => state.authUser?.role === "TEACHER",
  },

  actions: {
    setAuthToken(token: string | null) {
      this.authToken = token ?? "";
    },

    setAuthUser(user: AuthUser | null) {
      this.authUser = user;
    },

    setAuthLoading(value: boolean) {
      this.authLoading = value;
    },

    async login({ username, password }: { username: string; password: string }): Promise<boolean> {
      const toast = useToast();

      try {
        const data = await $fetch<{ access_token: string; user: AuthUser }>("/api/auth/login", {
          method: "POST",
          body: { username, password },
        });
        this.setAuthToken(data.access_token);
        await this.getUser();
        if (data) {
          toast.add({ title: "Success", description: "Login was successful!", color: "success" });
        }

        return true;
      } catch (err) {
        toast.add({ title: "Failed", description: "Login failed: " + (err as Error).message, color: "error" });

        throw new Error("Login failed: " + (err as Error).message);
      }
    },

    async refreshToken(): Promise<boolean> {
      try {
        const data = await $fetch<{ access_token: string }>("/api/auth/refresh", {
          method: "POST",
        });
        console.log("Refresh token data:", data);
        this.setAuthToken(data.access_token);
        return true;
      } catch (error) {
        this.setAuthToken(null);
        this.setAuthUser(null);
        throw new Error("Token refresh failed: " + (error as Error).message);
      }
    },

    scheduleTokenRefresh() {
      if (!this.authToken) return;

      try {
        const jwt = jwtDecode<DecodedJWT>(this.authToken);
        if (!jwt.exp) return;

        const expirationTime = jwt.exp * 1000; // Konversi ke milidetik
        const refreshTime = expirationTime - Date.now() - 60_000; // Refresh 60 detik sebelum kadaluarsa

        if (refreshTime <= 0) {
          this.refreshToken();
          return;
        }

        const timeoutId = setTimeout(async () => {
          await this.refreshToken();
          this.scheduleTokenRefresh();
        }, refreshTime);

        // Simpan timeoutId untuk pembersihan jika diperlukan
        // Anda bisa menambahkan state untuk menyimpan timeoutId jika perlu
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    },

    async getUser(): Promise<boolean> {
      try {
        const data: any = await FetchApi("/api/auth/user");
        this.setAuthUser(data.user);
        return true;
      } catch (error) {
        throw new Error("Failed to fetch user: " + (error as Error).message);
      }
    },

    async logout(): Promise<boolean> {
      try {
        await $fetch("/api/auth/logout", {
          method: "POST",
        });
        this.setAuthToken(null);
        this.setAuthUser(null);
        return true;
      } catch (error) {
        throw new Error("Logout failed: " + (error as Error).message);
      }
    },

    async initAuth(): Promise<boolean> {
      console.log("Initializing auth...");
      this.setAuthLoading(true);
      try {
        await this.refreshToken();
        await this.getUser();
        this.scheduleTokenRefresh();
        return true;
      } catch (error) {
        this.setAuthToken(null);
        this.setAuthUser(null);
        throw new Error("Auth initialization failed: " + (error as Error).message);
      } finally {
        this.setAuthLoading(false);
      }
    },
  },
});
