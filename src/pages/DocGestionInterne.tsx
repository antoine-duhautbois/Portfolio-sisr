import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import accueilImg from "@/assets/gestion-interne-accueil.png";
import atelierImg from "@/assets/gestion-interne-atelier.png";
import pdfImg from "@/assets/gestion-interne-pdf.png";
import pdfInterventionImg from "@/assets/gestion-interne-pdf-intervention.png";
import parametresImg from "@/assets/gestion-interne-parametres.png";

const Screenshot = ({ src, caption }: { src: string; caption: string }) => (
  <figure className="my-4 border border-primary/20 rounded-lg overflow-hidden bg-card">
    <img src={src} alt={caption} className="w-full h-auto block" loading="lazy" />
    <figcaption className="px-4 py-2 text-xs font-mono text-muted-foreground border-t border-primary/10 bg-background/40">
      {caption}
    </figcaption>
  </figure>
);

const Section = ({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 mb-12">
    <h2 className="font-mono font-bold text-xl md:text-2xl text-primary mb-4 flex items-baseline gap-3">
      <span className="text-primary/40">[{num}]</span>
      <span className="text-foreground">{title}</span>
    </h2>
    <div className="space-y-4 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
      {children}
    </div>
  </section>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-mono font-semibold text-base text-primary mt-6 mb-2">
    <span className="text-primary/40 mr-2">›</span>
    {children}
  </h3>
);

const Bullets = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-1.5 my-3">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3">
        <span className="text-primary mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary inline-block" />
        <span className="text-foreground/80">{it}</span>
      </li>
    ))}
  </ul>
);

const Tbl = ({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) => (
  <div className="overflow-x-auto my-4 border border-border rounded-lg">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-primary/5 border-b border-primary/30">
          {headers.map((h, i) => (
            <th key={i} className="text-left px-4 py-2 font-mono text-primary font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
            {r.map((c, j) => (
              <td key={j} className="px-4 py-2.5 align-top text-foreground/80">{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <pre className="my-4 bg-card border border-border rounded-lg p-4 text-xs md:text-sm font-mono text-primary/90 overflow-x-auto">
    <code>{children}</code>
  </pre>
);

const Mono = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[0.85em]">{children}</code>
);

const toc = [
  ["01", "presentation", "Contexte du projet"],
  ["02", "analyse", "Analyse de l'existant et expression du besoin"],
  ["03", "solution", "Solution retenue et justification des choix"],
  ["04", "architecture", "Architecture technique de la solution"],
  ["05", "organisation", "Organisation et conduite du projet"],
  ["06", "deploiement", "Mise en œuvre et déploiement sur le NAS"],
  ["07", "securite", "Sécurité, sauvegarde et droits d'accès"],
  ["08", "tests", "Tests et recette"],
  ["09", "maintenance", "Documentation utilisateur et maintenance"],
  ["10", "bilan", "Bilan, compétences mobilisées et perspectives"],
  ["11", "annexes", "Annexes"],
];

const DocGestionInterne = ({ onClose }: { onClose?: () => void } = {}) => {
  const wrapClass = onClose
    ? "bg-background text-foreground"
    : "min-h-screen bg-background text-foreground";
  const BackEl: React.ReactNode = onClose ? (
    <button
      onClick={onClose}
      className="font-mono text-xs text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      cd ../portfolio
    </button>
  ) : (
    <Link
      to="/#projets"
      className="font-mono text-xs text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      cd ../portfolio
    </Link>
  );
  return (
    <div className={wrapClass}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {BackEl}
          <span className="font-mono text-xs text-muted-foreground hidden sm:block">
            ~/serenitux/docs $ cat application-gestion-interne.md
          </span>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Hero */}
        <p className="font-mono text-xs text-primary/60 mb-3">$ ./documentation --project=serenitux</p>
        <h1 className="font-mono font-bold text-3xl md:text-5xl text-primary leading-tight mb-2">
          Documentation
        </h1>
        <p className="font-mono font-bold text-2xl md:text-4xl text-foreground/90 mb-4">
          Application de Gestion Interne
        </p>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Service interne de gestion des fiches d'atelier et d'intervention — BTS SIO SISR · Épreuve E5.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-12 p-5 bg-card border border-border rounded-lg">
          {[
            ["BTS", "SIO — option SISR"],
            ["Épreuve", "E5 · Production et fourniture de services informatiques"],
            ["Auteur", "Antoine Duhautbois"],
            ["Période", "Alternance / Apprentissage"],
          ].map(([k, v]) => (
            <div key={k} className="text-sm">
              <span className="font-mono text-primary">{k}</span>
              <span className="text-muted-foreground"> — {v}</span>
            </div>
          ))}
        </div>

        {/* Sommaire */}
        <Section id="sommaire" num="00" title="Sommaire">
          <Bullets
            items={toc.map(([n, id, t]) => (
              <a key={id} href={`#${id}`} className="text-foreground/80 hover:text-primary transition-colors">
                {n} — {t}
              </a>
            ))}
          />
        </Section>

        {/* 01 */}
        <Section id="presentation" num="01" title="Contexte du projet">
          <Sub>1.1 — Mon positionnement</Sub>
          <p>
            En tant qu'apprenti BTS SIO option SISR, j'interviens sur l'ensemble de l'infrastructure
            informatique : poste de travail, serveur de fichiers (NAS), réseau local, et production
            d'outils internes pour fluidifier le travail des techniciens. L'équipe technique compte
            trois techniciens (Antoine, Erwan, Laurent), amenés à travailler sur les mêmes machines
            et à produire les mêmes types de documents.
          </p>

          <Sub>1.2 — Origine du projet</Sub>
          <p>
            L'idée de centraliser et d'industrialiser la production des fiches d'atelier et
            d'intervention est venue de moi, après avoir constaté au quotidien les limites du
            fonctionnement existant. J'ai proposé la démarche à mon tuteur, qui l'a validée, puis
            j'ai pris en charge la conception et la mise en œuvre complète du service interne objet
            de la présente documentation.
          </p>

          <Sub>1.3 — Situation avant le projet</Sub>
          <p>
            Avant le projet, chaque fiche de reconditionnement et d'intervention était produite
            manuellement, soit sur papier, soit dans un fichier bureautique dupliqué pour chaque
            appareil. Ce fonctionnement présentait plusieurs problèmes :
          </p>
          <Bullets
            items={[
              "Données dispersées sur plusieurs postes, pas de centralisation.",
              "Statistiques d'activité impossibles à produire sans recompter à la main.",
              "Pas d'archivage cohérent des fiches générées.",
              "Risque d'erreurs de saisie, mises en forme hétérogènes selon le technicien.",
              "Impossible de retrouver rapidement une fiche pour un appareil donné.",
            ]}
          />
        </Section>

        {/* 02 */}
        <Section id="analyse" num="02" title="Analyse de l'existant et expression du besoin">
          <Sub>2.1 — Audit de l'existant</Sub>
          <Tbl
            headers={["Élément", "Constat"]}
            rows={[
              ["Production des fiches", "Manuelle, modèle bureautique dupliqué"],
              ["Stockage", "Local sur le poste du technicien qui crée la fiche"],
              ["Partage entre techniciens", "Aucun (ou copie manuelle sur clé USB)"],
              ["Statistiques", "Inexistantes, comptage manuel à la demande"],
              ["Archivage long terme", "Hétérogène, pas de convention de nommage"],
              ["Infrastructure disponible", "NAS Synology déjà en place, LAN Ethernet/Wi-Fi, postes Windows"],
            ]}
          />

          <Sub>2.2 — Besoins exprimés par les techniciens</Sub>
          <Bullets
            items={[
              "Générer rapidement une fiche atelier ou intervention propre et identique d'un technicien à l'autre.",
              "Centraliser les fiches produites pour pouvoir les retrouver plus tard.",
              "Visualiser l'activité de l'atelier (combien de PC portables reconditionnés ce mois-ci…).",
              "Outil utilisable depuis n'importe quel poste de l'atelier, sans installation lourde.",
              "Liste des intervenants, types d'appareils et prestations modifiable sans toucher au code.",
            ]}
          />

          <Sub>2.3 — Cahier des charges synthétique</Sub>
          <Tbl
            headers={["Type", "Exigence"]}
            rows={[
              ["Fonctionnel", "Génération de fiches atelier (PC, tablette, imprimante, écran)"],
              ["Fonctionnel", "Génération de fiches intervention (recherche de panne, nettoyage…)"],
              ["Fonctionnel", "Export PDF imprimable et archivable"],
              ["Fonctionnel", "Tableau de bord statistiques par mois et par type d'appareil"],
              ["Fonctionnel", "Configuration centralisée (intervenants, types, prestations)"],
              ["Technique", "Accessible par tous les postes du LAN"],
              ["Technique", "Aucune installation client (navigateur uniquement)"],
              ["Technique", "Stockage centralisé sur le NAS de l'entreprise"],
              ["Technique", "Fonctionnement en mode dégradé si le NAS est indisponible"],
              ["Sécurité", "Service uniquement accessible depuis le réseau interne"],
              ["Maintenance", "Données modifiables sans recompiler ni redéployer"],
            ]}
          />
        </Section>

        {/* 03 */}
        <Section id="solution" num="03" title="Solution retenue et justification des choix">
          <Sub>3.1 — Pourquoi une application web interne ?</Sub>
          <p>
            La question initiale : application bureautique installée poste par poste, ou application web hébergée
            sur le NAS ? J'ai opté pour la solution web interne pour les raisons suivantes :
          </p>
          <Bullets
            items={[
              <><b className="text-foreground">Aucune installation</b> sur les postes : un navigateur et l'adresse interne suffisent.</>,
              <><b className="text-foreground">Mises à jour centralisées</b> : un seul déploiement profite à toute l'équipe.</>,
              <><b className="text-foreground">Compatibilité multi-OS</b> : Windows et Linux sans recompilation.</>,
              <><b className="text-foreground">Cohérence avec l'infrastructure</b> : le NAS Synology fournit déjà HTTP via Web Station.</>,
              <><b className="text-foreground">Accès uniformisé</b> : tous les techniciens voient les mêmes données, en temps réel.</>,
            ]}
          />

          <Sub>3.2 — Choix techniques détaillés</Sub>
          <Tbl
            headers={["Couche", "Technologie", "Justification"]}
            rows={[
              ["Front-end", "HTML5 + CSS3 + JS natif", "Pas de framework lourd, code maintenable"],
              ["Génération PDF", "jsPDF + AutoTable", "Côté navigateur, PDF identique partout"],
              ["Back-end", "PHP 7+", "Pris en charge nativement par DSM"],
              ["Configuration", "Fichier JSON sur le NAS", "Lisible, sauvegardable, simple"],
              ["Stockage PDF", "Système de fichiers du NAS", "Profite des snapshots & sauvegardes"],
              ["Build (option.)", "Vite", "Build de production minifié"],
            ]}
          />

          <Sub>3.3 — Pourquoi pas une base de données ?</Sub>
          <p>
            J'ai volontairement écarté MySQL/MariaDB malgré sa présence sur le NAS. La volumétrie est faible
            (quelques dizaines de fiches par mois), les données sont peu relationnelles, et les fichiers JSON
            présentent plusieurs avantages dans ce contexte :
          </p>
          <Bullets
            items={[
              "Sauvegarde ultra simple — le fichier suit la sauvegarde du NAS.",
              "Lisibilité — config.json / stats.json ouvrables avec n'importe quel éditeur.",
              "Pas de service supplémentaire à maintenir, pas de risque de panne SGBD.",
              <>Écritures concurrentes gérées par <Mono>flock()</Mono> côté PHP.</>,
            ]}
          />
        </Section>

        {/* 04 */}
        <Section id="architecture" num="04" title="Architecture technique de la solution">
          <Sub>4.1 — Schéma général</Sub>
          <Code>{`+----------------------------------------------------------+
|                  RESEAU LOCAL ATELIER                    |
|                                                          |
|   [ Poste 1 ]      [ Poste 2 ]      [ Poste 3 ]          |
|    Antoine          Erwan            Laurent             |
|       \\               |                /                 |
|        \\______________|_______________/                  |
|                       | HTTP (LAN)                       |
|                       v                                  |
|             +----------------------+                     |
|             |    NAS  Synology     |                     |
|             |  - Web Station / PHP |                     |
|             |  - HTML / JS / CSS   |                     |
|             |  - API PHP           |                     |
|             |  - config.json       |                     |
|             |  - stats.json        |                     |
|             |  - pdf_archive/      |                     |
|             +----------------------+                     |
+----------------------------------------------------------+`}</Code>

          <Sub>4.2 — Arborescence du projet</Sub>
          <Code>{`serenitux/
├── index.html              page d'accueil
├── atelier.html            fiche reconditionnement atelier
├── intervention.html       fiche d'intervention client
├── statistiques.html       tableau de bord
├── parametres.html         configuration
├── maintenance.html        page mode maintenance
├── shared.js / app.js / intervention.js / style.css
├── api/
│   ├── config.php  stats.php  save_pdf.php  explore.php
│   └── config.json  stats.json
├── pdf_archive/
│   ├── atelier/
│   └── interventions/
└── Logo/  images/  fond/  lib/`}</Code>

          <Sub>4.3 — Modules fonctionnels</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">Fiche Atelier</b> — saisie complète d'un appareil reconditionné, génération PDF, archivage par <i>Marque - Modèle - Date</i>.</>,
              <><b className="text-foreground">Fiche Intervention</b> — prise en charge client, motif, prestations, signature.</>,
              <><b className="text-foreground">Statistiques</b> — nombre de fiches par mois et par type, partagées via stats.json.</>,
              <><b className="text-foreground">Paramètres</b> — intervenants, types d'appareils, prestations, chemins d'archive — tout modifiable sans code.</>,
            ]}
          />

          <Sub>4.4 — Les API PHP côté NAS</Sub>
          <Tbl
            headers={["Endpoint", "Méthode", "Rôle"]}
            rows={[
              [<Mono>api/config.php</Mono>, "GET", "Lit la configuration partagée"],
              [<Mono>api/config.php</Mono>, "POST", "Met à jour la configuration"],
              [<Mono>api/stats.php</Mono>, "GET", "Récupère les statistiques mensuelles"],
              [<Mono>api/stats.php</Mono>, "POST", "Incrémente le compteur du mois courant"],
              [<Mono>api/stats.php</Mono>, "DELETE", "Réinitialise les statistiques"],
              [<Mono>api/save_pdf.php</Mono>, "POST", "Reçoit et archive un PDF"],
              [<Mono>api/explore.php</Mono>, "GET/POST", "Liste, crée, supprime les dossiers d'archive"],
            ]}
          />
          <p>
            <b className="text-foreground">Écritures concurrentes :</b> les scripts PHP utilisent <Mono>flock()</Mono> pour
            obtenir un verrou exclusif avant d'écrire dans les fichiers JSON, évitant qu'une mise à jour soit
            perdue si deux techniciens valident une fiche au même instant.
          </p>

          <Sub>4.5 — Mode dégradé</Sub>
          <Bullets
            items={[
              <>Détection de disponibilité via <Mono>fetch</Mono> + <Mono>AbortController</Mono> (timeout 2 s).</>,
              <>En cas d'échec, bascule automatique sur le <b className="text-foreground">localStorage</b> du navigateur.</>,
              "Notification (toast) prévenant que le PDF n'a pas été archivé sur le NAS.",
              "Reprise normale dès que le NAS revient.",
            ]}
          />
        </Section>

        {/* 05 */}
        <Section id="organisation" num="05" title="Organisation et conduite du projet">
          <Sub>5.1 — Phases du projet</Sub>
          <Tbl
            headers={["#", "Phase", "Livrable"]}
            rows={[
              ["1", "Recueil du besoin", "Notes d'entretiens avec les techniciens"],
              ["2", "Étude technique", "Choix de la pile, validation par le tuteur"],
              ["3", "Maquettage", "Maquettes HTML statiques par page"],
              ["4", "Développement front", "Pages HTML + JS"],
              ["5", "Développement back", "API PHP, JSON, archivage PDF"],
              ["6", "Hébergement NAS", "Web Station, hôte virtuel, déploiement"],
              ["7", "Tests", "Tests fonctionnels avec les techniciens"],
              ["8", "Mise en production", "Bascule officielle"],
              ["9", "Maintenance", "Corrections, ajout de fonctionnalités"],
            ]}
          />

          <Sub>5.2 — Outils utilisés</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">VS Code</b> — extensions PHP, live-server pour les tests locaux.</>,
              <><b className="text-foreground">Vite</b> (npm run dev) — serveur de développement rapide.</>,
              <><b className="text-foreground">Sauvegardes locales versionnées</b> du code source sur le poste de développement.</>,
              <><b className="text-foreground">Échanges directs</b> avec les techniciens et le tuteur, points hebdomadaires.</>,
            ]}
          />

          <Sub>5.3 — Méthode de travail</Sub>
          <p>
            Cycles courts : une fonctionnalité = un test local = une mise en production. Chaque évolution
            est d'abord développée et testée en local sur mon poste, puis déployée sur le NAS pour validation
            par les techniciens. Ce mode itératif a permis de faire remonter rapidement les ajustements
            souhaités.
          </p>
        </Section>

        {/* 06 */}
        <Section id="deploiement" num="06" title="Mise en œuvre et déploiement sur le NAS">
          <Sub>6.1 — Préparation du NAS Synology</Sub>
          <Bullets
            items={[
              <>Activation de <b className="text-foreground">Web Station</b> depuis le Centre de paquets DSM.</>,
              <>Installation du paquet <b className="text-foreground">PHP</b> (7.x ou 8.x selon DSM).</>,
              <>Création d'un <b className="text-foreground">hôte virtuel</b> dédié pointant vers le dossier du projet.</>,
              <>Configuration des <b className="text-foreground">permissions</b> sur <Mono>pdf_archive/</Mono> pour PHP.</>,
              <>Restriction d'accès au LAN via les règles de <b className="text-foreground">pare-feu DSM</b>.</>,
            ]}
          />

          <Sub>6.2 — Déploiement de l'application</Sub>
          <p>
            L'application a été intégralement développée et testée en local sur mon poste de travail
            (serveur de développement Vite + PHP local pour les API). Une fois une version stable obtenue,
            l'ensemble des fichiers du projet (HTML, JS, CSS, scripts PHP, dossier <Mono>api/</Mono>) est
            téléversé directement sur le NAS via un partage SMB, dans le dossier servi par Web Station.
            Aucun dépôt distant ni service externe n'intervient dans la chaîne de déploiement : tout reste
            en interne.
          </p>

          <Sub>6.3 — Configuration des chemins d'archive</Sub>
          <p>
            Les chemins de stockage des PDF sont configurables depuis la page Paramètres, sans toucher au code.
            Cela a permis de déplacer l'archivage vers un volume du NAS plus volumineux sans intervention sur le
            code.
          </p>
          <Bullets
            items={[
              <>Atelier — <Mono>pdf_archive/atelier/</Mono></>,
              <>Intervention — <Mono>pdf_archive/interventions/</Mono></>,
            ]}
          />

          <Sub>6.4 — Convention de nommage des archives</Sub>
          <Code>{`Marque - Modele - JJ-MM-AAAA/
  ├── Marque - Modele - JJ-MM-AAAA.pdf
  └── images/
        └── photo_produit.jpg`}</Code>
          <p>
            Cette convention permet de retrouver rapidement une fiche dans l'explorateur Windows, même sans passer
            par l'application.
          </p>
        </Section>

        {/* 07 */}
        <Section id="securite" num="07" title="Sécurité, sauvegarde et droits d'accès">
          <Sub>7.1 — Cloisonnement réseau</Sub>
          <Bullets
            items={[
              "Pas de redirection de port HTTP de la box vers Internet pour cet hôte.",
              "Pare-feu DSM : connexions HTTP autorisées uniquement depuis 192.168.x.0/24.",
            ]}
          />

          <Sub>7.2 — Validation des entrées côté serveur</Sub>
          <Bullets
            items={[
              <><Mono>htmlspecialchars()</Mono> sur les noms écrits.</>,
              <><Mono>{`preg_replace('/[^a-zA-Z0-9._ -]/', '_', ...)`}</Mono> sur les noms de fichiers/dossiers — empêche le path traversal.</>,
              "Vérification que les dossiers cibles de suppression sont dans une zone autorisée déclarée.",
              <>Vérification du type de fichier reçu côté <Mono>save_pdf.php</Mono>.</>,
            ]}
          />

          <Sub>7.3 — Gestion des accès</Sub>
          <Bullets
            items={[
              "Authentification au niveau réseau (poste physiquement dans l'atelier).",
              "Accès SSH au NAS réservé aux comptes administrateurs.",
              "Techniciens : accès SMB métier uniquement, pas aux sources de l'application.",
              "Toute modification du code passe par moi, depuis mon poste de développement.",
            ]}
          />

          <Sub>7.4 — Sauvegarde</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">Snapshots Synology</b> quotidiens conservés sur 14 jours.</>,
              <><b className="text-foreground">Hyper Backup</b> hebdomadaire chiffré vers un disque externe déconnecté.</>,
              <>config.json, stats.json et <Mono>pdf_archive/</Mono> inclus dans les sauvegardes.</>,
            ]}
          />

          <Sub>7.5 — Mode maintenance</Sub>
          <p>
            Une page <Mono>maintenance.html</Mono> peut être basculée en place de l'index pendant les opérations
            sensibles, évitant qu'un technicien tombe sur une page cassée.
          </p>
        </Section>

        {/* 08 */}
        <Section id="tests" num="08" title="Tests et recette">
          <Sub>8.1 — Tests fonctionnels</Sub>
          <Tbl
            headers={["Cas testé", "Résultat attendu", "OK"]}
            rows={[
              ["Génération PDF atelier complet", "PDF correct, archivé sur le NAS", "✓"],
              ["Champ obligatoire vide", "Message d'erreur, pas d'enregistrement", "✓"],
              ["Caractères spéciaux dans modèle", "Caractères remplacés, dossier valide", "✓"],
              ["Deux techniciens en même temps", "Compteurs incrémentés correctement", "✓"],
              ["NAS arrêté pendant la saisie", "Bascule localStorage + toast d'erreur", "✓"],
              ["Modification d'un intervenant", "Visible sur tous les postes après refresh", "✓"],
              ["Suppression hors zone autorisée", "Refusée par explore.php", "✓"],
              ["Tentative de path traversal", "Caractères neutralisés", "✓"],
            ]}
          />

          <Sub>8.2 — Recette utilisateur</Sub>
          <p>
            Deux semaines de tests en condition réelle avec les trois techniciens. Ajustements issus de la recette :
          </p>
          <Bullets
            items={[
              "Ajout du module « Vente libre » pour les accessoires.",
              "Ajout de la photo du produit sur la fiche atelier.",
              "Affichage des logos OS (Windows, Linux Mint, Ubuntu…) sur les fiches.",
              "Mode sombre pour le confort visuel pendant les longues sessions.",
            ]}
          />

          <Sub>8.3 — Performance</Sub>
          <p>
            Site chargé en moins d'une seconde sur le LAN (quelques centaines de Ko, jsPDF étant la dépendance
            la plus lourde). Les fichiers JSON font moins de 5 Ko, leur lecture est instantanée.
          </p>
        </Section>

        {/* 09 */}
        <Section id="maintenance" num="09" title="Documentation utilisateur et maintenance">
          <Sub>9.1 — Documentation utilisateur</Sub>
          <p>Une note de prise en main d'une page a été remise à chaque technicien, couvrant :</p>
          <Bullets
            items={[
              "Comment accéder au site (adresse interne).",
              "Comment générer une fiche.",
              "Que faire si le NAS ne répond pas.",
              "Comment ajouter un nouvel intervenant ou un type d'appareil.",
            ]}
          />

          <Sub>9.2 — Documentation technique</Sub>
          <p>
            La présente documentation, complétée par le code commenté de l'application, constitue la
            documentation technique. Elle permet à un futur apprenti ou au tuteur de reprendre le projet.
          </p>

          <Sub>9.3 — Maintenance</Sub>
          <p>
            Les paramètres externalisés en JSON et modifiables depuis l'interface réduisent drastiquement les
            besoins de maintenance : la majorité des évolutions courantes (intervenant, prestation, type) ne
            demandent plus aucune intervention sur le code.
          </p>
        </Section>

        {/* 10 */}
        <Section id="bilan" num="10" title="Bilan, compétences mobilisées et perspectives">
          <Sub>10.1 — Bilan fonctionnel</Sub>
          <Bullets
            items={[
              "Plus aucune fiche papier en interne.",
              "Toutes les fiches retrouvables en quelques clics.",
              "Statistiques mensuelles consultables à tout moment.",
              "Arrivée d'un nouveau technicien sans configuration sur son poste.",
            ]}
          />

          <Sub>10.2 — Compétences SISR mobilisées (référentiel E5)</Sub>
          <Tbl
            headers={["Bloc", "Compétence", "Mise en œuvre"]}
            rows={[
              ["B1", "Mettre à disposition un service informatique", "Déploiement sur NAS, accès LAN"],
              ["B1", "Réaliser tests d'intégration et d'acceptation", "Tests fonctionnels + recette"],
              ["B1", "Déployer un service", "Web Station, hôte virtuel, permissions"],
              ["B1", "Accompagner les utilisateurs", "Note de prise en main, support"],
              ["B2", "Organiser son développement professionnel", "Conduite de projet en alternance"],
              ["SISR", "Concevoir une infrastructure réseau", "Hébergement NAS, configuration réseau"],
              ["SISR", "Installer/configurer l'infrastructure", "Web Station, PHP, hôtes virtuels, FW"],
              ["SISR", "Disponibilité, intégrité, confidentialité", "flock, sauvegardes, restriction LAN"],
            ]}
          />

          <Sub>10.3 — Difficultés rencontrées</Sub>
          <Bullets
            items={[
              <>Concurrence d'écriture sur les fichiers JSON — résolue via <Mono>flock</Mono>.</>,
              "Permissions sur le NAS — ajustement des umask / chmod pour PHP.",
              "Compatibilité PHP — code compatible PHP 5.6 sur certaines versions DSM.",
              "Maîtrise de jsPDF pour produire des PDF identiques au format demandé.",
            ]}
          />

          <Sub>10.4 — Perspectives d'évolution</Sub>
          <Bullets
            items={[
              "Authentification simple par technicien (traçabilité des fiches).",
              "Recherche full-text dans les fiches archivées.",
              "Export Excel/CSV des statistiques pour bilans annuels.",
              "HTTPS interne avec certificat auto-signé ou PKI interne.",
            ]}
          />
        </Section>

        {/* 11 */}
        <Section id="annexes" num="11" title="Annexes">
          <Sub>Annexe A — Captures d'écran</Sub>
          <Screenshot src={accueilImg} caption="Page d'accueil — accès aux modules Fiche Atelier, Fiche Intervention, Statistiques et Paramètres." />
          <Screenshot src={atelierImg} caption="Page Fiche Atelier — saisie des informations matériel et configurations avant/après reconditionnement." />
          <Screenshot src={pdfImg} caption="PDF généré (Atelier) — fiche produit et prestations imprimable au format A4." />
          <Screenshot src={pdfInterventionImg} caption="PDF généré (Intervention) — fiche de prise en charge et d'intervention imprimable au format A4." />
          <Screenshot src={parametresImg} caption="Page Paramètres — configuration des intervenants, types d'appareils, prestations et archivage NAS." />

          <Sub>Annexe B — Glossaire</Sub>
          <Tbl
            headers={["Terme", "Définition"]}
            rows={[
              ["NAS", "Network Attached Storage — serveur de stockage en réseau."],
              ["API", "Interface programmatique entre le navigateur et le serveur."],
              ["JSON", "Format texte de données structurées."],
              ["flock", "Verrou sur fichier en PHP, pour les écritures concurrentes."],
              ["localStorage", "Stockage persistant côté navigateur."],
              ["DSM", "DiskStation Manager — système d'exploitation des NAS Synology."],
              ["Web Station", "Paquet Synology fournissant un serveur web (Apache/Nginx + PHP)."],
            ]}
          />
        </Section>

        <p className="font-mono text-xs text-primary/60 mt-12">
          <span className="text-primary/40">$</span> echo "Fin du document — EOF"
        </p>

        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          {onClose ? (
            <button
              onClick={onClose}
              className="font-mono text-xs text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux projets
            </button>
          ) : (
            <Link
              to="/#projets"
              className="font-mono text-xs text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux projets
            </Link>
          )}
          <span className="font-mono text-xs text-muted-foreground inline-flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            doc-application-gestion-interne
          </span>
        </div>
      </article>
    </div>
  );
};

export default DocGestionInterne;
