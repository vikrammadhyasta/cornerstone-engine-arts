import * as React from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const EMAIL = "vikrammadyasta@gmail.com";
const LINKEDIN = "https://linkedin.com/in/vikram-madhyastha";
const GITHUB = "https://github.com/vikrammadhyasta";

const OPPORTUNITIES = ["Cloud Engineering", "DevOps", "Platform Engineering", "SRE"];

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address, e.g. name@example.com.";
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

const fieldClass =
  "border-border bg-background/60 font-mono text-sm text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-primary/30";

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} profile (opens in a new tab)`}
      className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface/50 px-3 py-2 text-muted-foreground transition-[color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-8px_var(--color-primary)] focus-visible:border-primary/60 focus-visible:text-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Icon className="h-5 w-5" aria-hidden />
      <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        {label} ↗
      </span>
    </a>
  );
}

export function Contact() {
  const [values, setValues] = React.useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [touched, setTouched] = React.useState<Partial<Record<Field, boolean>>>({});
  const [initialized, setInitialized] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const setField = (field: Field) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blurField = (field: Field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio Contact — ${values.name.trim()}`);
    const body = encodeURIComponent(
      `Name:\n${values.name.trim()}\n\nEmail:\n${values.email.trim()}\n\nMessage:\n${values.message.trim()}\n`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setInitialized(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section
      id="contact"
      bordered
      className="scroll-mt-24"
      label="Initialize connection"
      heading="Let's build what comes next."
      description="I'm open to Cloud, DevOps, Platform Engineering, and SRE opportunities."
    >
      <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left — status + channels */}
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm md:p-8">
          <div>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              Open to opportunities
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {OPPORTUNITIES.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-node-pulse motion-reduce:animate-none" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hairline-top pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:border-primary/50 hover:text-primary focus-visible:border-primary/60"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="truncate font-mono text-[0.8125rem]">{EMAIL}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email address copied" : "Copy email address"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/50 text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:text-primary"
              >
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SocialLink href={LINKEDIN} label="LinkedIn" icon={Linkedin} />
              <SocialLink href={GITHUB} label="GitHub" icon={Github} />
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              Bengaluru, India
            </p>
          </div>
        </div>

        {/* Right — connection terminal */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-[0_0_60px_-30px_var(--color-primary)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-background/40 px-4 py-3">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="h-2 w-2 rounded-full bg-border-strong" />
            </span>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground">
              connection.req
            </span>
          </div>

          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="font-mono text-xs text-primary">
                "name":
              </label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={setField("name")}
                onBlur={blurField("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={cn(fieldClass, "h-11")}
              />
              {errors.name && (
                <p id="contact-name-error" className="text-xs text-destructive">
                  ⚠ {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="font-mono text-xs text-primary">
                "email":
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={values.email}
                onChange={setField("email")}
                onBlur={blurField("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={cn(fieldClass, "h-11")}
              />
              {errors.email && (
                <p id="contact-email-error" className="text-xs text-destructive">
                  ⚠ {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="font-mono text-xs text-primary">
                "message":
              </label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me what you're building..."
                value={values.message}
                onChange={setField("message")}
                onBlur={blurField("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={cn(fieldClass, "min-h-[8rem] resize-y")}
              />
              {errors.message && (
                <p id="contact-message-error" className="text-xs text-destructive">
                  ⚠ {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                aria-live="polite"
                className={cn(
                  "flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300 motion-reduce:transition-none",
                  initialized ? "text-success" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    initialized ? "bg-success" : "bg-border-strong",
                  )}
                  aria-hidden
                />
                {initialized ? "Connection initialized" : "Ready"}
              </p>
              <Button type="submit" size="lg" className="h-12 w-full px-6 sm:w-auto">
                Initialize Connection
                <ArrowUpRight />
              </Button>
            </div>

            {initialized && (
              <p className="text-xs leading-relaxed text-muted-foreground">
                Your email client was opened with the message pre-filled — send it from there to
                reach me.
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}
