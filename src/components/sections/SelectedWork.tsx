import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./SelectedWork.module.css";
export function SelectedWork() {
  return <section id="work" className={styles.section} aria-labelledby="work-heading"><div className="container">
    <SectionHeading id="work-heading" kicker="Selected work" title="Proof lives in the work." intro="Real business problems approached as connected systems — strategy, experience, acquisition and measurement designed to reinforce each other." />
    <div className={styles.list}>{projects.map((project,index) => <article key={project.slug} className={styles.project}>
      <div className={styles.copy}><div><div className={styles.index}><span>0{index+1}</span><span>{project.type}</span></div><h3 className={styles.name}>{project.name}</h3><p className={styles.headline}>{project.headline}</p></div><Link href={`/work/${project.slug}`} className={styles.link}>View case study <i aria-hidden="true">→</i></Link></div>
      <div className={styles.media}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 820px) calc(100vw - 40px), (max-width: 1400px) 55vw, 680px" className={styles.image}/><span className={styles.corner}>WD / Case study</span></div>
    </article>)}</div>
  </div></section>;
}
