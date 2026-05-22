import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import toolboxPcSpecs from "@/assets/toolbox-pc-specs.png";
import toolboxPersonnalisation from "@/assets/toolbox-personnalisation.png";
import toolboxNettoyage from "@/assets/toolbox-nettoyage.png";
import toolboxApplications from "@/assets/toolbox-applications.png";
import toolboxFirefox from "@/assets/toolbox-firefox.png";

const Screenshot = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <figure className="my-5 border border-border rounded-lg overflow-hidden bg-card">
    <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    <figcaption className="px-4 py-2 text-xs font-mono text-muted-foreground border-t border-border bg-background/50">
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
  ["01", "contexte", "Contexte du projet"],
  ["02", "analyse", "Analyse de l'existant et expression du besoin"],
  ["03", "solution", "Solution retenue et justification des choix"],
  ["04", "architecture", "Architecture technique de la solution"],
  ["05", "organisation", "Organisation et conduite du projet"],
  ["06", "deploiement", "Mise en œuvre et déploiement"],
  ["07", "securite", "Sécurité, droits d'accès et exécution"],
  ["08", "tests", "Tests et recette"],
  ["09", "maintenance", "Documentation utilisateur et maintenance"],
  ["10", "bilan", "Bilan, compétences mobilisées et perspectives"],
  ["11", "annexes", "Annexes"],
];

const DocToolbox = ({ onClose }: { onClose?: () => void } = {}) => {
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
            ~/serenitux/docs $ cat toolbox-serenitux.md
          </span>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Hero */}
        <p className="font-mono text-xs text-primary/60 mb-3">$ ./documentation --project=toolbox</p>
        <h1 className="font-mono font-bold text-3xl md:text-5xl text-primary leading-tight mb-2">
          Documentation
        </h1>
        <p className="font-mono font-bold text-2xl md:text-4xl text-foreground/90 mb-4">
          ToolBox Serenitux
        </p>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Outil interne de maintenance et de déploiement Windows pour techniciens IT — BTS SIO SISR · Épreuve E5.
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
        <Section id="contexte" num="01" title="Contexte du projet">
          <Sub>1.1 — Mon positionnement</Sub>
          <p>
            En tant qu'apprenti BTS SIO option SISR, j'interviens sur l'ensemble de l'infrastructure
            informatique : poste de travail, serveur de fichiers (NAS), réseau local, et production
            d'outils internes pour fluidifier le travail des techniciens. L'équipe technique compte
            trois techniciens (Antoine, Erwan, Laurent), amenés à intervenir sur des dizaines de
            postes Windows par semaine en reconditionnement et en intervention chez le client.
          </p>

          <Sub>1.2 — Origine du projet</Sub>
          <p>
            L'idée d'industrialiser les tâches récurrentes de maintenance et de déploiement Windows
            est venue de moi, après avoir constaté au quotidien le temps perdu à répéter manuellement
            les mêmes opérations sur chaque poste : nettoyage des fichiers temporaires, installation
            de Firefox/VLC/LibreOffice/Acrobat Reader, application d'un fond d'écran d'entreprise,
            modification de réglages Windows, déploiement d'un profil Firefox configuré. J'ai proposé
            la démarche à mon tuteur, qui l'a validée, puis j'ai pris en charge la conception et le
            développement complets de l'application objet de la présente documentation.
          </p>

          <Sub>1.3 — Situation avant le projet</Sub>
          <p>
            Avant le projet, les techniciens effectuaient chacune des opérations à la main, en ouvrant
            les paramètres Windows, en téléchargeant individuellement chaque application depuis son
            site officiel et en lançant les installeurs un par un. Ce fonctionnement présentait
            plusieurs problèmes :
          </p>
          <Bullets
            items={[
              "Temps perdu considérable sur des tâches répétitives (15 à 30 min par poste reconditionné).",
              "Hétérogénéité des configurations livrées au client selon le technicien.",
              "Oublis fréquents (réglage non appliqué, application non installée).",
              "Difficulté à former un nouveau technicien sur la procédure complète.",
              "Pas de standardisation du fond d'écran et de l'identité visuelle Serenitux sur les postes livrés.",
            ]}
          />
        </Section>

        {/* 02 */}
        <Section id="analyse" num="02" title="Analyse de l'existant et expression du besoin">
          <Sub>2.1 — Audit de l'existant</Sub>
          <Tbl
            headers={["Élément", "Constat"]}
            rows={[
              ["Nettoyage Windows", <>Manuel via <Mono>Paramètres &gt; Stockage</Mono>, ou <Mono>cleanmgr</Mono> lancé à la main.</>],
              ["Installation d'apps", "Téléchargement et installation un par un, depuis le site de chaque éditeur."],
              ["Réglages Windows", "Manipulés à la souris dans les Paramètres, parfois oubliés."],
              ["Fond d'écran d'entreprise", "Appliqué à la main, parfois oublié."],
              ["Profil Firefox configuré", "Recréé manuellement à chaque poste."],
              ["Inventaire matériel", "Aucune lecture automatique, infos copiées à la main."],
            ]}
          />

          <Sub>2.2 — Besoins exprimés par les techniciens</Sub>
          <Bullets
            items={[
              "Une seule application à lancer pour enchaîner les opérations standard d'un reconditionnement.",
              "Lecture automatique des caractéristiques matérielles (CPU, RAM, GPU, disques, OS).",
              "Installation silencieuse des applications usuelles (Firefox, VLC, LibreOffice, Acrobat Reader).",
              "Application en un clic du fond d'écran et du profil Firefox Serenitux.",
              "Réglages Windows fréquents (barre des tâches, NTP, etc.) appliqués automatiquement.",
              "Application portable (clé USB / partage), aucune installation requise sur les postes clients.",
            ]}
          />

          <Sub>2.3 — Cahier des charges synthétique</Sub>
          <Tbl
            headers={["Type", "Exigence"]}
            rows={[
              ["Fonctionnel", "Lecture automatique des spécifications matérielles via WMI."],
              ["Fonctionnel", "Nettoyage Windows scripté (temp, cache, corbeille, WinSxS)."],
              ["Fonctionnel", "Installation silencieuse d'un set d'applications standard."],
              ["Fonctionnel", "Application du fond d'écran et déploiement du profil Firefox."],
              ["Fonctionnel", "Tweaks Windows (barre des tâches alignée à gauche, serveur NTP, etc.)."],
              ["Fonctionnel", "Export texte des specs PC pour archivage."],
              ["Technique", "Compatible Windows 10 et Windows 11 (x64)."],
              ["Technique", "Exécutable portable (single-file), aucune installation."],
              ["Sécurité", "Élévation administrateur uniquement pour les opérations qui le requièrent."],
              ["Maintenance", "Profil Firefox et fond d'écran modifiables sans recompiler."],
            ]}
          />
        </Section>

        {/* 03 */}
        <Section id="solution" num="03" title="Solution retenue et justification des choix">
          <Sub>3.1 — Pourquoi une application Windows native ?</Sub>
          <p>
            La question initiale : application web hébergée sur le NAS, ou application Windows native
            exécutable depuis une clé USB ? J'ai opté pour la solution native pour plusieurs raisons
            concrètes :
          </p>
          <Bullets
            items={[
              <><b className="text-foreground">Accès matériel et système</b> — WMI, registre, services Windows ne sont pas accessibles depuis un navigateur.</>,
              <><b className="text-foreground">Lancement d'installeurs et UAC</b> — l'élévation administrateur ponctuelle nécessite un binaire local.</>,
              <><b className="text-foreground">Fonctionnement hors LAN</b> — la toolbox est utilisée chez le client, sans accès au NAS Serenitux.</>,
              <><b className="text-foreground">Performance et UX</b> — interface réactive, pas de latence réseau.</>,
              <><b className="text-foreground">Distribution simple</b> — un seul .exe portable, exécuté depuis une clé USB ou un partage.</>,
            ]}
          />

          <Sub>3.2 — Choix techniques détaillés</Sub>
          <Tbl
            headers={["Couche", "Technologie", "Justification"]}
            rows={[
              ["Langage / runtime", ".NET 8 (C#)", "Stack Microsoft moderne, support long terme, perf native."],
              ["UI", "WPF + XAML", "Interface Windows pro, séparation MVVM, riche en contrôles."],
              ["Architecture", "MVVM", "Séparation Vue / ViewModel / Services, code testable et maintenable."],
              ["Inventaire matériel", "WMI (System.Management)", "API Windows officielle, complète et stable."],
              ["Tweaks système", "Registre + PowerShell", "Couvre l'ensemble des réglages cibles."],
              ["Installations silencieuses", "Téléchargement HTTP + args silencieux", "Reproductible, pas de clic utilisateur."],
              ["Distribution", "PublishSingleFile self-contained", "Un .exe portable, aucune dépendance à installer."],
            ]}
          />

          <Sub>3.3 — Alternatives écartées</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">Application web</b> — incapable d'accéder au matériel, au registre et de lancer des installeurs élevés.</>,
              <><b className="text-foreground">PowerShell + XAML</b> — très léger, mais difficile à structurer et à maintenir au-delà de quelques centaines de lignes, pas de vrai MVVM.</>,
              <><b className="text-foreground">WinForms</b> — moins moderne, moins de souplesse de mise en page que WPF.</>,
            ]}
          />
          <p>
            C# WPF coche toutes les cases : performance native, interface professionnelle, exécutable
            portable autonome, intégration parfaite avec Windows.
          </p>
        </Section>

        {/* 04 */}
        <Section id="architecture" num="04" title="Architecture technique de la solution">
          <Sub>4.1 — Schéma général</Sub>
          <Code>{`+--------------------------------------------------------------+
|                POSTE TECHNICIEN / POSTE CLIENT               |
|                                                              |
|     [ Cle USB ]  --->  SerenituxToolbox.exe  (~150 Mo)       |
|                              |                               |
|                              v                               |
|              +-------------------------------+               |
|              |     Interface WPF (MVVM)      |               |
|              |  Onglets : Specs / Apps /     |               |
|              |  Tweaks / Nettoyage / Profil  |               |
|              +-------------------------------+               |
|                              |                               |
|        +---------------------+----------------------+        |
|        |                     |                      |        |
|        v                     v                      v        |
|   +---------+         +-------------+        +-----------+   |
|   |   WMI   |         |  Registre   |        |  PowerShell|  |
|   | (specs) |         | (tweaks UI) |        | (elev. UAC)|  |
|   +---------+         +-------------+        +-----------+   |
|        |                     |                      |        |
|        +---------------------+----------------------+        |
|                              |                               |
|                              v                               |
|                +-------------------------+                   |
|                |  Assets/  (modifiables) |                   |
|                |  - wallpaper.png        |                   |
|                |  - logo.svg             |                   |
|                |  - FirefoxProfile/      |                   |
|                +-------------------------+                   |
|                              |                               |
|                              v HTTPS                         |
|                  Internet : telechargement                   |
|                  des installeurs (Firefox,                   |
|                  VLC, LibreOffice, Acrobat)                  |
+--------------------------------------------------------------+`}</Code>

          <Sub>4.2 — Arborescence du projet</Sub>
          <Code>{`SerenituxToolbox/
├── App.xaml / App.xaml.cs        point d'entrée WPF
├── MainWindow.xaml / .cs         fenêtre principale, onglets
├── Views/                        vues XAML par module
├── ViewModels/                   logique de présentation (MVVM)
├── Services/
│   ├── HardwareInfo.cs           lecture WMI (CPU, RAM, GPU…)
│   ├── Cleaner.cs                nettoyage temp / WinSxS / corbeille
│   ├── Installer.cs              téléchargement + install silencieuse
│   ├── Tweaks.cs                 réglages Windows (registre, NTP…)
│   ├── Wallpaper.cs              application du fond d'écran
│   └── FirefoxProfile.cs         déploiement du profil Firefox
├── Assets/
│   ├── wallpaper.png             fond d'écran Serenitux
│   ├── logo.svg                  logo affiché en haut
│   └── FirefoxProfile/           prefs.js, user.js, extensions/, …
├── BUILD.bat                     compilation portable
└── publish/                      sortie : SerenituxToolbox.exe`}</Code>

          <Sub>4.3 — Modules fonctionnels</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">PC Specs</b> — lecture WMI, affichage CPU, RAM (slots/type/fréq.), GPU, disques, OS, uptime ; export texte.</>,
              <><b className="text-foreground">Apps</b> — installation silencieuse de Firefox, VLC, LibreOffice, Acrobat Reader.</>,
              <><b className="text-foreground">Tweaks Windows</b> — barre des tâches à gauche, serveur NTP <Mono>fr.pool.ntp.org</Mono>, autres réglages.</>,
              <><b className="text-foreground">Nettoyage</b> — fichiers temporaires, cache, corbeille (API native), WinSxS.</>,
              <><b className="text-foreground">Personnalisation</b> — fond d'écran Serenitux, déploiement du profil Firefox configuré.</>,
            ]}
          />

          <Sub>4.4 — Sources d'information système (WMI)</Sub>
          <Tbl
            headers={["Source WMI", "Utilisation dans l'app"]}
            rows={[
              [<Mono>Win32_OperatingSystem</Mono>, "Nom OS, version, RAM totale, uptime"],
              [<Mono>Win32_Processor</Mono>, "Nom CPU, cœurs, threads, fréquence"],
              [<Mono>Win32_PhysicalMemory</Mono>, "Barrettes RAM (capacité, type DDR4/DDR5, fréquence)"],
              [<Mono>Win32_PhysicalMemoryArray</Mono>, "Nombre total de slots RAM"],
              [<Mono>Win32_VideoController</Mono>, "Carte graphique"],
              [<Mono>Win32_DiskDrive</Mono>, "Disques physiques (modèle, taille, type)"],
            ]}
          />

          <Sub>4.5 — Élévation UAC et redirection de sortie</Sub>
          <p>
            Pour les opérations qui requièrent les droits administrateur, l'application génère un script
            <Mono>.bat</Mono> temporaire et le lance avec <Mono>Verb = "runas"</Mono>, ce qui déclenche
            une popup UAC ponctuelle. La sortie est redirigée vers un fichier <Mono>.log</Mono> temporaire,
            lu et affiché ensuite dans le terminal de l'app. Cette approche permet de combiner élévation
            admin et redirection de sortie, ce qui n'est pas possible directement en C# avec
            <Mono>UseShellExecute = false</Mono> et <Mono>Verb = "runas"</Mono> simultanément.
          </p>
        </Section>

        {/* 05 */}
        <Section id="organisation" num="05" title="Organisation et conduite du projet">
          <Sub>5.1 — Phases du projet</Sub>
          <Tbl
            headers={["#", "Phase", "Livrable / Travail effectué"]}
            rows={[
              ["1", "Recueil du besoin", "Échanges avec les techniciens, identification des tâches répétitives"],
              ["2", "Étude technique", "Choix .NET 8 / WPF / MVVM, validation par le tuteur"],
              ["3", "Maquettage UI", "Découpage en onglets, ergonomie, design Serenitux"],
              ["4", "Développement Services", "HardwareInfo, Cleaner, Installer, Tweaks, Wallpaper, FirefoxProfile"],
              ["5", "Développement UI", "Vues XAML, ViewModels, bindings"],
              ["6", "Compilation portable", "BUILD.bat, single-file self-contained"],
              ["7", "Tests", "Tests fonctionnels sur Windows 10 / 11"],
              ["8", "Recette", "Validation par les techniciens, ajustements"],
              ["9", "Maintenance", "Corrections, ajout d'apps, évolutions"],
            ]}
          />

          <Sub>5.2 — Outils utilisés</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">Visual Studio 2022</b> — IDE principal, débogage WPF.</>,
              <><b className="text-foreground">.NET 8 SDK</b> — compilation, publication portable.</>,
              <><b className="text-foreground">Sauvegardes locales versionnées</b> du code source sur le poste de développement.</>,
              <><b className="text-foreground">VM Windows 10 / 11</b> — tests d'install et de tweaks dans un environnement propre.</>,
            ]}
          />

          <Sub>5.3 — Méthode de travail</Sub>
          <p>
            Cycles courts : une fonctionnalité = un développement = un test en VM = validation. Chaque
            module a été développé isolément dans la couche Services avant d'être branché à l'UI via
            son ViewModel, ce qui a permis de tester chaque opération système indépendamment.
          </p>
        </Section>

        {/* 06 */}
        <Section id="deploiement" num="06" title="Mise en œuvre et déploiement">
          <Sub>6.1 — Compilation portable</Sub>
          <p>
            Un fichier <Mono>BUILD.bat</Mono> à la racine du projet automatise la compilation :
          </p>
          <Code>{`dotnet restore
dotnet build -c Release
dotnet publish -c Release -r win-x64 ^
  --self-contained true ^
  -p:PublishSingleFile=true ^
  -p:IncludeNativeLibrariesForSelfExtract=true ^
  -o .\\publish`}</Code>
          <p>
            Résultat : <Mono>.\publish\SerenituxToolbox.exe</Mono> (~150 Mo) — un seul fichier portable,
            embarquant le runtime .NET, exécutable sans installation.
          </p>

          <Sub>6.2 — Distribution aux techniciens</Sub>
          <Bullets
            items={[
              "Copie du .exe sur les clés USB techniciens.",
              "Copie également sur un partage interne Serenitux pour les postes en atelier.",
              "Instructions de mise à jour : remplacer simplement l'exe par la nouvelle version.",
            ]}
          />

          <Sub>6.3 — Ressources externalisées (modifiables sans recompiler)</Sub>
          <p>Trois éléments de l'application sont prévus pour être modifiés sans recompiler :</p>
          <Bullets
            items={[
              <><Mono>Assets/wallpaper.png</Mono> — le fond d'écran appliqué par le bouton « Fond d'écran Serenitux ».</>,
              <><Mono>Assets/logo.svg</Mono> — le logo affiché en haut de l'application.</>,
              <><Mono>Assets/FirefoxProfile/</Mono> — le profil Firefox déployé (<Mono>prefs.js</Mono>, <Mono>user.js</Mono>, <Mono>extensions/</Mono>, <Mono>bookmarkbackups/</Mono>, …).</>,
            ]}
          />
        </Section>

        {/* 07 */}
        <Section id="securite" num="07" title="Sécurité, droits d'accès et exécution">
          <Sub>7.1 — Modèle d'exécution</Sub>
          <p>
            L'application est conçue pour fonctionner en utilisateur standard par défaut, et ne demande
            l'élévation administrateur que ponctuellement, au moment où une opération précise le
            requiert. Chaque demande d'élévation est explicite (popup UAC visible) et l'utilisateur
            peut refuser.
          </p>

          <Sub>7.2 — Opérations en utilisateur standard</Sub>
          <Bullets
            items={[
              "Lecture WMI (matériel).",
              "Lecture du registre (informations système).",
              "Application du fond d'écran sur le profil courant.",
              "Déploiement du profil Firefox dans %APPDATA% de l'utilisateur courant.",
            ]}
          />

          <Sub>7.3 — Opérations nécessitant l'élévation</Sub>
          <Bullets
            items={[
              "Installation d'applications (Firefox, VLC, LibreOffice, Acrobat Reader).",
              "Modification de réglages globaux du registre (NTP, barre des tâches…).",
              "Nettoyage WinSxS, vidage corbeille système.",
            ]}
          />

          <Sub>7.4 — Hygiène d'exécution</Sub>
          <Bullets
            items={[
              "Téléchargement des installeurs en HTTPS depuis les sites officiels uniquement.",
              "Vérification que le fichier téléchargé existe et n'est pas vide (taille > 1 Ko) avant exécution.",
              <>Suppression des scripts <Mono>.bat</Mono> et fichiers <Mono>.log</Mono> temporaires après exécution.</>,
              "Affichage des opérations en cours dans un terminal intégré, pas d'action silencieuse cachée.",
            ]}
          />

          <Sub>7.5 — Validation des fichiers téléchargés</Sub>
          <p>
            Avant de lancer un installeur téléchargé, l'application vérifie que le fichier existe bien et
            n'est pas vide. Si le téléchargement a échoué ou produit un fichier corrompu, un message
            d'erreur clair est affiché avec l'URL incriminée, plutôt que de tenter de lancer un exe
            inexistant.
          </p>
        </Section>

        {/* 08 */}
        <Section id="tests" num="08" title="Tests et recette">
          <Sub>8.1 — Tests fonctionnels</Sub>
          <Tbl
            headers={["Cas testé", "Résultat attendu / observé", "OK"]}
            rows={[
              ["Lecture des specs PC (WMI)", "Toutes les sections remplies", "✓"],
              ["Export des specs en .txt", "Fichier généré, lisible", "✓"],
              ["Installation Firefox silencieuse", "Firefox installé sans clic utilisateur", "✓"],
              ["Installation VLC / LibreOffice / Acrobat", "Installations silencieuses OK", "✓"],
              ["Application du fond d'écran", "Fond d'écran appliqué immédiatement", "✓"],
              ["Déploiement profil Firefox", "Profil default-release peuplé correctement", "✓"],
              ["Tweak NTP fr.pool.ntp.org", "Service Windows Time reconfiguré", "✓"],
              ["Vidage corbeille", "Corbeille vidée pour tous les volumes", "✓"],
              ["Refus UAC", "Opération annulée proprement, message clair", "✓"],
            ]}
          />

          <Sub>8.2 — Recette utilisateur</Sub>
          <p>
            Tests en condition réelle avec les trois techniciens sur des postes neufs et des postes en
            reconditionnement. Ajustements issus de la recette :
          </p>
          <Bullets
            items={[
              <>Correction du serveur NTP : passage de <Mono>time.windows.com</Mono> à <Mono>fr.pool.ntp.org</Mono> sur demande.</>,
              "Suppression de la fonctionnalité « Épinglage Windows Defender » jugée non pertinente.",
              <>Détection correcte du profil Firefox <Mono>default-release</Mono> au lieu du profil <Mono>.default</Mono> obsolète.</>,
              <>Vidage corbeille via API native <Mono>SHEmptyRecycleBin</Mono> au lieu de <Mono>rd /s /q</Mono> (qui vidait la mauvaise corbeille).</>,
            ]}
          />
        </Section>

        {/* 09 */}
        <Section id="maintenance" num="09" title="Documentation utilisateur et maintenance">
          <Sub>9.1 — Documentation utilisateur</Sub>
          <p>Une note de prise en main d'une page a été remise à chaque technicien de l'équipe. Elle couvre :</p>
          <Bullets
            items={[
              "Lancement de l'application et navigation entre les onglets.",
              "Procédure standard de reconditionnement d'un poste (ordre conseillé des opérations).",
              "Gestion des popups UAC et choix d'exécuter en admin dès le départ pour éviter les multiples confirmations.",
              "Que faire si un téléchargement d'installeur échoue (vérifier la connexion).",
            ]}
          />

          <Sub>9.2 — Documentation technique</Sub>
          <p>
            La présente documentation, complétée par le code commenté du projet, constitue la
            documentation technique. Elle permet à un futur apprenti ou au tuteur de reprendre
            l'application.
          </p>

          <Sub>9.3 — Maintenance</Sub>
          <Bullets
            items={[
              <>Les URLs de téléchargement des applications sont centralisées dans <Mono>Services/Installer.cs</Mono> et peuvent être mises à jour facilement (nouvelle version de VLC, LibreOffice, etc.).</>,
              <>Le profil Firefox et le fond d'écran sont des ressources externes dans <Mono>Assets/</Mono>, modifiables sans recompiler.</>,
              <>Le code des Tweaks Windows est isolé : ajouter un nouveau tweak revient à ajouter une méthode dans <Mono>Services/Tweaks.cs</Mono>, une Command dans le ViewModel et un Button dans la View.</>,
            ]}
          />
        </Section>

        {/* 10 */}
        <Section id="bilan" num="10" title="Bilan, compétences mobilisées et perspectives">
          <Sub>10.1 — Bilan fonctionnel</Sub>
          <Bullets
            items={[
              "Temps moyen par poste reconditionné divisé par 3 (de ~30 min à ~10 min sur les tâches couvertes par l'app).",
              "Configuration cohérente sur tous les postes livrés au client (mêmes apps, même fond d'écran, mêmes réglages).",
              "Onboarding d'un technicien simplifié : un seul exe à lancer.",
              "Inventaire matériel automatique, exportable en quelques secondes.",
            ]}
          />

          <Sub>10.2 — Compétences SISR mobilisées (référentiel E5)</Sub>
          <Tbl
            headers={["Bloc", "Compétence", "Mise en œuvre"]}
            rows={[
              ["B1", "Mettre à disposition un service informatique", "Distribution du .exe portable aux techniciens"],
              ["B1", "Réaliser tests d'intégration et d'acceptation", "Tests fonctionnels en VM + recette équipe"],
              ["B1", "Déployer un service", "Compilation portable, distribution clé USB / partage"],
              ["B1", "Accompagner les utilisateurs", "Note de prise en main, support technicien"],
              ["B2", "Organiser son développement professionnel", "Conduite de projet en alternance"],
              ["SISR", "Installer / configurer un poste client", "Tweaks Windows, installation d'apps standard"],
              ["SISR", "Disponibilité, intégrité, confidentialité", "Élévation UAC ponctuelle, HTTPS, validation des fichiers"],
              ["SISR", "Industrialiser un déploiement", "Scripts d'install silencieuse, profil Firefox standard"],
            ]}
          />

          <Sub>10.3 — Difficultés rencontrées</Sub>
          <Bullets
            items={[
              <>Combiner élévation UAC et redirection de sortie en C# — résolu via génération d'un <Mono>.bat</Mono> temporaire.</>,
              "Fichier installeur verrouillé après téléchargement — résolu par fermeture explicite des FileStream avant lancement.",
              <>Compatibilité de l'icône <Mono>.ico</Mono> référencée via URI <Mono>pack://</Mono> — résolue en déclarant en <Mono>Resource</Mono> au lieu de <Mono>Content</Mono> dans le csproj.</>,
              <>Bug WPF connu « Dll was not found » lié au <Mono>PenThreadWorker</Mono> sur machines sans écran tactile — exception ignorée silencieusement.</>,
            ]}
          />

          <Sub>10.4 — Perspectives d'évolution</Sub>
          <Bullets
            items={[
              <>Manifest d'élévation automatique au lancement (<Mono>app.manifest</Mono> avec <Mono>requestedExecutionLevel=requireAdministrator</Mono>) pour éviter les multiples popups UAC.</>,
              "Système d'auto-update : vérification d'une nouvelle version sur un partage réseau interne au démarrage.",
              "Ajout d'applications supplémentaires (TeamViewer, AnyDesk, 7-Zip, Notepad++) sur demande des techniciens.",
              "Envoi automatique des specs PC vers un système d'inventaire central (CMDB Serenitux).",
              <>Mode ligne de commande pour automatiser des tâches en script (<Mono>SerenituxToolbox.exe /clean /apps:firefox,vlc</Mono>).</>,
              "Journal d'audit local : sauvegarde dans un fichier .log des opérations effectuées sur le poste pour traçabilité.",
              "Signature de code pour éviter les avertissements SmartScreen lors de l'exécution.",
            ]}
          />
        </Section>

        {/* 11 */}
        <Section id="annexes" num="11" title="Annexes">
          <Sub>Annexe A — Captures d'écran</Sub>
          <p>Aperçu des différents modules de l'application Serenitux ToolBox v2.0.</p>
          <Screenshot src={toolboxPcSpecs} alt="Module PC Specs de la ToolBox Serenitux" caption="Fig. 1 — Module PC Specs : inventaire matériel et export .txt" />
          <Screenshot src={toolboxPersonnalisation} alt="Module Personnalisation système" caption="Fig. 2 — Module Personnalisation : NTP, Explorateur, barre des tâches et fond d'écran corporate" />
          <Screenshot src={toolboxNettoyage} alt="Module Nettoyage intelligent" caption="Fig. 3 — Module Nettoyage intelligent : Windows.old, temporaires et terminal de log" />
          <Screenshot src={toolboxApplications} alt="Module Installation d'applications" caption="Fig. 4 — Module Applications : déploiement silencieux Firefox, VLC, LibreOffice, Acrobat Reader" />
          <Screenshot src={toolboxFirefox} alt="Module Profil Firefox personnalisé" caption="Fig. 5 — Module Profil Firefox : déploiement du profil pré-configuré dans le profil utilisateur" />

          <Sub>Annexe B — Liste des applications installées</Sub>
          <Tbl
            headers={["Application", "Source / arguments d'install silencieuse"]}
            rows={[
              ["Mozilla Firefox", <>URL officielle Mozilla — args : <Mono>/S</Mono></>],
              ["VLC media player", <>URL officielle VideoLAN — args : <Mono>/L=1036 /S</Mono></>],
              ["LibreOffice", <>download.documentfoundation.org — args : <Mono>/qn /norestart</Mono></>],
              ["Adobe Acrobat Reader", <>URL Adobe officielle (DC) — args : <Mono>/sAll /msi /norestart /quiet</Mono></>],
            ]}
          />

          <Sub>Annexe C — Glossaire</Sub>
          <Tbl
            headers={["Terme", "Définition"]}
            rows={[
              ["WMI", "Windows Management Instrumentation — API d'accès aux infos système Windows."],
              ["WPF", "Windows Presentation Foundation — framework UI .NET pour Windows."],
              ["MVVM", "Model-View-ViewModel — pattern d'architecture séparant logique et UI."],
              ["UAC", "User Account Control — mécanisme Windows d'élévation des privilèges."],
              ["NTP", "Network Time Protocol — synchronisation de l'horloge sur Internet."],
              ["WinSxS", "Windows Side-by-Side — composants Windows, dossier souvent volumineux."],
              ["Single-file", "Mode de publication .NET produisant un unique exécutable."],
            ]}
          />

          <Sub>Annexe D — Compilation</Sub>
          <p>
            Le projet se compile via .NET 8 SDK et Visual Studio 2022. La commande complète :
          </p>
          <Code>{`cd SerenituxToolbox
dotnet restore
dotnet build -c Release
dotnet publish -c Release -r win-x64 ^
  --self-contained true ^
  -p:PublishSingleFile=true ^
  -p:IncludeNativeLibrariesForSelfExtract=true ^
  -o .\\publish

# Résultat : .\\publish\\SerenituxToolbox.exe (~150 Mo)`}</Code>
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
            doc-toolbox-serenitux
          </span>
        </div>
      </article>
    </div>
  );
};

export default DocToolbox;
