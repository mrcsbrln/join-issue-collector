"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Contact } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { randomAvatarColor } from "@/lib/utils";

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

interface ContactFormModalProps {
  contact: Contact | null;
  onClose: () => void;
  onSuccess: () => void;
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full max-w-[600px] relative px-[74px] py-16">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-8 right-10 text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent"
          >
            <CloseIcon />
          </button>
          <h1 className="text-[61px] font-bold leading-[1.2] text-black mb-10">
            {isEdit ? "Edit Contact" : "Add Contact"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[20px] text-navy">
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
                    className="w-full text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-error text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[20px] text-navy">
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
                    className="w-full text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-error text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[20px] text-navy">Phone</label>
                <div className="bg-white border border-border rounded-[10px] px-4 py-3 focus-within:border-blue transition-colors duration-100">
                  <input
                    {...register("phone")}
                    placeholder="Enter phone number"
                    className="w-full text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1 px-6 py-4 text-[20px] text-navy bg-bg-app border-2 border-navy rounded-[10px] cursor-pointer hover:border-blue hover:text-blue transition-all duration-100"
              >
                Cancel <CancelIcon />
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 px-6 py-4 text-[20px] text-white font-bold bg-navy rounded-[10px] cursor-pointer border-0 hover:bg-blue transition-all duration-100 disabled:opacity-50"
              >
                {loading ? "Saving…" : "Save"} <CheckIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
