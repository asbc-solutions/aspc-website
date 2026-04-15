"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe,
  MapPin,
  Monitor,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import {
  type CareerApplicationAnswerInput,
  type JobPositionDetails,
  submitPositionApplication,
} from "@/app/api/jobs.api";

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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/app/schema";

const HEARD_ABOUT_OPTIONS = [
  "LinkedIn",
  "Referral",
  "Website",
  "Other",
] as const;
const WORK_TYPE_OPTIONS = [
  { value: "on-site", label: "On-site", icon: Briefcase },
  { value: "remote", label: "Remote", icon: Monitor },
  { value: "hybrid", label: "Hybrid", icon: ArrowLeftRight },
] as const;

type ApplyFormValues = z.infer<typeof formSchema>;

type ApplyFormProps = {
  position: JobPositionDetails | null;
};

const normalizeLabel = (value: string): string =>
  value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");

const buildAnswersFromForm = (
  position: JobPositionDetails,
  data: ApplyFormValues,
): CareerApplicationAnswerInput[] => {
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  const answerMap: Record<string, string | number | boolean | string[]> = {
    fullname: fullName,
    emailaddress: data.emailAddress,
    phonenumber: data.phoneNumber,
    yearsofexperience: data.yearsExperience,
    coverletter: data.coverMessage,
    portfoliourl: data.portfolio,
    cvlink: data.cvLink,
    linkedinprofile: data.linkedIn,
    city: data.city,
    nationality: data.nationality,
    wheredidyouwork: data.recentCompany ?? "",
    expectedsalarymonthly: data.expectedSalary ?? "",
    livedemolink: data.liveProject ?? "",
    frontendframeworks: data.heardAbout ?? [],
    availabilitytostart: data.workType,
  };

  return position.form_fields
    .map((field) => {
      const mappedValue = answerMap[normalizeLabel(field.label)];
      if (mappedValue === undefined || mappedValue === "") {
        return null;
      }

      return {
        form_field_id: field.id,
        value: mappedValue,
      };
    })
    .filter((answer): answer is CareerApplicationAnswerInput => answer !== null);
};

export default function ApplyForm({ position }: Readonly<ApplyFormProps>) {
  const [step, setStep] = React.useState(1);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(
    "Your application has been submitted successfully.",
  );
  const controlClassName =
    "h-11 rounded-xl border-[#d6e6ff] bg-white px-3 text-sm shadow-xs transition-all placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:border-slate-700 dark:bg-slate-900 dark:aria-invalid:border-red-500";
  const sectionLabelClass =
    "mb-3 mt-1 text-xs font-semibold tracking-[0.18em] text-primary/70 uppercase";
  const positionTitle = position?.title ?? "";

  const stepFieldMap: Record<
    number,
    Array<keyof z.infer<typeof formSchema>>
  > = {
    1: [
      "firstName",
      "lastName",
      "emailAddress",
      "phoneNumber",
      "city",
      "nationality",
      "workType",
    ],
    2: [
      "applyingFor",
      "yearsExperience",
      "recentCompany",
      "expectedSalary",
      "cvLink",
      "linkedIn",
      "portfolio",
      "liveProject",
    ],
    3: ["coverMessage", "acceptedPrivacy", "certifiedInfo"],
  };

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      city: "",
      nationality: "Egyptian",
      workType: "on-site",
      applyingFor: positionTitle,
      yearsExperience: "5-plus",
      recentCompany: "",
      expectedSalary: "",
      cvLink: "",
      linkedIn: "",
      portfolio: "",
      liveProject: "",
      coverMessage: "",
      heardAbout: [],
      acceptedPrivacy: false,
      certifiedInfo: false,
    },
  });

  const onSubmit = async (data: ApplyFormValues) => {
    if (!position) {
      toast.error("Position details are missing. Please refresh the page.");
      return;
    }

    try {
      setIsSubmitting(true);
      const answers = buildAnswersFromForm(position, data);
      const response = await submitPositionApplication(position.id, { answers });
      console.log(
        "SubmittedPositionApplicationAnswer[]",
        response.data.answers,
      );

      setSuccessMessage(response.message);
      setIsSubmitted(true);
      toast("Application submitted", {
        description: response.message,
        position: "bottom-right",
      });
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitAnother = () => {
    form.reset({
      ...form.getValues(),
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      city: "",
      nationality: "Egyptian",
      workType: "on-site",
      yearsExperience: "5-plus",
      recentCompany: "",
      expectedSalary: "",
      cvLink: "",
      linkedIn: "",
      portfolio: "",
      liveProject: "",
      coverMessage: "",
      heardAbout: [],
      acceptedPrivacy: false,
      certifiedInfo: false,
      applyingFor: positionTitle,
    });
    setStep(1);
    setIsSubmitted(false);
  };

  const onContinue = async () => {
    const isValid = await form.trigger(stepFieldMap[step], {
      shouldFocus: true,
    });
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const onBack = () => setStep((prev) => Math.max(prev - 1, 1));

  let stepTitle = "Cover Message";
  let stepDescription = "Almost done - one last step.";

  if (step === 1) {
    stepTitle = "Personal Information";
    stepDescription = "Start with your basic contact details.";
  } else if (step === 2) {
    stepTitle = "Experience & Documents";
    stepDescription = "Tell us about your background.";
  }

  if (isSubmitted) {
    return (
      <Card className="w-2/3 border-[#d6e6ff] py-16 shadow-[0_10px_40px_-20px_rgba(12,64,159,0.35)] dark:border-blue-500/20 dark:bg-slate-800">
        <CardContent className="mx-auto flex max-w-xl flex-col items-center px-4 text-center">
          <div className="mb-8 flex size-20 items-center justify-center rounded-full bg-[#e7f8e9]">
            <Check className="size-10 text-[#0a8f43]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0D1240] dark:text-white">
            Application Submitted!
          </h3>
          <p className="mt-5 text-xl leading-relaxed text-[#8eb8ea]">
            {successMessage}
          </p>
          <Button
            type="button"
            onClick={onSubmitAnother}
            className="mt-10 h-14 rounded-lg px-10 text-xl font-semibold"
          >
            <RotateCcw className="size-6" />
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_320px] ">
      <Card className="w-full md:p-8! border-[#d6e6ff] shadow-[0_10px_40px_-20px_rgba(12,64,159,0.35)] dark:border-blue-500/20 dark:bg-slate-800">
        <CardHeader className="space-y-3 pb-5">
          <div className="w-full">
            <div className="mb-2 flex gap-2">
              {[1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={`h-1 w-8 rounded-full ${index <= step ? "bg-primary" : "bg-[#d6e6ff]"}`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#0D1240] dark:text-white">
            {stepTitle}
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            {stepDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="**:data-[slot=field-error]:text-red-500">
          <form
            id="careers-application-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {step === 1 && (
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <p className={`${sectionLabelClass} md:col-span-2`}>
                  Basic Info
                </p>
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-first-name">
                        First Name *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-first-name"
                        placeholder="e.g. Ahmed"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-last-name">
                        Last Name *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-last-name"
                        placeholder="e.g. Hassan"
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
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-email-address">
                        Email Address *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-email-address"
                        type="email"
                        placeholder="you@example.com"
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
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-phone-number">
                        Phone Number *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-phone-number"
                        type="tel"
                        placeholder="+20 1XX XXX XXXX"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-city">City</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="app-city"
                          className={`w-full data-placeholder:text-slate-400 ${controlClassName}`}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent className="bg-main">
                          <SelectItem value="cairo">Cairo</SelectItem>
                          <SelectItem value="alexandria">Alexandria</SelectItem>
                          <SelectItem value="giza">Giza</SelectItem>
                          <SelectItem value="mansoura">Mansoura</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="nationality"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-nationality">
                        Nationality
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="app-nationality"
                          className={`w-full ${controlClassName}`}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent className="bg-main">
                          <SelectItem value="Egyptian">Egyptian</SelectItem>
                          <SelectItem value="Saudi">Saudi</SelectItem>
                          <SelectItem value="Jordanian">Jordanian</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <p className={`${sectionLabelClass} md:col-span-2`}>
                  Work Type Preference
                </p>
                <Controller
                  name="workType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5 md:col-span-2"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {WORK_TYPE_OPTIONS.map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => field.onChange(item.value)}
                            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                              field.value === item.value
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-[#d6e6ff] text-slate-500 hover:border-primary/50"
                            }`}
                          >
                            <span className="flex items-center flex-col justify-center gap-2">
                              <item.icon className="size-6" />
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            )}

            {step === 2 && (
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <p className={`${sectionLabelClass} md:col-span-2`}>
                  Professional Background
                </p>
                <Controller
                  name="applyingFor"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-applying-for">
                        Applying For *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-applying-for"
                        value={positionTitle}
                        readOnly
                        className={controlClassName}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="yearsExperience"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-years-experience">
                        Years of Experience *
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="app-years-experience"
                          className={`w-full ${controlClassName}`}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-plus">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="recentCompany"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5 md:col-span-2"
                    >
                      <FieldLabel htmlFor="app-recent-company">
                        Where did you work?
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-recent-company"
                        placeholder="Most recent company"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="expectedSalary"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5 md:col-span-2"
                    >
                      <FieldLabel htmlFor="app-expected-salary">
                        Expected Salary (monthly)
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-expected-salary"
                        placeholder="e.g. 25,000"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="cvLink"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5 md:col-span-2"
                    >
                      <FieldLabel htmlFor="app-cv-link">
                        CV / Portfolio Link
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-cv-link"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <p className={`${sectionLabelClass} md:col-span-2`}>
                  Online Presence
                </p>
                <Controller
                  name="linkedIn"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5 md:col-span-2"
                    >
                      <FieldLabel htmlFor="app-linkedin">
                        LinkedIn Profile
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-linkedin"
                        type="url"
                        placeholder="linkedin.com/in/your-profile"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="portfolio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-portfolio">
                        Portfolio / GitHub
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-portfolio"
                        type="url"
                        placeholder="portfolio or github link"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="liveProject"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-live-project">
                        Live Project
                      </FieldLabel>
                      <Input
                        {...field}
                        id="app-live-project"
                        type="url"
                        placeholder="live demo link"
                        className={controlClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            )}

            {step === 3 && (
              <FieldGroup className="grid grid-cols-1 gap-4">
                <p className={sectionLabelClass}>Cover Message</p>
                <Controller
                  name="coverMessage"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor="app-cover-message">
                        Why do you want to join Arabian Solutions? *
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="app-cover-message"
                        rows={6}
                        placeholder="Tell us about your motivation, relevant experience, and what you would bring to the team."
                        className="min-h-32 resize-y rounded-xl border-[#d6e6ff] bg-white px-3 py-2 text-sm shadow-xs placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 dark:border-slate-700 dark:bg-slate-900"
                      />
                      {fieldState.invalid &&
                        (fieldState.isTouched ||
                          form.formState.submitCount > 0) && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="heardAbout"
                  control={form.control}
                  render={({ field }) => (
                    <Field className="gap-1.5">
                      <FieldLabel>How did you hear about us?</FieldLabel>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {HEARD_ABOUT_OPTIONS.map((option) => {
                          const currentValue = field.value ?? [];
                          const active = currentValue.includes(option);
                          const nextValue = active
                            ? currentValue.filter((item) => item !== option)
                            : [...currentValue, option];
                          return (
                            <button
                              key={option}
                              type="button"
                              className={`rounded-xl border px-3 py-2 text-sm transition ${
                                active
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-[#d6e6ff] text-slate-500"
                              }`}
                              onClick={() => field.onChange(nextValue)}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  )}
                />

                <Controller
                  name="acceptedPrivacy"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(event) =>
                            field.onChange(event.target.checked)
                          }
                          className="mt-0.5 size-4 rounded border-[#d6e6ff]"
                        />
                        <span>
                          I agree to the Privacy Policy and consent to Arabian
                          Solutions processing my data for recruitment.
                        </span>
                      </label>
                      {fieldState.invalid &&
                        (fieldState.isTouched ||
                          form.formState.submitCount > 0) && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="certifiedInfo"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(event) =>
                            field.onChange(event.target.checked)
                          }
                          className="mt-0.5 size-4 rounded border-[#d6e6ff]"
                        />
                        <span>
                          I confirm that all information provided in this
                          application is accurate.
                        </span>
                      </label>
                      {fieldState.invalid &&
                        (fieldState.isTouched ||
                          form.formState.submitCount > 0) && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-2">
          <p className="text-sm text-slate-500">Step {step} of 3</p>
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-lg px-4"
                onClick={onBack}
              >
                <ArrowLeft />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                className="h-10 rounded-lg px-6"
                onClick={onContinue}
                disabled={isSubmitting}
              >
                Continue
                <ArrowRight />
              </Button>
            ) : (
              <Button
                type="submit"
                form="careers-application-form"
                className="h-10 rounded-lg px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                <Check />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <div className="space-y-4 ">
        <Card className="border-[#d6e6ff] dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Role Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Department
                </p>
                <p className="font-semibold">{position?.department ?? "-"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BriefcaseBusiness className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Contract Type
                </p>
                <p className="font-semibold">
                  {position?.employment_type.label ?? "-"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Location
                </p>
                <p className="font-semibold">{position?.work_type.label ?? "-"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Level
                </p>
                <p className="font-semibold">{position?.experience ?? "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#d6e6ff] dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
            {[
              "Health insurance",
              "Flexible hours",
              "Annual bonus",
              "Remote options",
              "Learning budget",
              "Stock options",
              "Team retreats",
              "Home office setup",
            ].map((benefit) => (
              <p key={benefit} className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-primary" />
                {benefit}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="border-[#d6e6ff] dark:border-slate-700 lg:hidden">
          <CardContent className="flex items-center gap-2 py-4 text-sm text-slate-600 dark:text-slate-400">
            <Globe className="size-4 text-primary" />
            Role details stay visible on larger screens.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
