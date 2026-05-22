import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import guacamoleArchi from "@/assets/guacamole-archi.png";

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
  ["01", "contexte", "Contexte et objectifs"],
  ["02", "analyse", "Analyse de l'existant et expression du besoin"],
  ["03", "solution", "Solution retenue et justification des choix"],
  ["04", "architecture", "Architecture technique"],
  ["05", "cible", "Préparation de la machine cible (Windows 10)"],
  ["06", "guacamole", "Configuration de la connexion sur Guacamole"],
  ["07", "droits", "Attribution des droits d'accès"],
  ["08", "securite", "Sécurité, NLA et bonnes pratiques"],
  ["09", "tests", "Tests et recette"],
  ["10", "bilan", "Bilan et argumentaire d'examen"],
];

const DocGuacamole = ({ onClose }: { onClose?: () => void } = {}) => {
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
            ~/gsb/docs $ cat acces-distant-guacamole.md
          </span>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Hero */}
        <p className="font-mono text-xs text-primary/60 mb-3">$ ./documentation --project=guacamole</p>
        <h1 className="font-mono font-bold text-3xl md:text-5xl text-primary leading-tight mb-2">
          Documentation
        </h1>
        <p className="font-mono font-bold text-2xl md:text-4xl text-foreground/90 mb-4">
          Accès Distant Centralisé — Apache Guacamole
        </p>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Passerelle de rebond HTTPS donnant accès aux postes Windows 10 du domaine
          <Mono>gsb.local</Mono> via un simple navigateur, avec authentification transparente.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-12 p-5 bg-card border border-border rounded-lg">
          {[
            ["BTS", "SIO — option SISR"],
            ["Contexte", "Infrastructure GSB"],
            ["Auteur", "Antoine Duhautbois"],
            ["Solution", "Apache Guacamole · RDP · Active Directory"],
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
        <Section id="contexte" num="01" title="Contexte et objectifs">
          <Sub>1.1 — Cadre du projet</Sub>
          <p>
            Ce projet a été réalisé dans le cadre de l'<span className="text-foreground font-semibold">épreuve E6 du BTS SIO</span>
            {" "}(option SISR) — épreuve professionnelle de synthèse portant sur la mise en œuvre
            d'une solution d'infrastructure répondant à un besoin client. Il s'appuie sur un scénario
            pédagogique fictif, <span className="text-foreground font-semibold">GSB (Galaxy Swiss Bourdin)</span>,
            créé par l'équipe enseignante pour servir de support aux projets de l'E6 : une entreprise
            pharmaceutique imaginaire dont l'infrastructure sert de terrain d'étude tout au long de la formation.
          </p>
          <p>
            Dans ce contexte, la direction technique de GSB souhaite permettre aux collaborateurs du domaine
            d'accéder à leurs postes de travail Windows 10 depuis n'importe quel navigateur web, sans
            installation d'un client lourd type <Mono>mstsc.exe</Mono> ni configuration manuelle au cas
            par cas. La solution doit être présentée et défendue à l'oral devant un jury professionnel.
          </p>



          <Sub>1.2 — Objectifs fonctionnels et techniques</Sub>
          <Tbl
            headers={["Axe", "Objectif"]}
            rows={[
              ["Sécurité", "Centraliser l'ensemble des flux d'accès distant sur le port 443 (HTTPS)"],
              ["Expérience utilisateur", "Authentification unique (SSO) à partir des identifiants Active Directory"],
              ["Administration", "Gérer les droits d'accès depuis une interface unique et auditable"],
              ["Maintenance", "Aucun client à déployer — tout passe par le navigateur"],
              ["Compatibilité", "Fonctionner depuis Windows, Linux, macOS, tablette"],
            ]}
          />
        </Section>

        {/* 02 */}
        <Section id="analyse" num="02" title="Analyse de l'existant et expression du besoin">
          <Sub>2.1 — Audit de l'existant</Sub>
          <Tbl
            headers={["Élément", "Constat"]}
            rows={[
              ["Accès distant", "RDP direct, port 3389 ouvert poste par poste"],
              ["Sécurité réseau", "Multiplication des règles de pare-feu sortantes / entrantes"],
              ["Authentification", "Identifiants AD ressaisis manuellement à chaque connexion"],
              ["Traçabilité", "Aucune centralisation des journaux de connexion"],
              ["Mobilité", "Impossible depuis un poste sans client RDP installé"],
            ]}
          />

          <Sub>2.2 — Besoins exprimés</Sub>
          <Bullets
            items={[
              "Un point d'entrée unique, accessible en HTTPS depuis le navigateur.",
              "Réutilisation des comptes Active Directory existants (pas de nouvel annuaire).",
              "Authentification transparente : l'utilisateur ne saisit ses identifiants qu'une fois.",
              "Gestion centralisée des autorisations par utilisateur ou par groupe LDAP.",
              "Sécurité forte : NLA obligatoire, certificat serveur, journalisation des sessions.",
            ]}
          />
        </Section>

        {/* 03 */}
        <Section id="solution" num="03" title="Solution retenue et justification des choix">
          <Sub>3.1 — Pourquoi Apache Guacamole ?</Sub>
          <p>
            Apache Guacamole est une passerelle de bureau distant <i>clientless</i> : elle traduit
            les protocoles RDP, SSH et VNC en flux HTML5 affichés directement dans le navigateur.
            C'est la brique idéale pour répondre au cahier des charges :
          </p>
          <Bullets
            items={[
              <><b className="text-foreground">Aucun client</b> à installer sur les postes utilisateurs — un navigateur moderne suffit.</>,
              <><b className="text-foreground">Centralisation HTTPS</b> : un seul port (443) à exposer, plus aucun 3389 sortant.</>,
              <><b className="text-foreground">Open source</b>, projet Apache mature, large communauté.</>,
              <><b className="text-foreground">Intégration LDAP / Active Directory</b> native pour le SSO.</>,
              <><b className="text-foreground">Jetons de paramètres</b> (<Mono>${'$'}{'{'}GUAC_USERNAME{'}'}</Mono> / <Mono>${'$'}{'{'}GUAC_PASSWORD{'}'}</Mono>) pour relayer les identifiants au protocole RDP sans nouvelle saisie.</>,
            ]}
          />

          <Sub>3.2 — Comparatif des solutions étudiées</Sub>
          <Tbl
            headers={["Solution", "Avantages", "Limites"]}
            rows={[
              ["RDP direct (port 3389)", "Natif Windows, simple", "Port exposé, pas de SSO web, audit limité"],
              ["VPN + RDP", "Réseau étendu transparent", "Client VPN à déployer, pas de portail web"],
              ["Microsoft RD Gateway", "Intégration AD native", "Licences CAL, client RDP requis"],
              ["Apache Guacamole", "Web HTML5, SSO, open source, centralisation", "Mise en place initiale plus technique"],
            ]}
          />
        </Section>

        {/* 04 */}
        <Section id="architecture" num="04" title="Architecture technique">
          <Sub>4.1 — Schéma général</Sub>
          <figure className="my-4 border border-border rounded-lg overflow-hidden bg-background">
            <img
              src={guacamoleArchi}
              alt="Architecture logique de la passerelle Guacamole avec Active Directory (LDAP)"
              className="w-full h-auto"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 text-xs font-mono text-muted-foreground border-t border-border bg-primary/5">
              Architecture logique — Passerelle d'accès distant sécurisée (Apache Guacamole &amp; Active Directory)
            </figcaption>
          </figure>

          <Sub>4.2 — Composants logiciels</Sub>
          <Tbl
            headers={["Composant", "Rôle"]}
            rows={[
              [<Mono>guacamole</Mono>, "Application web Java (Tomcat) — interface, authentification, gestion des connexions"],
              [<Mono>guacd</Mono>, "Démon proxy : traduit RDP/SSH/VNC en flux WebSocket pour le navigateur"],
              ["Active Directory", "Annuaire d'authentification — domaine gsb.local"],
              ["Reverse proxy HTTPS", "Termine TLS sur le port 443 et redirige vers Tomcat"],
            ]}
          />

          <Sub>4.3 — Flux réseau</Sub>
          <Bullets
            items={[
              <>Utilisateur → Passerelle : <Mono>HTTPS / 443</Mono> (chiffré, exposable).</>,
              <>Passerelle → AD : <Mono>LDAP(S) / 389-636</Mono>, bind du compte de service.</>,
              <>Passerelle → Poste cible : <Mono>RDP / 3389</Mono>, strictement interne (vmbr1).</>,
              <>Aucun port RDP n'est exposé hors du réseau de la passerelle.</>,
            ]}
          />
        </Section>

        {/* 05 */}
        <Section id="cible" num="05" title="Préparation de la machine cible (Windows 10)">
          <p>
            Avant toute configuration sur la passerelle, le poste de travail doit être préparé pour
            accepter les connexions RDP des comptes du domaine.
          </p>

          <Sub>5.1 — Jonction au domaine</Sub>
          <Bullets
            items={[
              <>S'assurer que le poste Windows 10 est bien membre du domaine <Mono>gsb.local</Mono>.</>,
              <>Vérifier la résolution DNS du contrôleur de domaine.</>,
            ]}
          />

          <Sub>5.2 — Activation du Bureau à distance</Sub>
          <Bullets
            items={[
              <>Ouvrir <Mono>Paramètres › Système › Bureau à distance</Mono>.</>,
              <>Activer l'option <b className="text-foreground">« Activer le Bureau à distance »</b>.</>,
              <>Conserver l'option <b className="text-foreground">« N'autoriser que les ordinateurs exécutant le Bureau à distance avec NLA »</b> cochée.</>,
            ]}
          />

          <Sub>5.3 — Autorisations d'accès</Sub>
          <Bullets
            items={[
              <>Cliquer sur <i>« Sélectionner les utilisateurs autorisés à accéder à distance à ce PC »</i>.</>,
              <>Cliquer sur <Mono>Ajouter</Mono>, saisir <Mono>Utilisateurs du domaine</Mono>, valider.</>,
              <>Cela ajoute le groupe AD au groupe local <Mono>Utilisateurs du Bureau à distance</Mono>.</>,
            ]}
          />

          <Sub>5.4 — Vérifications réseau</Sub>
          <Bullets
            items={[
              <>Adresse IP fixe (réservée DHCP ou statique) sur le réseau <Mono>vmbr1</Mono>.</>,
              <>Pare-feu Windows : règle entrante <i>« Bureau à distance »</i> activée pour le profil <Mono>Domaine</Mono>.</>,
            ]}
          />
        </Section>

        {/* 06 */}
        <Section id="guacamole" num="06" title="Configuration de la connexion sur Guacamole">
          <p>
            Cette étape crée le pont entre l'interface web Guacamole et le poste Windows 10 cible.
          </p>

          <Sub>6.1 — Création de la connexion</Sub>
          <Bullets
            items={[
              "Se connecter à Guacamole en tant qu'administrateur.",
              <>Aller dans <Mono>Paramètres › Connexions › Nouvelle connexion</Mono>.</>,
            ]}
          />

          <Sub>6.2 — Paramètres de la connexion RDP</Sub>
          <Tbl
            headers={["Paramètre", "Valeur", "Commentaire"]}
            rows={[
              ["Nom", "Poste de travail Windows 10", "Libellé visible par l'utilisateur"],
              ["Protocole", "RDP", "Bureau à distance Windows"],
              ["Hostname", "IP fixe du poste sur vmbr1", "Adresse interne uniquement"],
              ["Port", "3389", "Port RDP standard"],
              ["Username", <Mono>${'$'}{'{'}GUAC_USERNAME{'}'}</Mono>, "Token : identifiant saisi sur le portail"],
              ["Password", <Mono>${'$'}{'{'}GUAC_PASSWORD{'}'}</Mono>, "Token : mot de passe saisi sur le portail"],
              ["Domain", "GSB", "Domaine NetBIOS"],
              ["Security Mode", "NLA", "Network Level Authentication"],
              ["Ignore server certificate", "Oui", "Cert. auto-signé du poste"],
            ]}
          />

          <Sub>6.3 — Mécanique des jetons (tokens)</Sub>
          <p>
            Les variables <Mono>${'$'}{'{'}GUAC_USERNAME{'}'}</Mono> et <Mono>${'$'}{'{'}GUAC_PASSWORD{'}'}</Mono> sont
            résolues à la volée par Guacamole avec les identifiants utilisés pour s'authentifier sur
            le portail. Concrètement, la même paire identifiant / mot de passe sert pour le portail
            web <i>et</i> pour la session RDP : c'est ce qui rend le SSO possible sans stocker les
            mots de passe en base.
          </p>
        </Section>

        {/* 07 */}
        <Section id="droits" num="07" title="Attribution des droits d'accès">
          <p>
            Pour qu'un utilisateur voie sa machine après authentification sur le portail :
          </p>
          <Bullets
            items={[
              <>Aller dans <Mono>Paramètres › Utilisateurs</Mono>.</>,
              "Sélectionner l'utilisateur (ou le groupe LDAP correspondant).",
              <>Dans la section <i>Connexions</i>, cocher la case en face de <b className="text-foreground">« Poste de travail Windows 10 »</b>.</>,
              "Enregistrer les modifications.",
            ]}
          />
          <p>
            <b className="text-foreground">Bonne pratique :</b> attribuer les droits via un groupe
            LDAP (par exemple <Mono>GG_GuacamoleUsers</Mono>) plutôt qu'utilisateur par utilisateur.
            La gestion se fait alors directement dans la console Active Directory.
          </p>
        </Section>

        {/* 08 */}
        <Section id="securite" num="08" title="Sécurité, NLA et bonnes pratiques">
          <Sub>8.1 — Network Level Authentication (NLA)</Sub>
          <p>
            Le mode NLA impose à l'utilisateur de s'authentifier <i>avant</i> que la session RDP
            ne soit ouverte. Concrètement, cela protège le serveur cible contre les attaques par
            déni de service ou d'exposition d'écran de connexion : un attaquant ne reçoit même pas
            la mire de login s'il n'a pas un compte AD valide.
          </p>

          <Sub>8.2 — Conditions à respecter</Sub>
          <Bullets
            items={[
              <>La machine cible doit être membre du domaine <Mono>gsb.local</Mono>.</>,
              <>L'utilisateur doit appartenir au groupe local <Mono>Utilisateurs du Bureau à distance</Mono>.</>,
              "Le compte AD utilisé ne doit pas être expiré, désactivé ou verrouillé.",
              "L'horloge des deux machines doit être synchronisée (Kerberos exige < 5 min d'écart).",
            ]}
          />

          <Sub>8.3 — Mesures complémentaires</Sub>
          <Tbl
            headers={["Mesure", "Effet"]}
            rows={[
              ["TLS sur le port 443", "Chiffrement bout en bout entre navigateur et passerelle"],
              ["Reverse proxy + HSTS", "Forcer HTTPS, empêcher les downgrades"],
              ["Compte de service AD dédié", "Lecture LDAP uniquement, jamais admin du domaine"],
              ["Limitation par groupe AD", "Seuls les membres autorisés voient les connexions"],
              ["Journalisation guacd", "Trace de chaque session (qui, quand, vers quel poste)"],
              ["Fail2ban / rate limit", "Limite les tentatives d'authentification"],
            ]}
          />
        </Section>

        {/* 09 */}
        <Section id="tests" num="09" title="Tests et recette">
          <Tbl
            headers={["Cas de test", "Résultat attendu"]}
            rows={[
              ["Connexion au portail avec un compte AD valide", "Authentification OK, poste visible dans la liste"],
              ["Connexion avec un compte non autorisé", "Aucune connexion proposée"],
              ["Saisie d'un mot de passe incorrect", "Refus, pas d'ouverture de session RDP"],
              ["Lancement de la session Windows 10", "Bureau affiché dans le navigateur, identifiants non redemandés"],
              ["Test depuis un PC sans client RDP", "Fonctionne — uniquement le navigateur est requis"],
              ["Coupure réseau côté poste cible", "Message d'erreur explicite, portail toujours accessible"],
            ]}
          />
        </Section>

        {/* 10 */}
        <Section id="bilan" num="10" title="Bilan et argumentaire d'examen">
          <Sub>10.1 — Synthèse</Sub>
          <p>
            L'architecture mise en place repose sur une <b className="text-foreground">passerelle de
            rebond Apache Guacamole</b> exposée uniquement en HTTPS. La configuration s'appuie sur les
            <b className="text-foreground"> jetons de paramètres</b> (<Mono>${'$'}{'{'}GUAC_USERNAME{'}'}</Mono>,
            <Mono>${'$'}{'{'}GUAC_PASSWORD{'}'}</Mono>) pour réaliser une authentification transparente :
            les identifiants saisis par l'utilisateur sur le portail web sont retransmis au protocole
            RDP sans nouvelle saisie ni stockage en clair.
          </p>
          <p>
            La sécurité est assurée par l'activation du mode <b className="text-foreground">NLA</b>,
            qui impose que la machine cible soit membre du domaine Active Directory et que
            l'utilisateur appartienne au groupe local <Mono>Utilisateurs du Bureau à distance</Mono>.
            Les ports RDP ne sont jamais exposés à l'extérieur : seule la passerelle, en HTTPS,
            est joignable.
          </p>

          <Sub>10.2 — Compétences mobilisées (référentiel SISR)</Sub>
          <Bullets
            items={[
              "Mettre à disposition des utilisateurs un service informatique (accès distant).",
              "Administrer un service : Active Directory, Apache Guacamole, RDP.",
              "Sécuriser les accès aux services et aux données de l'organisation.",
              "Documenter une procédure d'exploitation reproductible.",
            ]}
          />

          <Sub>10.3 — Perspectives d'évolution</Sub>
          <Bullets
            items={[
              "Authentification multi-facteurs (TOTP) en plus du couple AD.",
              "Enregistrement vidéo des sessions sensibles à des fins d'audit.",
              "Haute disponibilité de la passerelle (deux instances derrière un load balancer).",
              "Extension aux protocoles SSH pour les administrateurs Linux.",
            ]}
          />
        </Section>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            $ end-of-file — documentation Guacamole
          </p>
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
        </div>
      </article>
    </div>
  );
};

export default DocGuacamole;
