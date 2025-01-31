import { z } from "zod";

export const Zod_usersSchema = z.object({
  firstname:z.string(),
  lastname:z.string(),
  email:z.string(),
  password:z.string(),
});

export const Zod_API_UsersSchema = Zod_usersSchema.omit({
  password:true,
}).extend({
  id:z.string()
});