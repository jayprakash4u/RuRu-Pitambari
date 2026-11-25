"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

import { Button, Checkbox, Field, Input } from "@/components/ui";
import { SESSION_COOKIE } from "@/lib/auth/constants";

import styles from "./account-form.module.css";

type AccountFormProps = {
  mode: "register" | "sign-in";
};

export function AccountForm({ mode }: AccountFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const isRegister = mode === "register";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isRegister && formData.get("password") !== formData.get("confirmPassword")) {
      setMessage("Passwords do not match.");
      return;
    }

    // Set authenticated session cookie
    document.cookie = `${SESSION_COOKIE}=demo-auth-session; path=/; max-age=604800; SameSite=Lax`;

    const returnTo = searchParams?.get("returnTo") || (isRegister ? "/account" : "/admin");
    router.push(returnTo);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isRegister ? (
        <Field label="Full name" labelFor="account-name">
          <Input autoComplete="name" id="account-name" name="name" required />
        </Field>
      ) : null}

      <Field label="Email address" labelFor="account-email">
        <Input autoComplete="email" id="account-email" name="email" required type="email" />
      </Field>

      <Field
        hint={isRegister ? "Use at least 8 characters." : undefined}
        label="Password"
        labelFor="account-password"
      >
        <div className={styles.passwordField}>
          <Input
            autoComplete={isRegister ? "new-password" : "current-password"}
            id="account-password"
            minLength={8}
            name="password"
            required
            type={passwordVisible ? "text" : "password"}
          />
          <button
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
            onClick={() => setPasswordVisible((visible) => !visible)}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 12s3.3-5 9-5 9 5 9 5-3.3 5-9 5-9-5-9-5Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </button>
        </div>
      </Field>

      {isRegister ? (
        <Field label="Confirm password" labelFor="account-confirm-password">
          <div className={styles.passwordField}>
            <Input
              autoComplete="new-password"
              id="account-confirm-password"
              minLength={8}
              name="confirmPassword"
              required
              type={confirmationVisible ? "text" : "password"}
            />
            <button
              aria-label={
                confirmationVisible ? "Hide confirmed password" : "Show confirmed password"
              }
              aria-pressed={confirmationVisible}
              onClick={() => setConfirmationVisible((visible) => !visible)}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 12s3.3-5 9-5 9 5 9 5-3.3 5-9 5-9-5-9-5Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </button>
          </div>
        </Field>
      ) : (
        <div className={styles.options}>
          <Checkbox label="Remember me" name="remember" />
          <Link href="/contact">Forgot password?</Link>
        </div>
      )}

      <Button className={styles.submit} size="lg" type="submit" variant="brand">
        {isRegister ? "Create account" : "Sign in"}
      </Button>

      <p aria-live="polite" className={styles.status}>
        {message}
      </p>

      <p className={styles.switchPage}>
        {isRegister ? "Already have an account?" : "New to Ruru Pitambari?"}{" "}
        <Link href={isRegister ? "/sign-in" : "/register"}>
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
