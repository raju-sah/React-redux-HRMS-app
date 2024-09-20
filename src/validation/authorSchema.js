import { z } from "zod";

export const authorSchema = () => {
  return z.object({
    firstName: z.string().trim().min(1, "First name is required").max(50),
    lastName: z.string().trim().min(1, "Last name is required").max(50),
    nationality: z.string().trim().min(1, "Nationality is required"),
    dob: z.string().date().trim().min(1, "Date of birth is required"),
    address: z.string().trim().min(1, "Address is required").max(100),
    description: z.string().trim().max(300),
    popularity: z.coerce
      .number()
      .min(1, "Popularity is required")
      .max(100, "Popularity must be 100 or less"),
    status: z.boolean().default(false),
  });
};
