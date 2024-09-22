import { useMemo } from "react";
import { z } from "zod";

export const BooksSchema = (data, currentName = "") => {
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
    author: z.array(z.string()).min(1, "Author is required"),
    category: z.array(z.string()).min(1, "Category is required"),
    publication: z
      .string()
      .trim()
      .min(1, "Publication is required")
      .max(100, "Publication must be at most 100 characters long"),
    price: z
      .string()
      .min(1, "Price is required")
      .max(13, "Price must be exactly 10 digits long")
      .regex(/^\d+$/, "Price must contain only digits"),
    isbn: z
      .string()
      .trim()
      .min(1, "ISBN is required")
      .length(13, "ISBN must be exactly 13 digits long")
      .regex(/^\d+$/, "ISBN must contain only digits"),
    edition: z.string().trim().min(1, "Edition is required").max(20),
    language: z.coerce.number().min(1, "Language is required"),
    description: z.string().trim().max(300),
    status: z.boolean().default(false),
  });
};
