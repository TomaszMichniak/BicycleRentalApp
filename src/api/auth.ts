import { api } from "./axios";

export async function Login(email: string, password: string): Promise<string> {
  const response = await api.post("/Auth/Login", {email,password});
  return response.data;
}
