import type { L } from '../i18n';

export interface Author {
  initials: string;
  name: string;
  role: L;
}
export const AUTHORS: Record<string, Author> = {
  cm: { initials: 'CM', name: 'Claire Morel', role: { fr: 'Responsable produit', en: 'Head of Product' } },
  jr: { initials: 'JR', name: 'Julien Roux', role: { fr: 'Responsable qualité', en: 'Quality lead' } },
  tb: { initials: 'TB', name: 'Thomas Bernard', role: { fr: 'Ingénieur plateforme', en: 'Platform engineer' } },
};

export interface Post {
  id: string;
  a: keyof typeof AUTHORS;
  min: number;
  cat: L;
  date: L;
  /** ISO date, used for structured data */
  iso: string;
  t: L;
  x: L;
  body: { fr: string; en: string };
}

export const POSTS: Post[] = [
  {
    id: 'ich-gcp-e6r3', a: 'cm', min: 8, iso: '2026-10-12',
    cat: { fr: 'Réglementaire', en: 'Regulatory' },
    date: { fr: '12 oct. 2026', en: 'Oct 12, 2026' },
    t: { fr: 'ICH-GCP E6(R3) : ce qui change pour votre EDC', en: 'ICH-GCP E6(R3): what changes for your EDC' },
    x: { fr: 'Approche fondée sur les risques, qualité dès la conception, traçabilité : le point sur les nouvelles exigences et leur impact concret.', en: 'Risk-based approach, quality by design, traceability: the new requirements and their concrete impact.' },
    body: {
      fr: `<p class="intro">Adoptée par l’ICH début 2025, la révision E6(R3) des bonnes pratiques cliniques est applicable en Europe depuis l’été 2025. L’objectif ne change pas — protéger les participants et garantir des résultats fiables — mais la manière d’y parvenir, si.</p>
<h2 id="change">Ce qui change vraiment</h2><p>La R3 abandonne une conformité « case à cocher » au profit de principes. Le texte laisse davantage de latitude aux promoteurs pour adapter leurs processus à la nature de l’essai, à condition de le justifier.</p>
<ul><li><strong>Qualité dès la conception</strong> : identifier les facteurs critiques pour la qualité avant le démarrage.</li><li><strong>Proportionnalité</strong> : adapter le niveau de contrôle aux risques réels.</li><li><strong>Gouvernance des données</strong> : des attentes explicites sur le cycle de vie des données et les systèmes informatisés.</li></ul>
<h2 id="qbd">Qualité dès la conception</h2><p>Les facteurs critiques — critère principal, consentement, sécurité des patients — doivent être identifiés dès la rédaction du protocole. Dans l’EDC, cela se traduit par des contrôles de cohérence concentrés sur ces données plutôt qu’une multiplication de règles sur des champs secondaires.</p>
<h2 id="risk">Monitoring fondé sur les risques</h2><p>La vérification systématique de 100 % des données source n’est plus la référence. Le monitoring centralisé, appuyé sur des indicateurs extraits de l’EDC (taux de requêtes, délais de saisie, valeurs atypiques), devient un levier pleinement reconnu.</p>
<h2 id="data">Systèmes informatisés et intégrité des données</h2><p>Les attentes sur les systèmes sont précisées : validation proportionnée au risque, traçabilité des modifications, contrôle des accès, sauvegarde et capacité à restituer les données dans leur contexte.</p>
<div class="callout"><strong>À retenir :</strong> l’audit trail doit être lisible et exploitable lors d’une revue, pas seulement présent.</div>
<h2 id="edc">Ce que cela implique pour votre EDC</h2><ol><li>Identifier les données critiques dans le paramétrage de l’étude.</li><li>Disposer de tableaux de bord de monitoring centralisé.</li><li>Exporter l’audit trail par patient, formulaire et période.</li><li>Documenter la validation du système et de chaque paramétrage d’étude.</li></ol>
<h2 id="synapse">Comment Synapse vous accompagne</h2><p>Synapse intègre ces exigences : indicateurs de qualité par centre, audit trail filtrable et exportable, recette UAT documentée avec PV signé. Le dossier de validation GAMP 5 est disponible sur demande.</p>`,
      en: `<p class="intro">Adopted by ICH in early 2025, the E6(R3) revision of Good Clinical Practice has applied in Europe since summer 2025. The goal is unchanged — protect participants and ensure reliable results — but how you get there is not.</p>
<h2 id="change">What really changes</h2><p>R3 moves away from tick-box compliance towards principles. Sponsors get more room to adapt their processes to the nature of the trial, provided they justify it.</p>
<ul><li><strong>Quality by design</strong>: identify critical-to-quality factors before start-up.</li><li><strong>Proportionality</strong>: scale controls to actual risk.</li><li><strong>Data governance</strong>: explicit expectations on the data lifecycle and computerised systems.</li></ul>
<h2 id="qbd">Quality by design</h2><p>Critical factors — primary endpoint, consent, patient safety — must be identified while writing the protocol. In the EDC, that means edit checks focused on that data rather than piling rules onto secondary fields.</p>
<h2 id="risk">Risk-based monitoring</h2><p>Systematic 100% source data verification is no longer the benchmark. Centralised monitoring, driven by EDC indicators (query rates, entry delays, outliers), is now fully recognised.</p>
<h2 id="data">Computerised systems and data integrity</h2><p>Expectations for systems are clarified: risk-proportionate validation, change traceability, access control, backup and the ability to return data in context.</p>
<div class="callout"><strong>Key point:</strong> the audit trail must be readable and usable during a review, not merely present.</div>
<h2 id="edc">What it means for your EDC</h2><ol><li>Flag critical data in the study set-up.</li><li>Have centralised monitoring dashboards.</li><li>Export the audit trail by patient, form and period.</li><li>Document validation of the system and of each study build.</li></ol>
<h2 id="synapse">How Synapse helps</h2><p>Synapse builds these in: per-site quality indicators, a filterable and exportable audit trail, and documented UAT with a signed report. The GAMP 5 validation package is available on request.</p>`,
    },
  },
  {
    id: 'recette-uat-5-etapes', a: 'jr', min: 5, iso: '2026-09-28',
    cat: { fr: 'Guide', en: 'Guide' },
    date: { fr: '28 sept. 2026', en: 'Sep 28, 2026' },
    t: { fr: 'Réussir sa recette UAT en 5 étapes', en: 'Running a successful UAT in 5 steps' },
    x: { fr: 'Plan de test, jeux de données, PV signé : la méthode de nos chefs de projet.', en: 'Test plan, datasets, signed report: our project leads’ method.' },
    body: {
      fr: `<p class="intro">La recette utilisateur est la dernière barrière avant la production. Bien menée, elle prend quelques jours ; mal préparée, elle retarde l’inclusion du premier patient.</p>
<h2 id="exig">1. Partir des exigences</h2><p>Chaque cas de test doit se rattacher à une exigence du protocole ou du cahier des charges. Sans ce lien, impossible de démontrer la couverture lors d’un audit.</p>
<h2 id="data">2. Préparer des jeux de données réalistes</h2><p>Prévoyez des patients fictifs qui déclenchent chaque contrôle de cohérence : valeurs hors bornes, dates incohérentes, champs conditionnels.</p>
<h2 id="exec">3. Exécuter et tracer chaque vérification</h2><p>Chaque vérification reçoit un statut — OK, KO ou Bloqué — et une note quand elle échoue. Le testeur, l’environnement et la version sont consignés.</p>
<h2 id="ano">4. Qualifier les anomalies</h2><p>Distinguez les anomalies bloquantes, majeures et mineures. Seules les premières empêchent la mise en production ; les autres sont planifiées.</p>
<h2 id="pv">5. Signer le PV</h2><p>Le procès-verbal récapitule la couverture, les anomalies et les décisions. Signé par le promoteur, il autorise la mise en production.</p>
<div class="callout">Le kit de recette Synapse fournit les cahiers, le fichier de test et le modèle de PV. <a href="{{DOCS}}">Voir la documentation</a>.</div>`,
      en: `<p class="intro">User acceptance testing is the last gate before production. Done well, it takes a few days; poorly prepared, it delays first patient in.</p>
<h2 id="exig">1. Start from requirements</h2><p>Every test case should trace back to a protocol or specification requirement. Without that link, you cannot demonstrate coverage during an audit.</p>
<h2 id="data">2. Prepare realistic datasets</h2><p>Plan dummy patients that trigger every edit check: out-of-range values, inconsistent dates, conditional fields.</p>
<h2 id="exec">3. Execute and trace every check</h2><p>Each check gets a status — OK, KO or Blocked — and a note when it fails. Tester, environment and version are recorded.</p>
<h2 id="ano">4. Qualify anomalies</h2><p>Separate blocking, major and minor anomalies. Only blocking ones prevent go-live; the rest are scheduled.</p>
<h2 id="pv">5. Sign the report</h2><p>The acceptance report sums up coverage, anomalies and decisions. Signed by the sponsor, it authorises go-live.</p>
<div class="callout">The Synapse UAT kit provides test scripts, the test file and the report template. <a href="{{DOCS}}">See the documentation</a>.</div>`,
    },
  },
  {
    id: 'import-prospectif', a: 'tb', min: 4, iso: '2026-09-09',
    cat: { fr: 'Produit', en: 'Product' },
    date: { fr: '9 sept. 2026', en: 'Sep 9, 2026' },
    t: { fr: 'Reprendre une étude en cours avec l’import prospectif', en: 'Taking over an ongoing study with prospective import' },
    x: { fr: 'Mapping, contrôles et rapport d’anomalies : comment migrer sans ressaisie.', en: 'Mapping, checks and anomaly report: how to migrate without re-entry.' },
    body: {
      fr: `<p class="intro">Changer d’EDC en cours d’étude fait peur : risque de perte, ressaisie, interruption des inclusions. L’import prospectif a été conçu pour éviter les trois.</p>
<h2 id="prep">Préparer le fichier</h2><p>Un fichier Excel par formulaire ou un fichier unique avec un onglet par visite. Les identifiants patients et les dates de visite sont obligatoires.</p>
<h2 id="map">Le mapping</h2><p>Synapse propose automatiquement une correspondance entre colonnes et champs eCRF. Vous validez, corrigez et enregistrez le mapping pour les imports suivants.</p>
<h2 id="ctrl">Les contrôles</h2><p>Chaque ligne passe les mêmes contrôles de cohérence qu’une saisie manuelle. Les lignes en erreur sont listées dans un rapport téléchargeable, sans bloquer les autres.</p>
<h2 id="after">Après l’import</h2><p>Les données importées sont tracées dans l’audit trail avec la source et l’auteur de l’import. Les centres reprennent la saisie directement dans Synapse.</p>`,
      en: `<p class="intro">Switching EDC mid-study is daunting: data loss, re-entry, enrolment pauses. Prospective import was designed to avoid all three.</p>
<h2 id="prep">Prepare the file</h2><p>One Excel file per form, or a single file with one sheet per visit. Patient IDs and visit dates are mandatory.</p>
<h2 id="map">Mapping</h2><p>Synapse suggests a match between columns and eCRF fields. You review, correct and save the mapping for future imports.</p>
<h2 id="ctrl">Checks</h2><p>Every row runs the same edit checks as manual entry. Failing rows are listed in a downloadable report without blocking the rest.</p>
<h2 id="after">After the import</h2><p>Imported data is logged in the audit trail with its source and the person who ran the import. Sites continue entering data directly in Synapse.</p>`,
    },
  },
];
