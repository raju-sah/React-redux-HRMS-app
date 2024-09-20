import { useMemo } from 'react';
import { z } from 'zod';

export const BookCategorySchema = (data, currentName = '') => {
  const existingNames = useMemo(() => new Set(
    data?.items
      ?.filter(item => item.categoryName.toLowerCase() !== currentName.toLowerCase())
      .map(item => item.categoryName.toLowerCase())
  ), [data, currentName]);

  return useMemo(() => z.object({
    categoryName: z
      .string()
      .trim()
      .min(1, "Book Category name is required")
      .max(40)
      .refine(val => !existingNames.has(val.toLowerCase()), {
        message: "Book Category name already exists",
      }),
    ageGroup: z.array(z.number()).min(1, "Age group is required"),
    description: z.string().trim().max(300),
    popularity: z.coerce
      .number()
      .min(1, "Popularity is required")
      .max(100, "Popularity must be 100 or less"),
    status: z.boolean().default(false),
  }), [existingNames]);
};
