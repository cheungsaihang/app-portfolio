import { z } from "zod";
import { API_UsersDetail } from "./usersTypes";
import { Zod_RefreshTokensSchema, Zod_AccessTokensSchema } from "@/schemas/auth.schema";

export type API_AccessTokens = z.infer<typeof Zod_AccessTokensSchema>;
export type API_RefreshTokens = z.infer<typeof Zod_RefreshTokensSchema>;

export type API_LoginResult = {
  user: API_UsersDetail;
  token: API_AccessTokens;
}

export type API_AccessTokenPayload = {
  userId:string;
  email:string;
}