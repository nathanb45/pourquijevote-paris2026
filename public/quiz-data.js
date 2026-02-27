// ⚠️ POSITIONS À VALIDER
// Positions assignées par IA à partir des programmes — à vérifier avant mise en ligne
// 1 = Pour, 0 = Neutre / Pas de position claire, -1 = Contre

const CANDIDATES = [
  { id: 'gregoire',  name: 'Emmanuel Grégoire', party: 'PS',         color: '#E91E8C' },
  { id: 'knafo',     name: 'Sarah Knafo',        party: 'Reconquête', color: '#1A237E' },
  { id: 'bournazel', name: 'P.-Y. Bournazel',    party: 'Renaissance',color: '#FF8C00' },
  { id: 'dati',      name: 'Rachida Dati',        party: 'LR',         color: '#0066CC' },
  { id: 'mariani',   name: 'Thierry Mariani',     party: 'RN',         color: '#003189' },
  { id: 'chikirou',  name: 'Sophia Chikirou',     party: 'LFI',        color: '#CC0000' },
];

const QUESTIONS = [
  {
    id: 1,
    theme: 'Logement',
    text: 'Paris doit construire davantage de logements sociaux dans tous les arrondissements.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
  {
    id: 2,
    theme: 'Logement',
    text: 'La mairie doit plafonner les loyers privés à Paris.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
  {
    id: 3,
    theme: 'Logement',
    text: 'Les locations de courte durée (type Airbnb) doivent être strictement limitées à Paris.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: 0, mariani: -1, chikirou: 1 },
  },
  {
    id: 4,
    theme: 'Sécurité',
    text: 'Paris doit renforcer sa police municipale avec davantage d\'agents dans les rues.',
    positions: { gregoire: 0, knafo: 1, bournazel: 1, dati: 1, mariani: 1, chikirou: -1 },
  },
  {
    id: 5,
    theme: 'Sécurité',
    text: 'La vidéosurveillance doit être étendue dans les rues et espaces publics de Paris.',
    positions: { gregoire: 0, knafo: 1, bournazel: 1, dati: 1, mariani: 1, chikirou: -1 },
  },
  {
    id: 6,
    theme: 'Transports',
    text: 'Paris doit réduire la place de la voiture en créant davantage de zones piétonnes.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
  {
    id: 7,
    theme: 'Transports',
    text: 'Le développement des pistes cyclables doit être une priorité absolue de la prochaine mandature.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
  {
    id: 8,
    theme: 'Impôts & finances',
    text: 'La taxe foncière doit être réduite pour alléger la charge des propriétaires parisiens.',
    positions: { gregoire: -1, knafo: 1, bournazel: 1, dati: 1, mariani: 1, chikirou: -1 },
  },
  {
    id: 9,
    theme: 'Impôts & finances',
    text: 'Paris doit réduire ses dépenses publiques pour assainir ses finances.',
    positions: { gregoire: -1, knafo: 1, bournazel: 0, dati: 1, mariani: 1, chikirou: -1 },
  },
  {
    id: 10,
    theme: 'Écoles & cantines',
    text: 'Les cantines scolaires parisiennes doivent proposer des repas végétariens plusieurs fois par semaine.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
  {
    id: 11,
    theme: 'Écologie',
    text: 'Paris doit planter massivement des arbres et végétaliser ses rues et toitures.',
    positions: { gregoire: 1, knafo: 0, bournazel: 1, dati: 0, mariani: 0, chikirou: 1 },
  },
  {
    id: 12,
    theme: 'Pauvreté & SDF',
    text: 'La mairie doit augmenter ses dépenses pour l\'hébergement d\'urgence des personnes sans-abri.',
    positions: { gregoire: 1, knafo: 0, bournazel: 0, dati: 0, mariani: -1, chikirou: 1 },
  },
  {
    id: 13,
    theme: 'Immigration',
    text: 'Paris doit continuer à accueillir et accompagner les migrants sur son territoire.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
  {
    id: 14,
    theme: 'Santé',
    text: 'Paris doit financer des centres de santé municipaux gratuits dans chaque arrondissement.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: 0, mariani: -1, chikirou: 1 },
  },
  {
    id: 15,
    theme: 'Culture & nuit',
    text: 'La vie nocturne et les clubs parisiens doivent bénéficier d\'un soutien municipal renforcé.',
    positions: { gregoire: 1, knafo: -1, bournazel: 1, dati: 0, mariani: -1, chikirou: 1 },
  },
  {
    id: 16,
    theme: 'Économie',
    text: 'Paris doit faciliter l\'implantation de nouvelles entreprises et commerces pour dynamiser l\'économie.',
    positions: { gregoire: 0, knafo: 1, bournazel: 1, dati: 1, mariani: 1, chikirou: -1 },
  },
  {
    id: 17,
    theme: 'Démocratie',
    text: 'Les grands projets d\'aménagement de Paris doivent être soumis au vote direct des Parisiens.',
    positions: { gregoire: 1, knafo: 0, bournazel: 1, dati: 0, mariani: 0, chikirou: 1 },
  },
  {
    id: 18,
    theme: 'Logement',
    text: 'La mairie doit utiliser son droit de préemption pour racheter des logements et les louer à prix social.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
  },
];
