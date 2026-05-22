import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import archiImg from "@/assets/haproxy-archi.jpg";
import loginImg from "@/assets/haproxy-login.png";
import statsImg from "@/assets/haproxy-stats.jpg";
import web1Img from "@/assets/haproxy-web1.png";
import web2Img from "@/assets/haproxy-web2.png";

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

const Screenshot = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <figure className="my-4 bg-card border border-border rounded-lg p-3">
    <img src={src} alt={alt} className="w-full rounded" loading="lazy" />
    <figcaption className="font-mono text-xs text-muted-foreground mt-2 text-center">{caption}</figcaption>
  </figure>
);

const toc = [
  ["01", "contexte", "Contexte et objectifs"],
  ["02", "analyse", "Analyse de l'existant et expression du besoin"],
  ["03", "solution", "Solution retenue et justification des choix"],
  ["04", "architecture", "Architecture technique"],
  ["05", "reseau", "Configuration réseau des machines"],
  ["06", "installation", "Installation et configuration d'HAProxy"],
  ["07", "backends", "Préparation des serveurs web backends"],
  ["08", "stats", "Interface de statistiques et supervision"],
  ["09", "tests", "Tests et recette"],
  ["10", "bilan", "Bilan et argumentaire d'examen"],
  ["A", "annexe", "Annexe — Captures d'écran"],
];

const DocHaproxy = ({ onClose }: { onClose?: () => void } = {}) => {
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
            ~/sisr/docs $ cat repartition-charge-haproxy.md
          </span>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Hero */}
        <p className="font-mono text-xs text-primary/60 mb-3">$ ./documentation --project=haproxy</p>
        <h1 className="font-mono font-bold text-3xl md:text-5xl text-primary leading-tight mb-2">
          Documentation
        </h1>
        <p className="font-mono font-bold text-2xl md:text-4xl text-foreground/90 mb-4">
          Répartition de charge — HAProxy Round-Robin
        </p>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Mise en place d'une passerelle de répartition de charge HTTP sur Debian 13 pour distribuer
          le trafic entre deux serveurs web Apache via l'algorithme <Mono>roundrobin</Mono>, avec
          contrôle de santé et interface de supervision.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-12 p-5 bg-card border border-border rounded-lg">
          {[
            ["BTS", "SIO — option SISR"],
            ["Contexte", "Formation / TP réseau"],
            ["Auteur", "Antoine Duhautbois"],
            ["Solution", "HAProxy 3.0 · Debian 13 · Apache2"],
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
            Dans le cadre du module de services réseaux, l'objectif est de mettre en place une
            architecture web tolérante à la panne et capable d'absorber davantage de charge qu'un
            serveur unique. La solution repose sur <b className="text-foreground">HAProxy</b>, un
            répartiteur de charge open source réputé pour ses performances et sa fiabilité.
          </p>

          <Sub>1.2 — Objectifs</Sub>
          <Tbl
            headers={["Axe", "Objectif"]}
            rows={[
              ["Disponibilité", "Continuer à servir le site même si un serveur web tombe en panne"],
              ["Performance", "Répartir équitablement les requêtes sur plusieurs backends"],
              ["Supervision", "Disposer d'une interface temps réel sur l'état des backends"],
              ["Isolation", "Cacher les serveurs web derrière une IP unique côté réseau public"],
              ["Reproductibilité", "Documenter pas à pas la procédure d'installation"],
            ]}
          />
        </Section>

        {/* 02 */}
        <Section id="analyse" num="02" title="Analyse de l'existant et expression du besoin">
          <Sub>2.1 — Situation initiale</Sub>
          <Tbl
            headers={["Élément", "Constat"]}
            rows={[
              ["Serveur web", "Un seul serveur Apache exposé directement sur le réseau"],
              ["Disponibilité", "En cas de panne ou de maintenance, le service est interrompu"],
              ["Montée en charge", "Aucune mutualisation possible des ressources"],
              ["Visibilité", "Aucun tableau de bord sur l'état du service"],
            ]}
          />

          <Sub>2.2 — Besoins exprimés</Sub>
          <Bullets
            items={[
              "Présenter une adresse IP unique aux clients (point d'entrée stable).",
              "Distribuer la charge entre plusieurs serveurs Apache de manière équitable.",
              "Pondérer la distribution pour tenir compte d'un backend plus puissant qu'un autre.",
              "Détecter automatiquement un backend défaillant et l'écarter du pool.",
              "Disposer d'une interface web pour superviser l'état du cluster.",
            ]}
          />
        </Section>

        {/* 03 */}
        <Section id="solution" num="03" title="Solution retenue et justification des choix">
          <Sub>3.1 — Pourquoi HAProxy ?</Sub>
          <Bullets
            items={[
              <><b className="text-foreground">Open source</b> et inclus dans les dépôts Debian — installation triviale.</>,
              <><b className="text-foreground">Algorithmes de répartition</b> variés (<Mono>roundrobin</Mono>, <Mono>leastconn</Mono>, <Mono>source</Mono>…).</>,
              <><b className="text-foreground">Health checks</b> natifs (option <Mono>httpchk</Mono>) — un backend KO est immédiatement écarté.</>,
              <><b className="text-foreground">Pondération</b> par serveur (<Mono>weight</Mono>) pour adapter la charge aux capacités matérielles.</>,
              <><b className="text-foreground">Interface de stats</b> intégrée, sans logiciel tiers à installer.</>,
            ]}
          />

          <Sub>3.2 — Algorithme retenu : Round-Robin pondéré</Sub>
          <p>
            Le mode <Mono>roundrobin</Mono> distribue les requêtes à tour de rôle sur chaque backend.
            Combiné à l'attribut <Mono>weight</Mono>, il permet de servir plus de requêtes au serveur
            le plus puissant. Dans cette maquette, <Mono>web1</Mono> reçoit un poids de 100 et
            <Mono>web2</Mono> un poids de 50 — soit deux fois plus de trafic sur web1.
          </p>
        </Section>

        {/* 04 */}
        <Section id="architecture" num="04" title="Architecture technique">
          <Sub>4.1 — Schéma général</Sub>
          <Screenshot src={archiImg} alt="Schéma : poste client → HAProxy → web1/web2" caption="Fig. 1 — Architecture : HAProxy en frontal devant deux serveurs Apache" />

          <p>
            HAProxy dispose de <b className="text-foreground">deux cartes réseau</b> : une côté
            « public » sur le réseau <Mono>172.17.0.0/16</Mono> et une côté « interne » sur le réseau
            privé <Mono>10.0.0.0/24</Mono> où sont isolés les serveurs web. Aucun client ne peut
            joindre directement web1 ou web2.
          </p>

          <Sub>4.2 — Inventaire des machines</Sub>
          <Tbl
            headers={["VM", "Système", "Configuration réseau"]}
            rows={[
              ["Debian HAProxy", "Debian 13", <>Publique : <Mono>172.17.219.46/16</Mono> · Privée : <Mono>10.0.0.3/24</Mono></>],
              ["Debian Web1", "Debian 13", <>Privée : <Mono>10.0.0.1/24</Mono></>],
              ["Debian Web2", "Debian 13", <>Privée : <Mono>10.0.0.2/24</Mono></>],
            ]}
          />

          <Sub>4.3 — Flux réseau</Sub>
          <Bullets
            items={[
              <>Client → HAProxy : <Mono>HTTP / 80</Mono> sur l'IP publique.</>,
              <>HAProxy → web1 / web2 : <Mono>HTTP / 80</Mono> sur le LAN privé <Mono>10.0.0.0/24</Mono>.</>,
              <>Admin → HAProxy : <Mono>/statsHaproxy</Mono> en HTTP basic auth.</>,
            ]}
          />
        </Section>

        {/* 05 */}
        <Section id="reseau" num="05" title="Configuration réseau des machines">
          <Sub>5.1 — Serveur web1 (10.0.0.1)</Sub>
          <Code>{`# nano /etc/network/interfaces

# The primary network interface
allow-hotplug enp0s3
iface enp0s3 inet static
        address 10.0.0.1/24

# systemctl restart networking`}</Code>

          <Sub>5.2 — Serveur web2 (10.0.0.2)</Sub>
          <Code>{`# nano /etc/network/interfaces

allow-hotplug enp0s3
iface enp0s3 inet static
        address 10.0.0.2/24

# systemctl restart networking`}</Code>

          <Sub>5.3 — Passerelle HAProxy (double interface)</Sub>
          <Code>{`# nano /etc/network/interfaces

# Interface publique (DHCP — récupère 172.17.x.x/16)
allow-hotplug enp0s3
iface enp0s3 inet dhcp

# Interface interne (vers le LAN des serveurs web)
allow-hotplug enp0s8
iface enp0s8 inet static
        address 10.0.0.3/24

# systemctl restart networking`}</Code>
        </Section>

        {/* 06 */}
        <Section id="installation" num="06" title="Installation et configuration d'HAProxy">
          <Sub>6.1 — Installation du paquet</Sub>
          <Code>{`# apt install haproxy
# cd /etc/haproxy/
# cp haproxy.cfg copie-haproxy.cfg   # sauvegarde avant modification
# nano haproxy.cfg`}</Code>

          <Sub>6.2 — Bloc de configuration ajouté</Sub>
          <Code>{`frontend proxypublic
    bind 172.17.219.46:80
    default_backend fermeweb

backend fermeweb
    balance roundrobin
    option httpchk HEAD / HTTP/1.0
    server web1 10.0.0.1:80 check weight 100
    server web2 10.0.0.2:80 check weight 50
    stats uri /statsHaproxy
    stats auth admin:admin
    stats admin if TRUE
    stats refresh 30s`}</Code>

          <Sub>6.3 — Décryptage de la configuration</Sub>
          <Tbl
            headers={["Directive", "Rôle"]}
            rows={[
              [<Mono>frontend proxypublic</Mono>, "Définit le point d'entrée public (IP + port à exposer)"],
              [<Mono>bind 172.17.219.46:80</Mono>, "Écoute HTTP sur l'IP publique de la passerelle"],
              [<Mono>default_backend fermeweb</Mono>, "Achemine toutes les requêtes vers le pool « fermeweb »"],
              [<Mono>balance roundrobin</Mono>, "Algorithme de répartition à tour de rôle"],
              [<Mono>option httpchk HEAD /</Mono>, "Health check HTTP : un backend ne répondant pas est marqué DOWN"],
              [<Mono>server … check weight N</Mono>, "Pondération du serveur (web1 reçoit 2× plus de trafic que web2)"],
              [<Mono>stats uri /statsHaproxy</Mono>, "URL d'accès à la page de supervision"],
              [<Mono>stats auth admin:admin</Mono>, "Authentification basic (à durcir en production)"],
            ]}
          />

          <Sub>6.4 — Application des modifications</Sub>
          <Code>{`# systemctl restart haproxy
# systemctl status haproxy`}</Code>
        </Section>

        {/* 07 */}
        <Section id="backends" num="07" title="Préparation des serveurs web backends">
          <p>
            Sur chaque serveur, Apache2 est installé et la page d'accueil est personnalisée pour
            identifier visuellement quel backend a répondu lors des tests.
          </p>

          <Sub>7.1 — Sur web1</Sub>
          <Code>{`# apt install apache2
# nano /var/www/html/index.html
  <title>Apache2 Debian Default Page: It works web1</title>
# systemctl restart apache2`}</Code>

          <Sub>7.2 — Sur web2</Sub>
          <Code>{`# apt install apache2
# nano /var/www/html/index.html
  <title>Apache2 Debian Default Page: It works web2</title>
# systemctl restart apache2`}</Code>
        </Section>

        {/* 08 */}
        <Section id="stats" num="08" title="Interface de statistiques et supervision">
          <Sub>8.1 — Accès à l'interface</Sub>
          <p>
            La page de supervision est servie par HAProxy lui-même à l'URL
            <Mono>http://172.17.219.46/statsHaproxy</Mono>. Une authentification basic est demandée
            (compte <Mono>admin/admin</Mono> défini dans la configuration).
          </p>

          <Screenshot src={loginImg} alt="Fenêtre d'authentification basic auth HAProxy" caption="Fig. 2 — Authentification HTTP basic à l'accès aux stats" />

          <Sub>8.2 — Tableau de bord</Sub>
          <p>
            Le rapport temps réel expose pour chaque backend son état (<Mono>UP</Mono>/<Mono>DOWN</Mono>),
            son poids, le résultat du dernier health check (<Mono>L7OK/200</Mono>), ainsi que les
            compteurs de sessions et d'octets transférés.
          </p>
          <Screenshot src={statsImg} alt="Statistics Report HAProxy avec backends web1 et web2 en UP" caption="Fig. 3 — Statistics Report : web1 et web2 en UP, pondération 100/50" />
        </Section>

        {/* 09 */}
        <Section id="tests" num="09" title="Tests et recette">
          <Sub>9.1 — Test de répartition</Sub>
          <p>
            En rafraîchissant à plusieurs reprises l'URL <Mono>http://172.17.219.46</Mono> depuis un
            navigateur, on observe que la réponse alterne entre les deux backends — la balise
            <Mono>&lt;title&gt;</Mono> affiche tantôt « web1 » tantôt « web2 », confirmant le
            fonctionnement du round-robin.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 my-4">
            <Screenshot src={web1Img} alt="Page Apache It works web1" caption="Fig. 4 — Réponse servie par web1" />
            <Screenshot src={web2Img} alt="Page Apache It works web2" caption="Fig. 5 — Réponse servie par web2" />
          </div>

          <Sub>9.2 — Plan de recette</Sub>
          <Tbl
            headers={["Cas de test", "Résultat attendu"]}
            rows={[
              ["Accéder à http://172.17.219.46", "Affichage de la page Apache (web1 ou web2)"],
              ["Rafraîchir plusieurs fois la page", "Alternance entre web1 et web2 (ratio ~2:1)"],
              ["Couper Apache sur web1", "HAProxy marque web1 DOWN, tout le trafic part sur web2"],
              ["Relancer Apache sur web1", "web1 repasse UP après le prochain health check"],
              ["Accéder à /statsHaproxy", "Tableau de supervision affiché après authentification"],
              ["Tenter sans identifiants", "Refus 401 — page de stats inaccessible"],
            ]}
          />
        </Section>

        {/* 10 */}
        <Section id="bilan" num="10" title="Bilan et argumentaire d'examen">
          <Sub>10.1 — Synthèse</Sub>
          <p>
            La solution mise en place repose sur une passerelle <b className="text-foreground">HAProxy</b>
            qui expose une IP publique unique et répartit les requêtes HTTP sur deux serveurs Apache
            isolés dans un LAN privé. L'algorithme <Mono>roundrobin</Mono> pondéré garantit une
            répartition adaptée aux capacités de chaque backend, et l'option <Mono>httpchk</Mono>
            assure une bascule automatique en cas de panne.
          </p>
          <p>
            L'interface de statistiques intégrée fournit une vue temps réel sur l'état du cluster
            sans nécessiter d'outil de supervision externe — un atout déterminant pour un
            environnement de production léger.
          </p>

          <Sub>10.2 — Compétences mobilisées (référentiel SISR)</Sub>
          <Bullets
            items={[
              "Mettre à disposition des utilisateurs un service informatique (web haute disponibilité).",
              "Gérer le patrimoine informatique (inventaire et configuration des VM).",
              "Administrer un service : HAProxy, Apache2, réseau Debian.",
              "Documenter une procédure d'exploitation reproductible.",
            ]}
          />

          <Sub>10.3 — Perspectives d'évolution</Sub>
          <Bullets
            items={[
              <>Terminaison <b className="text-foreground">TLS</b> sur la passerelle (port 443, certificat Let's Encrypt).</>,
              <>Bascule sur l'algorithme <Mono>leastconn</Mono> pour des charges hétérogènes.</>,
              "Mise en place d'une seconde instance HAProxy en mode actif/passif (keepalived / VRRP).",
              "Export des métriques vers Prometheus + Grafana pour un suivi historique.",
              "Durcissement de l'auth des stats (utilisateur dédié, mot de passe fort, restriction par IP).",
            ]}
          />
        </Section>

        {/* Annexe */}
        <Section id="annexe" num="A" title="Annexe — Captures d'écran">
          <p>Captures issues de la mise en œuvre du TP, regroupées ici pour référence.</p>
          <Screenshot src={archiImg} alt="Schéma d'architecture" caption="Fig. 1 — Schéma d'architecture cible" />
          <Screenshot src={loginImg} alt="Login basic auth" caption="Fig. 2 — Authentification HTTP basic" />
          <Screenshot src={statsImg} alt="HAProxy Statistics Report" caption="Fig. 3 — Tableau de bord HAProxy" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Screenshot src={web1Img} alt="Réponse web1" caption="Fig. 4 — Backend web1" />
            <Screenshot src={web2Img} alt="Réponse web2" caption="Fig. 5 — Backend web2" />
          </div>
        </Section>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            $ end-of-file — documentation HAProxy
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

export default DocHaproxy;
