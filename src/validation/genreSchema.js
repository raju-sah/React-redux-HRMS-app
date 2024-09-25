import { useMemo } from 'react';
import { z } from 'zod';

export const GenreSchema = (data, currentName = '') => {
  const existingNames = useMemo(() => new Set(
    data?.items
      ?.filter(item => item.name.toLowerCase() !== currentName.toLowerCase())
      .map(item => item.name.toLowerCase())
  ), [data, currentName]);

  return useMemo(() => z.object({
    name: z
      .string()
      .trim()
      .min(1, "Book Category name is required")
      .max(40)
      .refine(val => !existingNames.has(val.toLowerCase()), {
        message: "Book Category name already exists",
      }),
    ageGroup: z.array(z.number()).min(1, "Age group is required"),
    description: z.string().trim().max(300),
    status: z.boolean().default(false),
  }), [existingNames]);
};
