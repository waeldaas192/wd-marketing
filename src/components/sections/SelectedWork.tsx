import Link from "next/link";
import { projects } from "@/data/projects";
import { resolveMedia } from "@/lib/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./SelectedWork.module.css";
export function SelectedWork() {
  return <section id="work" className={styles.section} data-studio-section="work" aria-labelledby="work-heading"><div className="container">
    <SectionHeading id="work-heading" kicker="Selected work" title="Proof lives in the work." intro="Real business problems approached as connected systems — strategy, experience, acquisition and measurement designed to reinforce each other."/>
    <div className={styles.list}>{projects.map((project,index)=><article key={project.slug} className={styles.project} data-studio-card data-reveal>
      <div className={styles.copy} data-studio-project-copy><div><div className={styles.index}><span>0{index+1}</span><span>{project.type}</span></div><h3 className={styles.name}>{project.name}</h3><p className={styles.headline}>{project.headline}</p></div><Link href={`/work/${project.slug}`} className={styles.link}>View case study <ArrowIcon/></Link></div>
      <div className={styles.media} data-studio-project-media><MediaFrame asset={resolveMedia({src:project.image,alt:project.imageAlt,width:1800,height:1200})} label={project.name} fill/><span className={styles.corner}>WD / Case study</span></div>
    </article>)}</div>
  </div></section>;
}
