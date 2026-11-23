import { HeroMedia } from "./hero-media";
import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <section aria-label="Ruru Pitambari product film" className={styles.hero}>
      <div className={styles.frame}>
        <HeroMedia />
      </div>
    </section>
  );
}
