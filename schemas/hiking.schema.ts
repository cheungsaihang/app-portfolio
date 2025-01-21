import { z } from "zod";

const Zod_hikingSchema = z.object({
  id:z.string(),
  name:z.string(),
  reviews:z.array(z.string()),
  pics:z.array(z.string()),
  map:z.string().optional(),
  difficult:z.number(),
  tags:z.array(z.string())
});

export const Zod_API_hikingDetailSchema = Zod_hikingSchema;
export const Zod_API_hikingListSchema = Zod_API_hikingDetailSchema.pick({
  id:true,
  name:true
}).extend({
  pic:z.string()
});