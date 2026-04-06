"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupTextarea } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(2, "Full name must be at least 2 characters.")
    .max(60, "Full name must be at most 60 characters."),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .max(80, "Company name must be at most 80 characters."),
  emailAddress: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits.")
    .max(20, "Phone number must be at most 20 characters."),
  serviceInterestedIn: z.string().min(1, "Please select a service."),
  projectBudget: z.string().min(1, "Please select a project budget."),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(600, "Message must be at most 600 characters."),
});

export function ContactForm() {
  const controlClassName =
    "h-11 rounded-xl border-slate-200 bg-white px-3 text-sm shadow-xs transition-all placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      emailAddress: "",
      phoneNumber: "",
      serviceInterestedIn: "",
      projectBudget: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Your message has been sent", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <Card className="w-full border-primary/10 dark:border-blue-500/20 shadow-[0_10px_40px_-20px_rgba(12,64,159,0.35)] dark:shadow-[0_10px_40px_-20px_rgba(59,130,246,0.15)] dark:bg-slate-800 sm:max-w-3xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-[#0D1240] dark:text-white sm:text-3xl">
          Let&apos;s Start Something Great
        </CardTitle>
        <CardDescription className="text-base text-slate-600 dark:text-slate-400">
          Tell us about your project and we&apos;ll get back within 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contact-project-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="contact-full-name">Full Name</FieldLabel>
                  <Input
                    {...field}
                    id="contact-full-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    autoComplete="off"
                    required
                    className={controlClassName}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="companyName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="contact-company-name">
                    Company Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-company-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your company name"
                    autoComplete="organization"
                    className={controlClassName}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="emailAddress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="contact-email-address">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-email-address"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                    className={controlClassName}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="contact-phone-number">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-phone-number"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    className={controlClassName}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="serviceInterestedIn"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="contact-service-interested-in">
                    Service Interested In
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="contact-service-interested-in"
                      aria-invalid={fieldState.invalid}
                      className={`w-full ${controlClassName}`}
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="mobile-development">
                        Mobile Development
                      </SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="projectBudget"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="contact-project-budget">
                    Project Budget
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="contact-project-budget"
                      aria-invalid={fieldState.invalid}
                      className={`w-full ${controlClassName}`}
                    >
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-plus">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Pick the range that best matches your expected spend.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1.5 md:col-span-2"
                >
                  <FieldLabel htmlFor="contact-message">
                    Message / Project Brief
                  </FieldLabel>
                  <InputGroupTextarea
                    {...field}
                    id="contact-message"
                    placeholder="Share your goals, scope, timeline, and any key requirements."
                    rows={7}
                    className="min-h-36 resize-y rounded-xl border-slate-200 bg-white px-3 py-2 text-sm shadow-xs placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          type="submit"
          form="contact-project-form"
          className="h-11 gap-2 rounded-full bg-primary px-5 text-white hover:bg-[#0a3582]"
        >
          Send Messge
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
