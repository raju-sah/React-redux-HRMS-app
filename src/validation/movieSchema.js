import { useMemo } from "react";
import { z } from "zod";

export const MovieSchema = (data, currentName = "") => {
  const existingNames = useMemo(
    () =>
      new Set(
        data?.items
          ?.filter(
            (item) =>
              item.name && item.name.toLowerCase() !== currentName.toLowerCase()
          )
          .map((item) => item.name.toLowerCase())
      ),
    [data, currentName]
  );

  return z.object({
    image_url: z.string().trim().min(1, "Image URL is required"),
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100)
      .refine((val) => !existingNames.has(val.toLowerCase()), {
        message: "Name already exists",
      }),
    directors: z
      .array(z.string().trim().min(1, "Director name cannot be empty"))
      .min(1, "Director is required"),
    actors: z
    .array(z.string().trim().min(1, "Actor name cannot be empty"))
    .min(1, "Actor is required"),
    producers: z
    .array(z.string().trim().min(1, "Producer name cannot be empty"))
    .min(1, "Producer is required"),
    rating: z.coerce.number().min(1, "Rating is required"),
    genre: z.array(z.string()).min(1, "Genre is required"),
    industry: z.string().trim().min(1, "Industry is required"),
    release_date: z.string().date().min(1, "Release date is required"),
    run_time_hour: z.coerce.number().min(1, "Run time hour is required"),
    run_time_minute: z.coerce.number().min(1, "Run time minute is required"),
    bo_collection: z.coerce.number().min(1, "BO collection is required"),
    description: z.string().trim().max(300),
    status: z.boolean().default(false),
  });
};
