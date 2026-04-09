import z from "zod";

export const formSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required."),
  lastName: z.string().trim().min(2, "Last name is required."),
  emailAddress: z.string().trim().min(1, "Email is required."),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Phone number is required.")
    .max(20, "Phone number must be at most 20 characters."),
  city: z.string().min(1, "Please select your city."),
  nationality: z.string().min(1, "Please select your nationality."),
  workType: z.string().min(1, "Please select your preferred work type."),
  applyingFor: z.string().min(1, "Please select a position."),
  yearsExperience: z.string().min(1, "Please select your years of experience."),
  recentCompany: z.string().trim().optional(),
  expectedSalary: z.string().trim().optional(),
  cvLink: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: "Please enter a valid URL.",
    }),
  linkedIn: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: "Please enter a valid URL.",
    }),
  portfolio: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: "Please enter a valid URL.",
    }),
  liveProject: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: "Please enter a valid URL.",
    }),
  coverMessage: z
    .string()
    .trim()
    .min(80, "Cover message must be at least 80 characters.")
    .max(1200, "Cover message must be at most 1200 characters."),
  heardAbout: z.array(z.string()).optional(),
  acceptedPrivacy: z.boolean().refine((value) => value, {
    message: "You must agree to the privacy policy.",
  }),
  certifiedInfo: z.boolean().refine((value) => value, {
    message: "You must confirm your information is accurate.",
  }),
});
