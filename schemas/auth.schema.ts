import { z } from "zod";

export const Zod_LoginValidationSchema = z.object({
  email: z.string().email({message: "請輸入正確電郵"}).trim(),
  password: z.string().min(8,{message: "密碼必須至少8位字串及數字" }).trim()
});

export const Zod_AccessTokensSchema = z.object({
  accessToken:z.string(),
  refreshToken:z.string(),
  expiresAt:z.number(),
  userId:z.string()
});

export const Zod_RefreshTokensSchema = Zod_AccessTokensSchema.pick({
  accessToken:true,
  refreshToken:true
});