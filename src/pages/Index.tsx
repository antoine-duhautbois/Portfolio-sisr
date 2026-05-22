import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Server, Network, MonitorCog, Shield, Globe, GraduationCap, MapPin, Users, Building, ChevronDown, Terminal, Cpu, HardDrive, Workflow, Newspaper, Scale, ExternalLink, Loader2, Rss, Mail, Linkedin, Github, Send, Menu, X, Code, Database, Lock, Wifi, Monitor, Settings, FileText, Construction, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import heroBg from "@/assets/hero-bg.jpg";


import ParticleGrid from "@/components/ParticleGrid";
import XlsxViewer from "@/components/XlsxViewer";
import AnimatedCounter from "@/components/AnimatedCounter";
import TypingText from "@/components/TypingText";
import GlitchText from "@/components/GlitchText";
import DocGestionInterne from "@/pages/DocGestionInterne";
import DocToolbox from "@/pages/DocToolbox";
import DocGuacamole from "@/pages/DocGuacamole";
import DocHaproxy from "@/pages/DocHaproxy";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" as const, stiffness: 100 },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const NAV_ITEMS = ["À propos", "Parcours", "Compétences", "Entreprise", "Projets", "Veille", "Avenir", "Contact"];

const normalizeId = (s: string) =>
  s.toLowerCase().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Navbar = () => {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(13,17,23,0)", "rgba(13,17,23,0.95)"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (item: string) => {
    const id = normalizeId(item);
    window.dispatchEvent(new CustomEvent("closedoc"));
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: navBg }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.span
            className="font-mono text-primary font-bold text-lg"
            whileHover={{ scale: 1.1, textShadow: "0 0 15px hsl(180 65% 50% / 0.8)" }}
          >
            {"<"}AD{" />"}
          </motion.span>
          <div className="hidden md:flex gap-6 font-mono text-sm">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                className="text-muted-foreground hover:text-primary transition-colors relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => scrollTo(item)}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
          <motion.button
            className="md:hidden text-primary"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                className="font-mono text-xl text-muted-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(item)}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const [cvOpen, setCvOpen] = useState(false);
  const [syntheseOpen, setSyntheseOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})`, y: bgY }}
        />
        <div className="absolute inset-0 bg-background/60" />
        <ParticleGrid />
        <motion.div
          className="relative z-10 text-center px-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          style={{ y: textY, opacity }}
        >
          <motion.p variants={fadeUp} className="font-mono text-primary text-sm mb-4 tracking-widest uppercase">
            <TypingText text="BTS SIO — Option SISR" speed={50} />
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-4 glow-text text-foreground">
            <GlitchText text="Antoine Duhautbois" />
          </motion.h1>
          <motion.p variants={fadeUp} className="font-mono text-muted-foreground text-lg mb-2">
            Parcours professionnel — Épreuve E5
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-3 font-mono text-sm text-primary">
            <Terminal className="w-4 h-4" />
            <span>Solutions d'Infrastructure, Systèmes et Réseaux</span>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <motion.button
              onClick={() => setCvOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(180 65% 50% / 0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText className="w-4 h-4" />
              Mon CV
            </motion.button>
            <motion.button
              onClick={() => setSyntheseOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(180 65% 50% / 0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText className="w-4 h-4" />
              Tableau de synthèse
            </motion.button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8">
            <a href="#a-propos">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <ChevronDown className="w-6 h-6 text-primary mx-auto" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Dialog open={cvOpen} onOpenChange={setCvOpen}>
        <DialogContent className="max-w-6xl w-[98vw] h-[95vh] flex flex-col p-0 bg-background border-primary/30 overflow-hidden">
          <DialogHeader className="px-4 pt-4 pb-2 shrink-0 flex flex-row items-center justify-between">
            <DialogTitle className="font-mono text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Mon CV
            </DialogTitle>
            <a
              href="/cv.pdf"
              download="CV_Antoine_Duhautbois.pdf"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/50 bg-primary/10 font-mono text-xs text-primary hover:bg-primary/20 transition-colors mr-8"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Télécharger
            </a>
          </DialogHeader>
          <div className="flex-1 min-h-0 px-4 pb-4 pt-2">
            <iframe
              src="/cv.pdf#toolbar=0"
              className="w-full h-full rounded-lg border border-border"
              title="CV Antoine Duhautbois"
              style={{ minHeight: 0 }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={syntheseOpen} onOpenChange={setSyntheseOpen}>
        <DialogContent className="max-w-6xl w-[98vw] h-[95vh] flex flex-col p-0 bg-background border-primary/30 overflow-hidden">
          <DialogHeader className="px-4 pt-4 pb-2 shrink-0 flex flex-row items-center justify-between">
            <DialogTitle className="font-mono text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Tableau de synthèse E5
            </DialogTitle>
            <a
              href="/tableau-de-synthese.pdf"
              download="Tableau_de_synthese_Antoine_Duhautbois.pdf"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/50 bg-primary/10 font-mono text-xs text-primary hover:bg-primary/20 transition-colors mr-8"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Télécharger
            </a>
          </DialogHeader>
          <div className="flex-1 min-h-0 px-4 pb-4 pt-2">
            <iframe
              src="/tableau-de-synthese.pdf#toolbar=0"
              className="w-full h-full rounded-lg border border-border"
              title="Tableau de synthèse E5"
              style={{ minHeight: 0 }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SectionTitle = ({ children, sub }: { children: string; sub?: string }) => (
  <motion.div
    className="mb-12"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeUp}
  >
    <p className="font-mono text-primary text-sm mb-2 tracking-widest">
      <TypingText text={`// ${sub || children.toLowerCase()}`} speed={30} />
    </p>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
      <GlitchText text={children} />
    </h2>
    <motion.div
      className="h-0.5 bg-primary mt-4"
      initial={{ width: 0 }}
      whileInView={{ width: 64 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </motion.div>
);

const AboutSection = () => (
  <section id="a-propos" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionTitle sub="whoami">Présentation Personnelle</SectionTitle>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {[
          { icon: Terminal, label: "Antoine Duhautbois", desc: "20 ans" },
          { icon: Building, label: "Sainte-Ursule", desc: "CaenSup à Caen" },
          { icon: Network, label: "SISR", desc: "Infrastructure, Systèmes et Réseaux" },
          { icon: Server, label: "Serenitux", desc: "Stage en entreprise" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="bg-card border border-border rounded-lg p-6 glow-border hover:border-primary/40 transition-colors group cursor-default"
            custom={i}
            variants={scaleIn}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(180 65% 50% / 0.2)" }}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <item.icon className="w-8 h-8 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(180_65%_50%/0.6)] transition-all" />
            </motion.div>
            <h3 className="font-mono font-semibold text-foreground mb-1">{item.label}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stages */}
      <motion.div
        className="mt-10 grid md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {[
          { icon: Server, label: "Stage chez Serenitux", desc: "8 semaines — Proxmox, VLANs, GLPI", weeks: 8 },
          { icon: Building, label: "Stage chez Orano", desc: "4 semaines", weeks: 4 },
        ].map((stage, i) => (
          <motion.div
            key={stage.label}
            className="bg-card border border-border rounded-lg p-5 flex items-center gap-4 glow-border hover:border-primary/40 transition-colors"
            custom={i}
            variants={fadeUp}
          >
            <stage.icon className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-mono font-semibold text-foreground text-sm">{stage.label}</h4>
              <p className="text-xs text-muted-foreground">{stage.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Counters */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 py-8 border-t border-b border-border"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <AnimatedCounter end={12} label="Semaines de stage" />
        <AnimatedCounter end={4} label="Projets réalisés" />
        <AnimatedCounter end={2} label="Années de BTS" />
        <AnimatedCounter end={8} suffix="+" label="Technologies" />
      </motion.div>
    </div>
  </section>
);

const EnterpriseSection = () => (
  <section id="entreprise" className="py-24 px-6 bg-card/50">
    <div className="max-w-6xl mx-auto">
      <SectionTitle sub="cat entreprise.md">Présentation de l'Entreprise</SectionTitle>
      <motion.div
        className="bg-card border border-border rounded-lg p-8 glow-border overflow-hidden relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInLeft}
        whileHover={{ boxShadow: "0 0 40px hsl(180 65% 50% / 0.15)" }}
      >
        {/* Animated background line */}
        <motion.div
          className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
        <div className="flex items-center gap-4 mb-6">
          <img src="https://www.serenitux.fr/i/logo.svg" alt="Logo Serenitux" className="h-12 object-contain" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Localisation", desc: "Quettehou (Manche 50)" },
            { icon: Users, title: "Effectif", desc: "3 employés" },
            { icon: MonitorCog, title: "Activité", desc: "Conseil, intégration, maintenance de solutions informatiques. Formation et vente en logiciels libres." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <motion.div whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.5 }}>
                <item.icon className="w-6 h-6 text-primary mt-1 shrink-0" />
              </motion.div>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-6 flex justify-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://serenitux.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visiter serenitux.fr
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const projectsEntreprise = [
  {
    icon: FileText,
    title: "Application de Gestion Interne",
    description: "Développement d'un outil interne pour Serenitux centralisant la gestion (fiches atelier, interventions, ventes) et affichant des statistiques. Réalisé en HTML/CSS/JS/Vite pour automatiser et uniformiser les processus.",
    items: ["Centralisation des données", "Automatisation des processus", "Professionnalisation des documents", "Travail en mode projet", "Gain de temps"],
    techs: ["HTML", "CSS", "JavaScript", "Vite"],
    doc: "/docs/gestion-interne",
  },
  {
    icon: MonitorCog,
    title: "Toolbox — Application portable",
    description: "Application portable avec interface graphique regroupant des utilitaires système Windows : synchronisation de l'heure via fr.pool.ntp.org, installation rapide d'applications (Firefox, VLC…), personnalisation Windows 11 (barre des tâches à gauche, etc.). Projet en cours de finalisation.",
    items: ["Interface graphique intuitive", "Synchronisation heure NTP", "Installation d'applications", "Personnalisation Windows 11", "Utilitaires système"],
    techs: ["C#", ".NET 8", "WPF", "Windows"],
    doc: "/docs/toolbox",
  },
];

const projectsEcole = [
  {
    icon: Lock,
    title: "Accès Distant Sécurisé (Apache Guacamole)",
    description: "Mise en place d'une solution d'accès distant sécurisé via navigateur web à l'aide d'Apache Guacamole. Implémentation Proxmox/Linux, configuration des connexions RDP/SSH et intégration de l'authentification Active Directory.",
    items: ["Accès distant sécurisé", "Virtualisation et conteneurisation (Proxmox)", "Administration réseau et système", "Gestion de l'authentification (Active Directory)"],
    techs: ["Apache Guacamole", "Proxmox", "Linux", "RDP/SSH", "Active Directory"],
    doc: "/docs/guacamole",
  },
  {
    icon: Network,
    title: "Mise en place d'HAProxy",
    description: "Mise en place d'un système de répartition de charge (load balancing) pour optimiser la disponibilité et les performances des services. Installation et configuration d'HAProxy pour distribuer le trafic entre plusieurs serveurs backend.",
    items: ["Mettre à disposition des utilisateurs un service informatique", "Gérer le patrimoine informatique", "Répondre aux incidents et aux demandes d'assistance"],
    techs: ["HAProxy", "Linux", "Load Balancing", "Haute disponibilité"],
    doc: "/docs/haproxy",
  },
];

type ProjectItem = { icon: typeof FileText; title: string; description: string; items: string[]; techs: string[]; doc?: string };
const ProjectsGrid = ({ items }: { items: ProjectItem[] }) => (
  <motion.div
    className="grid sm:grid-cols-2 gap-6"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
  >
    {items.map((project, i) => (
      <motion.div
        key={project.title}
        className="bg-card border border-border rounded-lg p-6 glow-border transition-all group relative overflow-hidden"
        custom={i}
        variants={scaleIn}
        whileHover={{ scale: 1.03, y: -8 }}
      >
        <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <motion.div whileHover={{ scale: 1.2, y: -4 }} transition={{ duration: 0.3 }}>
            <project.icon className="w-10 h-10 text-primary mb-4 group-hover:drop-shadow-[0_0_12px_hsl(180_65%_50%/0.6)] transition-all" />
          </motion.div>
          <h3 className="font-mono font-bold text-foreground mb-3 text-lg">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techs.map((tech) => (
              <span key={tech} className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {tech}
              </span>
            ))}
          </div>
          <ul className="space-y-2 mb-5">
            {project.items.map((item, j) => (
              <motion.li
                key={item}
                className="text-sm text-muted-foreground flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + j * 0.08 }}
              >
                <motion.span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" whileHover={{ scale: 2 }} />
                {item}
              </motion.li>
            ))}
          </ul>
          {(project as { doc?: string }).doc ? (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("opendoc", { detail: (project as { doc?: string }).doc }))}
              className="w-full font-mono text-xs px-4 py-2 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> Documentation →
            </button>
          ) : (
            <button
              onClick={() => toast.info("Documentation bientôt disponible.", { description: `La documentation pour "${project.title}" sera ajoutée prochainement.` })}
              className="w-full font-mono text-xs px-4 py-2 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> Documentation →
            </button>
          )}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const ProjectsSection = () => (
  <section id="projets" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionTitle sub="ls projets/">Projets</SectionTitle>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x lg:divide-border">
        <div className="lg:pr-8">
          <Briefcase className="w-6 h-6 text-primary mb-4" aria-label="Entreprise" />
          <ProjectsGrid items={projectsEntreprise} />
        </div>
        <div className="lg:pl-8">
          <GraduationCap className="w-6 h-6 text-primary mb-4" aria-label="Formation" />
          <ProjectsGrid items={projectsEcole} />
        </div>
      </div>

      {/* Projet personnel */}
      <div className="mt-16">
        <motion.p
          className="font-mono text-primary text-sm mb-2 tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {"// projet_personnel"}
        </motion.p>
        <motion.div
          className="bg-card border border-border rounded-lg p-8 glow-border relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          whileHover={{ boxShadow: "0 0 40px hsl(180 65% 50% / 0.15)" }}
        >
          {/* Scanning line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ y: [0, 300, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                <Globe className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="font-mono font-bold text-foreground text-xl">Fleur de Vie — Site vitrine</h3>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://fleurde-vie.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                Voir le site →
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-sm text-primary mb-3">Objectifs</h4>
              <ul className="space-y-2">
                {["Site vitrine responsive", "Présentation de l'activité", "Mise en valeur des services", "Premiers clients", "Communication en ligne"].map((item, j) => (
                  <motion.li
                    key={item}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm text-primary mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {["HTML", "CSS", "JavaScript", "Supabase", "Google Calendar API"].map((tech) => (
                  <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/20">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-2">
                {["Site vitrine responsive", "Formulaire de contact dynamique", "Système de prise de rendez-vous", "Hébergement & déploiement"].map((item, j) => (
                  <motion.li
                    key={item}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const VEILLE_SOURCES = {
  tech: [
    { key: "01net", name: "01net", url: "https://www.01net.com/", rssUrl: "https://www.01net.com/rss/info/flux-rss/flux-toutes-les-actualites/", items: ["Actualité informatique", "Nouveautés tech", "Matériel & logiciels", "Tendances numériques"] },
    { key: "clubic", name: "Clubic", url: "https://www.clubic.com/", rssUrl: "https://www.clubic.com/feed/news.rss", items: ["Technologie", "Innovations", "Matériel informatique", "Tests & comparatifs"] },
    { key: "developpez", name: "Developpez.com", url: "https://www.developpez.com/", rssUrl: "https://www.developpez.com/index/rss", items: ["Développement", "Systèmes & réseaux", "Sécurité", "Actualités IT"] },
  ],
  juridique: [
    { key: "", name: "Legifrance", url: "https://www.legifrance.gouv.fr/", rssUrl: "", items: ["Lois françaises", "Code du numérique", "Réglementation", "Veille législative"] },
    { key: "cnil", name: "CNIL", url: "https://www.cnil.fr/", rssUrl: "https://www.cnil.fr/fr/rss.xml", items: ["RGPD", "Protection des données", "Vie privée", "Sanctions & contrôles"] },
    { key: "clusif", name: "Clusif", url: "https://clusif.fr/", rssUrl: "https://clusif.fr/feed/", items: ["Cybersécurité", "Gestion des risques", "Bonnes pratiques SSI"] },
  ],
};

interface RSSItem {
  title: string;
  link: string;
  date: string;
}

const RSSFeed = ({ sourceKey }: { sourceKey: string }) => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sourceKey) {
      setLoading(false);
      return;
    }
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetchrss?source=${sourceKey}`,
          { headers: { "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setItems(data.items || []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [sourceKey]);

  if (loading) return (
    <div className="flex items-center gap-2 text-muted-foreground text-xs py-2">
      <Loader2 className="w-3 h-3 animate-spin" /> Chargement du flux...
    </div>
  );
  if (error || items.length === 0) return null;

  const formatDateTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) + " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
    <div className="mt-3 space-y-2 border-t border-border pt-3">
      <p className="font-mono text-xs text-primary/70 flex items-center gap-1">
        <Rss className="w-3 h-3" /> Derniers articles
      </p>
      {items.slice(0, 3).map((item, i) => (
        <motion.a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs text-muted-foreground hover:text-primary transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <span className="truncate block">→ {item.title}</span>
          {item.date && (
            <span className="text-[10px] text-muted-foreground/60 ml-4">{formatDateTime(item.date)}</span>
          )}
        </motion.a>
      ))}
    </div>
  );
};

const VeilleSection = () => (
  <section id="veille" className="py-24 px-6 bg-card/50">
    <div className="max-w-6xl mx-auto">
      <SectionTitle sub="rss --feed">Veille Technologique & Juridique</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            icon: Newspaper,
            title: "Veille Technologique",
            color: "primary",
            variant: slideInLeft,
            groups: VEILLE_SOURCES.tech,
          },
          {
            icon: Scale,
            title: "Veille Juridique",
            color: "accent",
            variant: slideInRight,
            groups: VEILLE_SOURCES.juridique,
          },
        ].map((section) => (
          <motion.div
            key={section.title}
            className="bg-card border border-border rounded-lg p-6 glow-border group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={section.variant}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(180 65% 50% / 0.15)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div whileHover={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.4 }}>
                <section.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-mono font-bold text-foreground text-lg">{section.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {section.groups.map((group) => (
                <div key={group.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <a
                      href={group.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary flex items-center gap-1.5 hover:underline"
                    >
                      {group.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {group.rssUrl && (
                      <a
                        href={group.rssUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                        title={`Flux RSS ${group.name}`}
                      >
                        <Rss className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {group.items.map((s, j) => (
                      <motion.li
                        key={s}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.08 }}
                      >
                        <span className={`w-1 h-1 rounded-full ${section.color === "accent" ? "bg-accent" : "bg-primary"}`} />
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                  <RSSFeed sourceKey={group.key} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StudiesSection = () => (
  <section id="avenir" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionTitle sub="next --plan">Projet Professionnel</SectionTitle>
      <motion.div
        className="bg-card border border-border rounded-lg p-8 glow-border relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        whileHover={{ boxShadow: "0 0 40px hsl(180 65% 50% / 0.15)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <GraduationCap className="w-8 h-8 text-primary" />
          </motion.div>
          <h3 className="font-mono font-bold text-foreground text-xl">Après le BTS</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="space-y-3">
            {[
              "Intégration dans l'entreprise d'alternance actuelle",
              "Objectif : Administrateur systèmes & réseaux",
              "Montée en compétences sur le terrain",
              "Spécialisation : Linux, Docker, virtualisation, sécurité",
              "Octobre 2026 : Formation de 3 semaines chez Smartphone Académie à Caen",
            ].map((item, i) => (
              <motion.li
                key={item}
                className="text-muted-foreground flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
              >
                <Shield className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 items-start">
            {["Linux", "Docker", "Proxmox", "Virtualisation", "Sécurité", "Réseaux", "GLPI", "VLANs"].map((tag, i) => (
              <motion.span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 cursor-default"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "hsl(180 65% 50% / 0.15)",
                  boxShadow: "0 0 15px hsl(180 65% 50% / 0.3)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const TIMELINE_EVENTS = [
  { year: "2020", title: "Brevet des collèges", desc: "Obtention du diplôme national du brevet", side: "left" as const },
  { year: "2021-2022", title: "Lycée Professionnel", desc: "À Saint-Lô, en MTNE (Métiers de la Transition Numérique et Énergétique)", side: "right" as const },
  { year: "2022-2024", title: "Bac Pro RISC", desc: "À Condé-sur-Noireau, en Bac Pro RISC (Réseaux Informatiques et Systèmes Communicants)", side: "left" as const },
  { year: "2024", title: "Baccalauréat Professionnel", desc: "Obtention du Bac Pro", side: "right" as const },
  { year: "2024-2025", title: "BTS SIO — 1ère année", desc: "Option SISR — Sainte-Ursule CaenSup", side: "left" as const },
  { year: "2024-2026", title: "Alternance chez Serenitux", desc: "Alternance — Proxmox, VLANs, GLPI", side: "right" as const },
  { year: "2025-2026", title: "BTS SIO — 2ème année", desc: "Épreuve E5 — Parcours professionnel", side: "left" as const },
  { year: "Août 2026", title: "Employé chez Serenitux", desc: "Intégration en tant que salarié à partir du 20 août", side: "right" as const },
];

const TimelineItem = ({ event, index }: { event: typeof TIMELINE_EVENTS[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = event.side === "left";

  return (
    <div ref={ref} className={`flex items-center w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
      {/* Content */}
      <motion.div
        className="w-full md:w-5/12"
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <motion.div
          className="bg-card border border-border rounded-lg p-5 glow-border group cursor-default relative overflow-hidden"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px hsl(180 65% 50% / 0.2)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-mono text-primary text-xs tracking-widest">{event.year}</span>
          <h4 className="font-mono font-bold text-foreground mt-1">{event.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex w-2/12 justify-center">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
        >
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_12px_hsl(180_65%_50%/0.5)]" />
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
          />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
};

const TimelineSection = () => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section id="parcours" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionTitle sub="history --timeline">Mon Parcours</SectionTitle>
        <div ref={lineRef} className="relative space-y-8 md:space-y-12">
          {/* Vertical line */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {TIMELINE_EVENTS.map((event, i) => (
            <TimelineItem key={event.year} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};


const SKILLS = [
  { name: "Linux (Debian/Ubuntu)", level: 65, icon: Terminal, category: "Systèmes" },
  { name: "Proxmox / Virtualisation", level: 70, icon: Cpu, category: "Systèmes" },
  { name: "VLANs / Réseaux", level: 75, icon: Wifi, category: "Réseaux" },
  { name: "Docker", level: 70, icon: Database, category: "Systèmes" },
  { name: "GLPI / Gestion de parc", level: 80, icon: Monitor, category: "Outils" },
  { name: "Sécurité / Firewall", level: 65, icon: Lock, category: "Sécurité" },
  { name: "HTML/CSS/JS", level: 60, icon: Code, category: "Développement" },
  { name: "Administration serveur", level: 70, icon: Settings, category: "Systèmes" },
];

const SkillBar = ({ skill, index }: { skill: typeof SKILLS[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <skill.icon className="w-4 h-4 text-primary group-hover:drop-shadow-[0_0_6px_hsl(180_65%_50%/0.6)] transition-all" />
          <span className="font-mono text-sm text-foreground">{skill.name}</span>
        </div>
        <motion.span
          className="font-mono text-xs text-primary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.5 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
        />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground">{skill.category}</span>
    </motion.div>
  );
};

const SkillsSection = () => (
  <section id="competences" className="py-24 px-6 bg-card/50">
    <div className="max-w-6xl mx-auto">
      <SectionTitle sub="cat skills.json">Savoir faire</SectionTitle>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {SKILLS.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke("send-contact", { body: formData });
      if (error) throw error;
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du message. Réessayez plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle sub="mail --send">Contact</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <p className="text-muted-foreground leading-relaxed">
              N'hésitez pas à me contacter pour toute question sur mon parcours, mes projets ou une opportunité professionnelle.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "antoine.duhautbois@gmail.com", href: "mailto:antoine.duhautbois@gmail.com" },
                { icon: Github, label: "GitHub", value: "github.com/antoine-duhautbois", href: "https://github.com/antoine-duhautbois" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 8, boxShadow: "0 0 20px hsl(180 65% 50% / 0.15)" }}
                >
                  <item.icon className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_8px_hsl(180_65%_50%/0.6)] transition-all" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm text-foreground">{item.value}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="bg-card border border-border rounded-lg p-6 glow-border space-y-4 relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1 block">Nom</label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-muted border border-border rounded-md px-4 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-muted border border-border rounded-md px-4 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1 block">Message</label>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-muted border border-border rounded-md px-4 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder="Votre message..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={sending || sent}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-md font-mono text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sent ? (
                <>✓ Message envoyé !</>
              ) : sending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
              ) : (
                <><Send className="w-4 h-4" /> Envoyer</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <motion.p
        className="font-mono text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        © 2026 Antoine Duhautbois — BTS SIO SISR
      </motion.p>
      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: "https://github.com/antoine-duhautbois" },
          { icon: Mail, href: "mailto:contact@antoineduhautbois.fr" },
        ].map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
          >
            <item.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </div>
    </div>
  </footer>
);

const DocOverlay = () => {
  const [doc, setDoc] = useState<string | null>(null);
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setDoc(detail || "/docs/gestion-interne");
    };
    const onClose = () => setDoc(null);
    window.addEventListener("opendoc", onOpen);
    window.addEventListener("closedoc", onClose);
    return () => {
      window.removeEventListener("opendoc", onOpen);
      window.removeEventListener("closedoc", onClose);
    };
  }, []);
  useEffect(() => {
    if (doc) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [doc]);
  if (!doc) return null;
  const close = () => setDoc(null);
  return (
    <div className="fixed inset-0 z-40 bg-background overflow-y-auto pt-16">
      {doc === "/docs/toolbox" ? (
        <DocToolbox onClose={close} />
      ) : doc === "/docs/guacamole" ? (
        <DocGuacamole onClose={close} />
      ) : doc === "/docs/haproxy" ? (
        <DocHaproxy onClose={close} />
      ) : (
        <DocGestionInterne onClose={close} />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <EnterpriseSection />
      <ProjectsSection />
      <VeilleSection />
      <StudiesSection />
      <ContactSection />
      <Footer />
      <DocOverlay />
    </div>
  );
};

export default Index;
