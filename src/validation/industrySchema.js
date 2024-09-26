import { useMemo } from "react";
import { z } from "zod";

export const IndustrySchema = (data, currentName = "") => {
  const existingNames = useMemo(
    () =>
      new Set(
        data?.items
          ?.filter((item) => item.name.toLowerCase() !== currentName.toLowerCase())
          .map((item) => item.name.toLowerCase())
      ),
    [data, currentName]
  );

  return useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .min(1, "Book Category name is required")
          .max(40)
          .refine((val) => !existingNames.has(val.toLowerCase()), {
            message: "Book Category name already exists",
          }),
          origin_country: z.string().trim().nullable(),
        origin_city: z.array(z.number()).optional(),
        popularity: z.coerce
          .number()
          .min(1, "Popularity is required")
          .max(100, "Popularity must be 100 or less"),
        language: z.coerce.number().min(1, "Language is required"),
        description: z.string().trim().max(300).optional(),
        status: z.boolean().default(false),
      }).superRefine((data, ctx) => {
        if (data.origin_country) {
          if (!data.origin_city || data.origin_city.length === 0) {
            ctx.addIssue({
              path: ['origin_city'],
              message: 'Origin City is required when Origin Country is selected',
              code: z.ZodIssueCode.custom,
            });
          }
        }
      }),
    [existingNames]
  );
};