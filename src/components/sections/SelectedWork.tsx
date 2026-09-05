import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.kicker}>Selected work</p>
            <h2 className={styles.title}>Proof lives in the work.</h2>
          </div>
          <p className={styles.intro}>
            Real business problems approached as connected systems — strategy, experience, acquisition and measurement designed to reinforce each other.
          </p>
        </div>

        <div className={styles.list}>
          {projects.map((project, index) => (
            <article key={project.slug} className={styles.project}>
              <div className={styles.copy}>
                <div>
                  <div className={styles.index}>
                    <span>0{index + 1}</span>
                    <span>{project.type}</span>
                  </div>
                  <h3 className={styles.name}>{project.name}</h3>
                  <p className={styles.headline}>{project.headline}</p>
                </div>

                <Link href={`/work/${project.slug}`} className={styles.link}>
                  View case study <i aria-hidden="true">→</i>
                </Link>
              </div>

              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 64vw"
                  className={styles.image}
                />
                <div className={styles.scan} aria-hidden="true" />
                <span className={styles.corner}>WD / CASE STUDY</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
