import Image from "next/image";
import Link from "next/link";

import logoSource from "@/assets/brand/logo-transparent.png";
import { classNames } from "@/lib/class-names";

import styles from "./brand-lockup.module.css";

export type BrandLockupProps = {
  className?: string;
  compact?: boolean;
  href?: string;
  inverse?: boolean;
};

export function BrandLockup({
  className,
  compact = false,
  href = "/",
  inverse = false,
}: BrandLockupProps) {
  return (
    <Link
      aria-label="Ruru Pitambari home"
      className={classNames(styles.lockup, inverse && styles.inverse, className)}
      href={href}
    >
      <span className={styles.seal}>
        <Image alt="" className={styles.sealImage} priority sizes="5rem" src={logoSource} />
      </span>
      {!compact ? (
        <span className={styles.words}>
          <strong>Ruru Pitambari</strong>
          <small>Heritage metal care</small>
        </span>
      ) : null}
    </Link>
  );
}
