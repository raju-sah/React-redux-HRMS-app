import { useMemo } from "react";
import { z } from "zod";

export const BooksSchema = (data, currentName = "") => {
  const existingNames = useMemo(
    () =>
      new Set(
        data?.items
          ?.filter(
            (item) => item.name.toLowerCase() !== currentName.toLowerCase()
          )
          .map((item) => item.name.toLowerCase())
      ),
    [data, currentName]
  );
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100)
      .refine((val) => !existingNames.has(val.toLowerCase()), {
        message: "Name already exists",
      }),
    author: z.array(z.string()).min(1, "Author is required"), //if its was id then number , in here we have _uuid which is string so datatype string
    category: z.array(z.string()).min(1, "Category is required"),
    publication: z
      .string()
      .trim()
      .min(1, "Publication is required")
      .max(100, "Publication must be at most 100 characters long"),
    isbn: z
      .string()
      .trim()
      .min(1, "ISBN is required")
      .length(13, "ISBN must be exactly 13 digits long")
      .regex(/^\d+$/, "ISBN must contain only digits"),
    // alternatively we can use, but the problem is that caanot accept 0 at beginning/starting
    // isbn: z.coerce
    // .number()
    // .min(1, "ISBN is required")
    // .refine((val) => val.toString().length === 13, {
    //   message: "ISBN must be exactly 13 digits long.",
    // }),
    edition: z.string().trim().min(1, "Edition is required").max(20),
    language: z.coerce.number().min(1, "Language is required"),
    description: z.string().trim().max(300),
    status: z.boolean().default(false),
  });
};
