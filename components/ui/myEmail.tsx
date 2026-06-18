"use client"
import { useState } from "react";

import { Check, Copy } from "lucide-react";

interface myEmailProps {
	email: string
}

export default function MyEmail({ email }: myEmailProps) {
	const [copied, setCopied] = useState(false);

  const copyEmailTrigger = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Impossible de copier l'email :", err);
    }
  };

  return (
    <button
			type="button"
      className={`
        flex
        items-center
        gap-1.5
        relative
        w-fit
        p-0.5
				cursor-pointer

        after:content-['']
        after:bg-primary
        after:rounded-[4px]
        after:block
        after:absolute
        after:inset-[calc(100%-.125rem)_0_0_0]
        after:w-full
        after:-z-1
        after:duration-200
        hover:after:bg-secondary
        hover:after:inset-[-.125rem_0_0_0]
        hover:after:ease-[cubic-bezier(.01,0,.19,2.36)]
      `}
			onClick={copyEmailTrigger}
			aria-label={copied ? "Email copié" : `Copier l'email ${email}`}
    >
      {email} {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}
