import { z } from "zod";
import { Zod_API_hikingListSchema, Zod_API_hikingDetailSchema } from "@/schemas/hiking.schema";
import { API_ListResponse } from "./defaultTypes";

export type API_HikingDetail = z.infer<typeof Zod_API_hikingDetailSchema>;
export type API_HikingList = z.infer<typeof Zod_API_hikingListSchema>;
export type API_HikingListResponse = API_ListResponse<API_HikingList>;