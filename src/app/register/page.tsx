import type { Metadata } from "next";
import { Suspense } from "react";

import { AccountForm } from "@/features/account";

import styles from "../account-page.module.css";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Ruru Pitambari customer account.",
};

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <section aria-labelledby="register-heading" className={styles.card}>
        <header className={styles.heading}>
          <p>Join Ruru Pitambari</p>
          <h1 id="register-heading">Create account</h1>
        </header>
        <Suspense fallback={null}>
          <AccountForm mode="register" />
        </Suspense>
      </section>
    </div>
  );
}
