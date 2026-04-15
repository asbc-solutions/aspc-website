"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminAuthPage() {
  const router = useRouter();
  const controlClassName =
    "h-11 rounded-xl border-slate-200 bg-white px-3 text-sm shadow-xs transition-all placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 dark:border-slate-700 dark:bg-slate-900";

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "asbc.subs2026@gmail.com", password: "asbc@2026" },
  });

  const onSubmit = async (data: LoginValues) => {
    form.clearErrors("root");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json: unknown = await res.json().catch(() => null);
        const err =
          json &&
          typeof json === "object" &&
          "error" in json &&
          typeof (json as { error: unknown }).error === "string"
            ? (json as { error: string }).error
            : "Could not sign in.";
        form.setError("root", { message: err });
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      form.setError("root", {
        message: "Network error. Check your connection and try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="w-full border-primary/10 shadow-[0_10px_40px_-20px_rgba(12,64,159,0.35)] dark:border-blue-500/20 dark:bg-slate-800 dark:shadow-[0_10px_40px_-20px_rgba(59,130,246,0.15)]">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-[#0D1240] dark:text-white">
            Admin sign in
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="admin-login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="gap-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1.5">
                    <FieldLabel htmlFor="admin-login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="admin-login-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className={controlClassName}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1.5">
                    <FieldLabel htmlFor="admin-login-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="admin-login-password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={fieldState.invalid}
                      className={controlClassName}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {form.formState.errors.root?.message && (
              <p
                className="text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
