"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { inquirySchema, submitInquiry, type InquiryInput } from "@/lib/inquiry";
import type { InquiryType } from "@/lib/types";

interface InquireDialogProps {
  trigger?: ReactNode;
  defaultTab?: InquiryType;
  defaultSegment?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const COPY: Record<InquiryType, { title: string; body: string }> = {
  lease: {
    title: "Lease at American Dream",
    body: "Tell us about your brand and the space you're imagining.",
  },
  sponsor: {
    title: "Sponsor & Partner",
    body: "Partnership tiers tailored to your activation goals.",
  },
  venue: {
    title: "Book a Venue",
    body: "Concerts, conventions, launches, and brand moments.",
  },
};

const inputCls =
  "w-full rounded-md border border-ivory/15 bg-ink/40 px-3 py-2 text-sm text-ivory placeholder:text-ivory/30 focus-visible:outline-none focus-visible:border-gilt focus-visible:ring-1 focus-visible:ring-gilt transition-colors";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.18em] text-ivory/60">
        {label}
      </span>
      {children}
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

export function InquireDialog({
  trigger,
  defaultTab = "lease",
  defaultSegment,
  open,
  onOpenChange,
}: InquireDialogProps) {
  const [tab, setTab] = useState<InquiryType>(defaultTab);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { type: defaultTab, segment: defaultSegment },
  });

  async function onSubmit(values: InquiryInput) {
    await submitInquiry({ ...values, type: tab });
    setSubmitted(true);
    reset({ type: tab, segment: defaultSegment });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent>
        <DialogHeader>
          <span className="text-[10px] uppercase tracking-[0.28em] text-gilt">
            Inquire
          </span>
          <DialogTitle>{COPY[tab].title}</DialogTitle>
          <DialogDescription>{COPY[tab].body}</DialogDescription>
        </DialogHeader>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as InquiryType);
            setSubmitted(false);
          }}
        >
          <TabsList>
            <TabsTrigger value="lease">Lease</TabsTrigger>
            <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
            <TabsTrigger value="venue">Book Venue</TabsTrigger>
          </TabsList>
          <TabsContent value={tab}>
            {submitted ? (
              <div className="py-8 text-center">
                <p className="font-display text-3xl text-gilt">Received.</p>
                <p className="mt-2 text-sm text-muted">
                  Our team will be in touch within one business day.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" error={errors.name?.message}>
                    <input {...register("name")} className={inputCls} />
                  </Field>
                  <Field label="Company" error={errors.company?.message}>
                    <input {...register("company")} className={inputCls} />
                  </Field>
                </div>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputCls}
                  />
                </Field>
                {tab === "venue" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Expected attendees"
                      error={errors.attendees?.message}
                    >
                      <input
                        type="number"
                        {...register("attendees")}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Target date">
                      <input
                        type="date"
                        {...register("eventDate")}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                )}
                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={4}
                    {...register("message")}
                    className={inputCls}
                  />
                </Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send inquiry"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
