import { z } from "zod";
import { Zod_API_UsersSchema } from "@/schemas/users.schema";

export type API_UsersDetail = z.infer<typeof Zod_API_UsersSchema>;