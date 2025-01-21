import { z } from "zod";

const Zod_restaurantSchema = z.object({
  id:z.string(),
  name:z.string(),
  reviews:z.array(z.object({
    review: z.string(),
    pic:z.string().optional(),
    order:z.number()
  })),
  location:z.string().optional(),
  tags:z.array(z.string()),
  rate:z.number()
});

export const Zod_API_restaurantDetailSchema = Zod_restaurantSchema;
export const Zod_API_restaurantListSchema = Zod_API_restaurantDetailSchema.pick({
  id:true,
  name:true
}).extend({
  pic:z.string()
});