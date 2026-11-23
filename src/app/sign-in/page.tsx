import type { Metadata } from "next";

import { AccountForm } from "@/features/account";

import styles from "../account-page.module.css";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Ruru Pitambari account.",
};

export default function SignInPage() {
  return (
    <div className={styles.page}>
      <section aria-labelledby="sign-in-heading" className={styles.card}>
        <header className={styles.heading}>
          <p>Welcome back</p>
          <h1 id="sign-in-heading">Sign in</h1>
        </header>
        <AccountForm mode="sign-in" />
      </section>
    </div>
  );
}
