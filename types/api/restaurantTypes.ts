import { z } from "zod";
import { Zod_API_restaurantDetailSchema, Zod_API_restaurantListSchema } from "@/schemas/restaurant.schema";
import { API_ListResponse } from "./defaultTypes";

export type API_RestaurantDetail = z.infer<typeof Zod_API_restaurantDetailSchema>;
export type API_RestaurantList = z.infer<typeof Zod_API_restaurantListSchema>;
export type API_RestaurantListResponse = API_ListResponse<API_RestaurantList>;