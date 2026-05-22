"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

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
      <div className="fixed inset-0 bg-black/30 z-40" />
      <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
        <div className="flex min-h-full items-start lg:items-center justify-center p-4 lg:p-8">
          <div
            className="bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full max-w-[440px] lg:max-w-[1125px] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button — positioned relative to the card, over the navy header on mobile */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-4 lg:top-[48px] lg:right-[48px] text-white lg:text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent z-10"
            >
              <CloseIcon />
            </button>

            {/* Single form — prevents duplicate register() calls */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col lg:flex-row lg:min-h-[560px]"
            >
              {/* Navy panel — top on mobile, left on desktop */}
              <div className="bg-navy flex flex-col gap-3 px-6 pt-10 pb-[90px] lg:w-[520px] lg:shrink-0 lg:justify-center lg:py-[66px] lg:px-[46px]">
                <div className="hidden lg:block">
                  <JoinLogo variant="light" width={55} />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-[32px] lg:text-[47px] font-bold text-white leading-[1.2] lg:mt-4">
                    {isEdit ? "Edit contact" : "Add contact"}
                  </h1>
                  {!isEdit && (
                    <p className="lg:hidden text-[20px] text-white leading-[1.2]">
                      Tasks are better with a team!
                    </p>
                  )}
                </div>
                <div className="w-[90px] h-[3px] bg-blue" />
              </div>

              {/* Content area */}
              <div className="flex-1 relative flex flex-col">
                {/* Avatar — mobile: always visible, centered, overlaps header | desktop: edit mode only, straddling left border */}
                <div className="lg:hidden flex justify-center -mt-[60px] relative z-10 mb-8">
                  {isEdit && contact ? (
                    <div
                      className="size-[120px] rounded-full flex items-center justify-center text-white text-[47px] font-medium border-[3px] border-white shadow-[0_0_2px_rgba(0,0,0,0.1)]"
                      style={{ backgroundColor: contact.color }}
                    >
                      {getInitials(contact.name)}
                    </div>
                  ) : (
                    <div className="size-[120px] rounded-full bg-[#d1d1d1] flex items-center justify-center border-[3px] border-white shadow-[0_0_2px_rgba(0,0,0,0.1)]">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="white"
                        aria-hidden="true"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {isEdit && contact ? (
                  <div
                    className="hidden lg:flex absolute -left-[60px] top-1/2 -translate-y-1/2 size-[120px] rounded-full items-center justify-center text-white text-[47px] font-medium shrink-0 border-[3px] border-white shadow-[0_0_2px_rgba(0,0,0,0.1)]"
                    style={{ backgroundColor: contact.color }}
                  >
                    {getInitials(contact.name)}
                  </div>
                ) : (
                  <div className="hidden lg:flex absolute -left-[60px] top-1/2 -translate-y-1/2 size-[120px] rounded-full items-center justify-center bg-[#d1d1d1] shrink-0 border-[3px] border-white shadow-[0_0_2px_rgba(0,0,0,0.1)]">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="white"
                      aria-hidden="true"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}

                {/* Fields + Buttons */}
                <div
                  className={`flex flex-col flex-1 lg:justify-center gap-8 px-4 lg:pl-[110px] lg:pr-[74px] lg:py-[66px] pb-8 lg:pb-0 ${!isEdit ? "pt-8 lg:pt-0" : ""}`}
                >
                  {/* Fields */}
                  <div
                    className={`flex flex-col ${isEdit ? "gap-6" : "gap-[15px] lg:gap-6"}`}
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`bg-white border rounded-[10px] h-[41px] px-[21px] flex items-center gap-3 focus-within:border-blue transition-colors duration-100 ${errors.name ? "border-error" : "border-border"}`}
                      >
                        <input
                          {...register("name", {
                            validate: (v) =>
                              v.trim() !== "" || "This field is required",
                          })}
                          placeholder="Name"
                          className="flex-1 min-w-0 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
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
                        className={`bg-white border rounded-[10px] h-[41px] px-[21px] flex items-center gap-3 focus-within:border-blue transition-colors duration-100 ${errors.email ? "border-error" : "border-border"}`}
                      >
                        <input
                          {...register("email", {
                            validate: (v) =>
                              v.trim() !== "" || "This field is required",
                          })}
                          placeholder="Email"
                          className="flex-1 min-w-0 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
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
                    <div className="bg-white border border-border rounded-[10px] h-[41px] px-[21px] flex items-center gap-3 focus-within:border-blue transition-colors duration-100">
                      <input
                        {...register("phone")}
                        placeholder="Phone"
                        className="flex-1 min-w-0 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                      />
                      <PhoneIcon />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center lg:justify-start gap-5 lg:gap-[25px]">
                    {/* Cancel/Delete — hidden on mobile for add mode (X button closes) */}
                    <div
                      className={!isEdit ? "hidden lg:contents" : "contents"}
                    >
                      {isEdit && onDelete ? (
                        <button
                          type="button"
                          onClick={onDelete}
                          className="flex items-center justify-center h-[51px] px-[10px] py-[18px] border border-navy rounded-[10px] text-[20px] text-navy cursor-pointer bg-transparent hover:border-blue hover:text-blue transition-colors duration-100"
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex items-center justify-center h-[51px] px-[10px] py-[18px] border border-navy rounded-[10px] text-[20px] text-navy cursor-pointer bg-transparent hover:border-blue hover:text-blue transition-colors duration-100"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-1 h-[51px] px-[10px] py-[18px] text-[21px] font-bold text-white bg-navy rounded-[10px] cursor-pointer border-0 hover:bg-blue transition-colors duration-100 disabled:opacity-50"
                    >
                      {loading
                        ? isEdit
                          ? "Saving…"
                          : "Creating…"
                        : isEdit
                          ? "Save"
                          : "Create contact"}{" "}
                      <CheckIcon />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
