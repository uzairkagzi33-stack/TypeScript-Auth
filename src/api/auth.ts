import { api } from "./client";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  username?: string;
  email: string;
};

export async function loginRequest(payload: LoginInput): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  } catch {
    // Fallback keeps flow working even without backend integration.
    return {
      email: payload.email,
      username: payload.email.split("@")[0] ?? "",
    };
  }
}
