import type { L } from '../i18n';

export interface Section {
  id: string;
  title: L;
  /** HTML. "{{…}}" placeholders are resolved when rendering (see views/Legal.astro). */
  body: L;
}

export const LEGAL: Section[] = [
  {
    id: 'editeur', title: { fr: 'Éditeur du site', en: 'Publisher' },
    body: {
      fr: '<p><strong>Synapse Medical SAS</strong>, au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro [RCS].<br>Siège social : [adresse].<br>TVA intracommunautaire : [numéro].</p><p>Contact : <a href="mailto:{{contact}}">{{contact}}</a></p>',
      en: '<p><strong>Synapse Medical SAS</strong>, share capital €[amount], registered with the [city] Trade and Companies Register under number [RCS].<br>Registered office: [address].<br>EU VAT number: [number].</p><p>Contact: <a href="mailto:{{contact}}">{{contact}}</a></p>',
    },
  },
  {
    id: 'publication', title: { fr: 'Directeur de la publication', en: 'Publication director' },
    body: { fr: '<p>[Nom], en qualité de [fonction].</p>', en: '<p>[Name], acting as [title].</p>' },
  },
  {
    id: 'hebergement', title: { fr: 'Hébergement', en: 'Hosting' },
    body: {
      fr: '<p><strong>Site vitrine</strong> : [hébergeur], [adresse].</p><p><strong>Plateforme Synapse EDC et données de santé</strong> : hébergeur certifié HDS, en France. Voir la page <a href="{{page:security}}">Sécurité</a>.</p>',
      en: '<p><strong>Marketing website</strong>: [host], [address].</p><p><strong>Synapse EDC platform and health data</strong>: HDS-certified host in France. See the <a href="{{page:security}}">Security</a> page.</p>',
    },
  },
  {
    id: 'pi', title: { fr: 'Propriété intellectuelle', en: 'Intellectual property' },
    body: {
      fr: '<p>L’ensemble des contenus du site (textes, visuels, logos, marques) est la propriété de Synapse Medical ou de ses partenaires. Toute reproduction sans autorisation écrite est interdite.</p>',
      en: '<p>All site content (text, visuals, logos, trademarks) belongs to Synapse Medical or its partners. Any reproduction without written permission is prohibited.</p>',
    },
  },
  {
    id: 'donnees', title: { fr: 'Données personnelles', en: 'Personal data' },
    body: {
      fr: '<p>Le traitement des données collectées sur ce site est décrit dans la <a href="{{page:privacy}}">politique de confidentialité</a>.</p>',
      en: '<p>Processing of data collected on this site is described in the <a href="{{page:privacy}}">privacy policy</a>.</p>',
    },
  },
];

export const PRIVACY: Section[] = [
  {
    id: 'responsable', title: { fr: 'Responsable du traitement', en: 'Data controller' },
    body: {
      fr: '<p>Synapse Medical SAS est responsable des traitements réalisés sur ce site. Délégué à la protection des données : <a href="mailto:{{dpo}}">{{dpo}}</a>.</p><div class="callout">Cette politique concerne le site vitrine. Les données des études cliniques saisies dans Synapse EDC sont traitées pour le compte du promoteur, responsable de traitement, dans le cadre d’un contrat de sous-traitance.</div>',
      en: '<p>Synapse Medical SAS is the controller for processing carried out on this site. Data protection officer: <a href="mailto:{{dpo}}">{{dpo}}</a>.</p><div class="callout">This policy covers the marketing website. Clinical study data entered in Synapse EDC is processed on behalf of the sponsor, who is the controller, under a data processing agreement.</div>',
    },
  },
  {
    id: 'collecte', title: { fr: 'Données collectées', en: 'Data collected' },
    body: {
      fr: '<ul><li><strong>Demande de démo</strong> : nom, prénom, e-mail professionnel, téléphone, établissement, fonction, message.</li><li><strong>Prise de rendez-vous</strong> : créneau choisi.</li><li><strong>Mesure d’audience</strong> : uniquement si vous l’acceptez, pages vues et provenance, de façon agrégée.</li></ul>',
      en: '<ul><li><strong>Demo request</strong>: name, work email, phone, organisation, role, message.</li><li><strong>Booking</strong>: chosen time slot.</li><li><strong>Analytics</strong>: only if you accept, page views and referrer, aggregated.</li></ul>',
    },
  },
  {
    id: 'finalites', title: { fr: 'Finalités et bases légales', en: 'Purposes and legal bases' },
    body: {
      fr: '<ul><li>Répondre à votre demande et organiser la démonstration : <strong>mesures précontractuelles</strong>.</li><li>Vous recontacter au sujet de nos offres : <strong>consentement</strong>.</li><li>Mesurer l’audience du site : <strong>consentement</strong>.</li></ul>',
      en: '<ul><li>Answer your request and organise the demo: <strong>pre-contractual measures</strong>.</li><li>Contact you about our offers: <strong>consent</strong>.</li><li>Measure site audience: <strong>consent</strong>.</li></ul>',
    },
  },
  {
    id: 'duree', title: { fr: 'Durée de conservation', en: 'Retention' },
    body: {
      fr: '<p>Les données de prospection sont conservées <strong>3 ans</strong> à compter du dernier contact. Les choix relatifs aux cookies sont conservés <strong>6 mois</strong>.</p>',
      en: '<p>Prospect data is kept for <strong>3 years</strong> from the last contact. Cookie choices are kept for <strong>6 months</strong>.</p>',
    },
  },
  {
    id: 'cookies', title: { fr: 'Cookies', en: 'Cookies' },
    body: {
      fr: '<p>Seuls les cookies nécessaires au fonctionnement du site (langue, thème, choix de consentement) sont déposés sans votre accord. La mesure d’audience n’est activée qu’après acceptation.</p><p><button class="btn sm" type="button" data-cookie-open>Gérer mes préférences</button></p>',
      en: '<p>Only cookies required for the site to work (language, theme, consent choice) are set without your agreement. Analytics are enabled only after you accept.</p><p><button class="btn sm" type="button" data-cookie-open>Manage my preferences</button></p>',
    },
  },
  {
    id: 'droits', title: { fr: 'Vos droits', en: 'Your rights' },
    body: {
      fr: '<p>Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Écrivez à <a href="mailto:{{dpo}}">{{dpo}}</a>. Vous pouvez aussi introduire une réclamation auprès de la CNIL.</p>',
      en: '<p>You have the right of access, rectification, erasure, restriction, objection and portability. Email <a href="mailto:{{dpo}}">{{dpo}}</a>. You may also lodge a complaint with the CNIL.</p>',
    },
  },
];

export const DISCLOSURE: Section[] = [
  {
    id: 'contact', title: { fr: 'Comment nous contacter', en: 'How to reach us' },
    body: {
      fr: '<p>Écrivez à <a href="mailto:{{security}}">{{security}}</a> avec une description, les étapes de reproduction et l’impact estimé. Chiffrez votre message avec notre clé PGP si nécessaire (empreinte : [à compléter]).</p>',
      en: '<p>Email <a href="mailto:{{security}}">{{security}}</a> with a description, reproduction steps and estimated impact. Encrypt with our PGP key if needed (fingerprint: [to complete]).</p>',
    },
  },
  {
    id: 'engagements', title: { fr: 'Nos engagements', en: 'Our commitments' },
    body: {
      fr: '<ul><li>Accusé de réception sous <strong>24 h</strong>.</li><li>Évaluation initiale sous <strong>5 jours ouvrés</strong>.</li><li>Information sur la correction et crédit public si vous le souhaitez.</li><li>Aucune poursuite pour une recherche menée de bonne foi dans ce cadre.</li></ul>',
      en: '<ul><li>Acknowledgement within <strong>24 hours</strong>.</li><li>Initial assessment within <strong>5 business days</strong>.</li><li>Updates on the fix and public credit if you wish.</li><li>No legal action for good-faith research within this policy.</li></ul>',
    },
  },
  {
    id: 'perimetre', title: { fr: 'Périmètre', en: 'Scope' },
    body: {
      fr: '<p>Inclus : <code>*.synapse-medical.fr</code>, l’application EDC et l’API. Exclus : déni de service, ingénierie sociale, tests physiques, accès à des données réelles de patients.</p><div class="callout">Utilisez uniquement l’environnement <code>uat.synapse-medical.fr</code> et vos propres comptes de test.</div>',
      en: '<p>In scope: <code>*.synapse-medical.fr</code>, the EDC application and the API. Out of scope: denial of service, social engineering, physical testing, access to real patient data.</p><div class="callout">Only use the <code>uat.synapse-medical.fr</code> environment and your own test accounts.</div>',
    },
  },
  {
    id: 'securitytxt', title: 'security.txt',
    body: {
      fr: '<p>Notre fichier est publié à l’adresse standard <code>/.well-known/security.txt</code> (RFC 9116).</p>',
      en: '<p>Our file is published at the standard <code>/.well-known/security.txt</code> location (RFC 9116).</p>',
    },
  },
];
