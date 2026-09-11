import Image from "next/image";
import { ArrowIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { assets } from "@/data/assets";
import styles from "./Footer.module.css";
const services = [["Web & Conversion","/services/web-conversion"],["SEO","/services/seo"],["Paid Acquisition","/services/paid-acquisition"],["Growth Infrastructure","/services/growth-infrastructure"]];

function SocialIcon({ name }: { name: string }) {
  if (name === "LinkedIn") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5.5" cy="5.5" r="2"/><path d="M3.75 9h3.5v11h-3.5zM10 9h3.35v1.5c.9-1.16 2.12-1.85 3.66-1.85 2.84 0 4.24 1.72 4.24 5.06V20h-3.5v-5.83c0-1.68-.6-2.52-1.8-2.52-1.55 0-2.45 1.06-2.45 3.08V20H10z"/></svg>;
  }
  if (name === "Instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className={styles.filledDot}/></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.1 7.1a2.8 2.8 0 0 0-2-2C17.3 4.6 12 4.6 12 4.6s-5.3 0-7.1.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.4 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.1.5 7.1.5s5.3 0 7.1-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9Z"/><path d="m10 15.4 5-3.4-5-3.4Z" className={styles.playMark}/></svg>;
}

export function Footer() {
  return <footer className={styles.footer} data-studio-footer><div className="container">
    <div className={styles.top}><h2 className={styles.title}>Make the next move.<span>Make it count.</span></h2><Link href="/contact" className={styles.arrow} aria-label="Start a project"><ArrowIcon/></Link></div>
    <div className={styles.grid}>
      <div className={styles.brand}><Link href="/" className={styles.identity} aria-label="WD Marketing home"><Image src={assets.brand.logo.src} alt="" width={assets.brand.logo.width} height={assets.brand.logo.height}/><span><strong>WD Marketing</strong><small>Digital Growth Systems</small></span></Link><p>{site.description}</p><a className={styles.email} href={`mailto:${site.email}`}>{site.email}</a></div>
      <nav className={styles.column} aria-label="Footer explore"><span className={styles.label}>Explore</span>{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <nav className={styles.column} aria-label="Footer services"><span className={styles.label}>Capabilities</span>{services.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <div className={styles.column}><span className={styles.label}>Connect</span><Link href="/contact">Start a project</Link><a href={`mailto:${site.email}`}>Email</a><div className={styles.socials} aria-label="WD Marketing social profiles">{site.socialProfiles.map(profile => <a key={profile.name} className={styles.socialLink} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={`WD Marketing on ${profile.name}`}><SocialIcon name={profile.name}/><span>{profile.name}</span></a>)}</div><span className={styles.location}>{site.location}</span></div>
    </div>
    <div className={styles.bottom}><span>© {new Date().getFullYear()} WD Marketing</span><span>Strategy · Build · Acquire · Measure</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
  </div></footer>;
}
