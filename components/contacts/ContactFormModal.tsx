"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Contact } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { randomAvatarColor, getInitials } from "@/lib/utils";
import JoinLogo from "@/components/ui/JoinLogo";

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12L9.5 17.5L20 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-muted shrink-0"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-muted shrink-0"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-muted shrink-0"
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

interface ContactFormModalProps {
  contact: Contact | null;
  onClose: () => void;
  onSuccess: () => void;
  onDelete?: () => void;
}

async function saveContact(values: FormValues, existing: Contact | null) {
  const supabase = createClient();
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || null,
  };
  if (existing) {
    const { error } = await supabase
      .from("contacts")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("contacts").insert({
      ...payload,
      color: randomAvatarColor(values.name.trim()),
    });
    if (error) throw error;
  }
}

export default function ContactFormModal({
  contact,
  onClose,
  onSuccess,
  onDelete,
}: ContactFormModalProps) {
  const [loading, setLoading] = useState(false);
  const isEdit = contact !== null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: contact?.name ?? "",
      email: contact?.email ?? "",
      phone: contact?.phone ?? "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      await saveContact(values, contact);
      toast.success(
        isEdit
          ? "Contact successfully updated"
          : "Contact successfully created",
      );
      onSuccess();
    } catch {
      toast.error("Could not save contact. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
        <div className="bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full max-w-[600px] lg:max-w-[1125px] relative overflow-hidden">
          {/* ── Desktop two-panel layout ── */}
          <div className="hidden lg:flex min-h-[560px]">
            {/* Left panel — navy */}
            <div className="w-[520px] shrink-0 bg-navy flex flex-col justify-center gap-3 px-[46px] py-[66px]">
              <JoinLogo variant="light" width={55} />
              <h1 className="text-[61px] font-bold text-white leading-[1.2] mt-4">
                {isEdit ? "Edit contact" : "Add contact"}
              </h1>
              <div className="w-[90px] h-[3px] bg-[#29abe2]" />
            </div>

            {/* Right panel — white */}
            <div className="flex-1 relative flex flex-col justify-center">
              {/* Avatar straddling the divider (edit mode only) */}
              {isEdit && contact && (
                <div
                  className="absolute -left-[60px] top-1/2 -translate-y-1/2 size-[120px] rounded-full flex items-center justify-center text-white text-[47px] font-medium shrink-0 border-[3px] border-white shadow-[0_0_2px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: contact.color }}
                >
                  {getInitials(contact.name)}
                </div>
              )}

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-[48px] right-[48px] text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent"
              >
                <CloseIcon />
              </button>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="pl-[110px] pr-[74px] py-[66px] flex flex-col gap-8"
              >
                <div className="flex flex-col gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`bg-white border rounded-[10px] px-[21px] py-[13px] flex items-center gap-3 focus-within:border-blue transition-colors duration-100 ${errors.name ? "border-error" : "border-border"}`}
                    >
                      <input
                        {...register("name", {
                          validate: (v) =>
                            v.trim() !== "" || "This field is required",
                        })}
                        placeholder="Name"
                        className="flex-1 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                      />
                      <PersonIcon />
                    </div>
                    {errors.name && (
                      <p className="text-error text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`bg-white border rounded-[10px] px-[21px] py-[13px] flex items-center gap-3 focus-within:border-blue transition-colors duration-100 ${errors.email ? "border-error" : "border-border"}`}
                    >
                      <input
                        {...register("email", {
                          validate: (v) =>
                            v.trim() !== "" || "This field is required",
                        })}
                        placeholder="Email"
                        className="flex-1 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                      />
                      <MailIcon />
                    </div>
                    {errors.email && (
                      <p className="text-error text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <div className="bg-white border border-border rounded-[10px] px-[21px] py-[13px] flex items-center gap-3 focus-within:border-blue transition-colors duration-100">
                      <input
                        {...register("phone")}
                        placeholder="Phone"
                        className="flex-1 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                      />
                      <PhoneIcon />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-[25px]">
                  {isEdit && onDelete ? (
                    <button
                      type="button"
                      onClick={onDelete}
                      className="px-[24px] py-[15px] border border-navy rounded-[8px] text-navy text-[21px] cursor-pointer bg-transparent hover:border-blue hover:text-blue transition-colors duration-100"
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-[24px] py-[15px] border border-navy rounded-[8px] text-navy text-[21px] cursor-pointer bg-transparent hover:border-blue hover:text-blue transition-colors duration-100"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1 px-[16px] py-[16px] text-[21px] font-bold text-white bg-navy rounded-[10px] cursor-pointer border-0 hover:bg-blue transition-colors duration-100 disabled:opacity-50"
                  >
                    {loading ? "Saving…" : "Save"} <CheckIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── Mobile single-column layout ── */}
          <div className="lg:hidden px-4 py-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent"
            >
              <CloseIcon />
            </button>
            <h1 className="text-[47px] font-bold leading-[1.2] text-black mb-8">
              {isEdit ? "Edit Contact" : "Add Contact"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-navy">
                    Name<span className="text-[#FF8190]">*</span>
                  </label>
                  <div
                    className={`bg-white border rounded-[10px] px-4 py-3 focus-within:border-blue transition-colors duration-100 ${errors.name ? "border-error" : "border-border"}`}
                  >
                    <input
                      {...register("name", {
                        validate: (v) =>
                          v.trim() !== "" || "This field is required",
                      })}
                      placeholder="Enter name"
                      className="w-full text-[16px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-error text-sm">{errors.name.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-navy">
                    Email<span className="text-[#FF8190]">*</span>
                  </label>
                  <div
                    className={`bg-white border rounded-[10px] px-4 py-3 focus-within:border-blue transition-colors duration-100 ${errors.email ? "border-error" : "border-border"}`}
                  >
                    <input
                      {...register("email", {
                        validate: (v) =>
                          v.trim() !== "" || "This field is required",
                      })}
                      placeholder="Enter email"
                      className="w-full text-[16px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-navy">Phone</label>
                  <div className="bg-white border border-border rounded-[10px] px-4 py-3 focus-within:border-blue transition-colors duration-100">
                    <input
                      {...register("phone")}
                      placeholder="Enter phone number"
                      className="w-full text-[16px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1 w-full px-4 py-3 text-[16px] text-navy bg-bg-app border-2 border-navy rounded-[10px] cursor-pointer hover:border-blue hover:text-blue transition-all duration-100"
                >
                  Cancel <CancelIcon />
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-1 w-full px-4 py-3 text-[16px] text-white font-bold bg-navy rounded-[10px] cursor-pointer border-0 hover:bg-blue transition-all duration-100 disabled:opacity-50"
                >
                  {loading ? "Saving…" : "Save"} <CheckIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
