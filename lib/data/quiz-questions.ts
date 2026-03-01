import type { QuizQuestion } from '@/lib/types'

// Positions : 1 = Pour, 0 = Neutre / Pas de position claire, -1 = Contre

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    theme: 'Sécurité',
    text: "La Ville de Paris doit étendre son réseau de vidéosurveillance dans l'espace public.",
    positions: { gregoire: 0, knafo: 1, bournazel: 1, dati: 1, mariani: 1, chikirou: -1 },
    context: {
      description:
        "Paris dispose d'environ 4 000 caméras gérées par la Préfecture de Police sur la voie publique, auxquelles s'ajoutent 1 400 caméras municipales sur les équipements de la Ville. La gestion est partagée entre l'État via la Préfecture de Police et la mairie. En densité, Paris compte 15 caméras par km², contre 440 à Londres et 4 à Madrid. En nombre par habitant, Paris affiche 4 caméras pour 1 000 habitants, contre 68 à Londres et 4,4 à Madrid.",
      pour: [
        'Effet dissuasif documenté sur certains délits : vols à la tire, dégradations.',
        "Facilite l'identification de suspects après un crime et accélère les enquêtes.",
        'Déjà déployée massivement dans les transports en commun avec des résultats mesurables sur la sécurité.',
      ],
      contre: [
        "L'effet sur la baisse globale de la criminalité reste scientifiquement contesté, peu d'études prouvent un lien direct.",
        "Coût élevé : entre 15 000 et 25 000€ par caméra à l'installation, hors maintenance.",
        "La compétence appartient largement à l'État via la Préfecture, la marge de manœuvre du maire est donc limitée.",
      ],
    },
  },
  {
    id: 2,
    theme: 'Logement',
    text: 'La location de logements de courte durée (type Airbnb) doit être interdite à Paris.',
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: 0, mariani: 0, chikirou: 1 },
    context: {
      description:
        "Paris est la première ville mondiale sur Airbnb avec environ 90 000 logements listés. La réglementation actuelle limite déjà les résidences principales à 120 nuits de location par an. Les résidences secondaires peuvent être louées sans limite si la mairie délivre une autorisation de changement d'usage, ce qui est rare. La mairie estime que 20 000 à 30 000 logements ont été retirés du marché locatif classique au profit de la location touristique.",
      pour: [
        'Réduit la pression sur le marché locatif et pourrait libérer des milliers de logements pour les résidents permanents.',
        'Plusieurs villes européennes ayant restreint Airbnb (Amsterdam, Barcelone) ont observé une baisse des loyers dans certains quartiers.',
        'Limite la "muséification" de certains arrondissements où les habitants permanents sont remplacés par des touristes.',
      ],
      contre: [
        "Prive les propriétaires d'un revenu complémentaire légal, notamment les petits propriétaires et retraités.",
        "L'impact réel sur les loyers est débattu : la crise du logement à Paris est aussi liée au manque de construction et aux taux d'intérêt.",
        "Une interdiction totale serait juridiquement complexe et difficile à contrôler sans moyens d'inspection massifs.",
      ],
    },
  },
  {
    id: 3,
    theme: 'Logement',
    text: 'La Ville de Paris doit augmenter la part de logements sociaux dans ses nouveaux programmes de construction.',
    positions: { gregoire: 1, knafo: 0, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
    context: {
      description:
        "Paris compte aujourd'hui environ 270 000 logements sociaux, soit 25% du parc total. La loi SRU impose un minimum de 25% de logements sociaux dans les communes de plus de 3 500 habitants. Paris est donc dans les clous légaux, mais 270 000 ménages sont actuellement sur liste d'attente pour un logement social à Paris, avec un délai moyen d'attente de 11 ans.",
      pour: [
        "La liste d'attente de 270 000 ménages illustre un besoin réel non satisfait par le marché privé.",
        'Permet de maintenir une mixité sociale dans une ville où le prix moyen au m² dépasse 10 000€.',
        "Les logements sociaux sont soumis à l'encadrement des loyers, ce qui tire mécaniquement les loyers du voisinage vers le bas.",
      ],
      contre: [
        "Paris manque de foncier disponible : construire plus implique de densifier davantage ou de démolir de l'existant.",
        'Un logement social coûte en moyenne 150 000€ à construire pour la collectivité, ce qui pèse lourd sur le budget municipal.',
        'Certains économistes estiment que libérer le marché privé et faciliter la construction libre serait plus efficace pour faire baisser les loyers.',
      ],
    },
  },
  {
    id: 4,
    theme: 'Logement',
    text: "Paris doit renforcer l'encadrement des loyers dans le parc locatif privé.",
    positions: { gregoire: 1, knafo: -1, bournazel: 0, dati: -1, mariani: -1, chikirou: 1 },
    context: {
      description:
        "Paris applique l'encadrement des loyers depuis 2019. Le dispositif fixe un loyer de référence par type de logement et par quartier, avec un plafond à 20% au-dessus de ce référence. En 2023, la DRIHL estimait que 30 à 40% des annonces dépassaient encore ce plafond. Les propriétaires contrevenants s'exposent à une amende maximale de 5 000€ pour un particulier et 15 000€ pour une personne morale. Le contrôle repose principalement sur les locataires eux-mêmes qui doivent saisir une commission.",
      pour: [
        'Protège directement les locataires les plus fragiles dans un marché où le loyer moyen dépasse 30€ par m².',
        'Berlin, qui a expérimenté un dispositif similaire, a observé une stabilisation des loyers dans les zones concernées.',
        "Le taux élevé de non-conformité actuel suggère que le dispositif existe mais manque de moyens d'application.",
      ],
      contre: [
        "Plusieurs études économiques montrent que l'encadrement strict réduit l'offre locative : certains propriétaires préfèrent vendre ou laisser vacant plutôt que louer à perte.",
        "Le contrôle est aujourd'hui quasi inexistant faute d'inspecteurs : renforcer le cadre sans renforcer les moyens de contrôle ne changerait rien.",
        "Risque de dégradation du parc locatif privé si les propriétaires n'ont plus les moyens d'entretenir leurs biens avec des loyers plafonnés.",
      ],
    },
  },
  {
    id: 5,
    theme: 'Transports',
    text: 'La rue de Rivoli doit être rouverte à la circulation automobile.',
    positions: { gregoire: -1, knafo: 1, bournazel: -1, dati: 1, mariani: 1, chikirou: -1 },
    context: {
      description:
        "La rue de Rivoli a été fermée aux voitures entre le Louvre et l'Hôtel de Ville en 2021, dans le cadre du plan vélo de la mairie. Elle accueille aujourd'hui une piste cyclable bidirectionnelle et reste accessible aux bus, taxis et livraisons. Avant la fermeture, elle était l'un des axes les plus fréquentés de Paris avec environ 30 000 véhicules par jour. Depuis, une partie du trafic s'est reportée sur les quais, la rue Saint-Antoine et les boulevards parallèles.",
      pour: [
        'Le report de trafic sur les rues adjacentes a augmenté la congestion et la pollution dans ces zones.',
        'Rivoli est un axe structurant est-ouest indispensable pour les livraisons, les artisans et les professionnels de santé.',
        'Plusieurs commerçants du secteur ont signalé une baisse de fréquentation depuis la fermeture.',
      ],
      contre: [
        "La piste cyclable de Rivoli est aujourd'hui l'une des plus fréquentées de Paris avec plus de 10 000 cyclistes par jour.",
        "Les études de trafic montrent que la suppression d'un axe routier ne génère pas toujours un report équivalent : une partie des automobilistes change de mode de transport.",
        "La qualité de l'air rue de Rivoli s'est améliorée depuis la fermeture, bénéficiant aux riverains et aux millions de touristes qui la fréquentent.",
      ],
    },
  },
  {
    id: 6,
    theme: 'Transports',
    text: "La Ville de Paris doit cesser l'extension de son réseau de pistes cyclables.",
    positions: { gregoire: -1, knafo: 1, bournazel: -1, dati: 0, mariani: 1, chikirou: -1 },
    context: {
      description:
        "Paris comptait 1 000 km de pistes cyclables en 2020. Ce réseau dépasse aujourd'hui 1 100 km après les aménagements liés aux JO 2024. La pratique du vélo a augmenté de 60% entre 2019 et 2023 selon les compteurs de la mairie. Chaque kilomètre de piste cyclable coûte en moyenne 1 à 2 millions d'euros à aménager. La part modale du vélo à Paris est passée de 3% à environ 11% des déplacements en quelques années.",
      pour: [
        'Le réseau existant couvre déjà les grands axes structurants, les extensions supplémentaires ont un rendement décroissant.',
        'La création de pistes implique souvent la suppression de voies de circulation ou de stationnement, aggravant la congestion pour les autres usagers.',
        "Les budgets pourraient être redirigés vers l'entretien du réseau existant plutôt que vers de nouvelles infrastructures.",
      ],
      contre: [
        "Le réseau reste discontinu dans de nombreux arrondissements périphériques, notamment dans l'est parisien, laissant des cyclistes sans infrastructure sécurisée.",
        'Paris reste très en retard par rapport aux grandes capitales européennes cyclables : Amsterdam compte 800 km de pistes pour une ville 5 fois moins peuplée.',
        "Stopper l'extension fige les inégalités territoriales entre les arrondissements du centre bien équipés et ceux de la périphérie qui le sont peu.",
      ],
    },
  },
  {
    id: 7,
    theme: 'Transports',
    text: 'La limitation de vitesse sur le boulevard périphérique doit rester à 50 km/h.',
    positions: { gregoire: 1, knafo: -1, bournazel: -1, dati: -1, mariani: -1, chikirou: 1 },
    context: {
      description:
        "Le boulevard périphérique est long de 35 km et supporte environ 1,1 million de véhicules par jour, ce qui en fait l'axe routier le plus fréquenté de France. La vitesse a été abaissée de 70 à 50 km/h en 2024 par la mairie de Paris. Cet abaissement est contesté par les communes riveraines et la Préfecture de Police, qui estiment que la décision relève de l'État et non de la mairie. Une bataille juridique est en cours sur la compétence de la mairie à prendre cette décision.",
      pour: [
        'La réduction de vitesse a entraîné une baisse mesurée du bruit de 1 à 2 décibels, bénéficiant aux 150 000 riverains qui vivent le long du périphérique.',
        "Le nombre d'accidents graves sur le périphérique a diminué depuis l'abaissement selon les premières données de la Préfecture.",
        "A 50 km/h le flux de véhicules est plus régulier et réduit les phénomènes d'accordéon qui génèrent des embouteillages.",
      ],
      contre: [
        "L'allongement des temps de trajet augmente mécaniquement les émissions de CO2 : un moteur qui tourne plus longtemps consomme plus.",
        'Le périphérique est un axe de transit utilisé massivement par les travailleurs et livreurs de la banlieue vers Paris, qui subissent un allongement de trajet sans bénéficier des avantages pour les riverains parisiens.',
        'La décision a été prise unilatéralement par la mairie de Paris sans concertation avec les communes riveraines qui supportent pourtant une partie des nuisances.',
      ],
    },
  },
  {
    id: 8,
    theme: 'Finances',
    text: 'La Ville de Paris doit réduire ses impôts locaux.',
    positions: { gregoire: -1, knafo: 1, bournazel: 0, dati: 1, mariani: 1, chikirou: -1 },
    context: {
      description:
        "Paris perçoit principalement la taxe foncière, la taxe d'habitation sur les résidences secondaires et la cotisation foncière des entreprises. La taxe foncière parisienne est de 19,02% en 2024, contre une moyenne nationale d'environ 37-39% pour les grandes villes françaises. Paris a donc un taux de taxe foncière relativement modéré par rapport à la moyenne des grandes villes. La dette de la Ville de Paris dépasse 9 milliards d'euros en 2025. Le budget annuel de la mairie est d'environ 10 milliards d'euros.",
      pour: [
        'Le taux de taxe foncière pourrait baisser sans mettre en danger les finances de la ville si des économies structurelles sont réalisées en parallèle.',
        "Paris dispose d'une base fiscale exceptionnellement large grâce à la valeur élevée de son foncier, ce qui offre des marges de manœuvre.",
        "Une baisse des impôts sur les entreprises renforcerait l'attractivité économique de Paris face à la concurrence d'autres métropoles européennes.",
      ],
      contre: [
        "Avec 9 milliards d'euros de dette et des besoins d'investissement massifs, une baisse des recettes fiscales contraindrait les services publics municipaux.",
        "Le taux parisien est déjà parmi les plus bas de France, ce qui relativise l'argument d'une fiscalité excessive.",
        'Les recettes fiscales financent directement les crèches, la voirie, les équipements sportifs et culturels dont bénéficient tous les Parisiens.',
      ],
    },
  },
  {
    id: 9,
    theme: 'Finances',
    text: 'Le nombre de fonctionnaires municipaux doit être réduit.',
    positions: { gregoire: -1, knafo: 1, bournazel: 1, dati: 1, mariani: 0, chikirou: -1 },
    context: {
      description:
        "La Ville de Paris emploie environ 55 000 agents municipaux, ce qui en fait le deuxième employeur public de France après l'État. Cela représente environ 25 agents pour 1 000 habitants, contre une moyenne nationale de 18 pour 1 000 habitants dans les grandes villes. La masse salariale représente environ 3,5 milliards d'euros par an, soit 35% du budget total de la mairie. Entre 2014 et 2024, les effectifs ont augmenté d'environ 5 000 agents.",
      pour: [
        'La masse salariale est le premier poste de dépense de la mairie : une réduction des effectifs permettrait de dégager des marges budgétaires significatives.',
        "Le ratio agents par habitant est supérieur à la moyenne des grandes villes françaises, ce qui suggère une marge d'optimisation possible.",
        "Plusieurs services municipaux pourraient être externalisés ou mutualisés avec d'autres collectivités à moindre coût.",
      ],
      contre: [
        'Une grande partie des agents municipaux assure des services de proximité essentiels : crèches, écoles, espaces verts, propreté, aide sociale.',
        'Les suppressions de postes dans la fonction publique locale se traduisent généralement par une dégradation directe et visible des services du quotidien.',
        "La comparaison avec d'autres villes est difficile car Paris cumule des compétences que d'autres communes délèguent à des structures intercommunales.",
      ],
    },
  },
  {
    id: 10,
    theme: 'Services',
    text: 'La Ville de Paris doit confier le nettoyage des rues à des prestataires privés.',
    positions: { gregoire: -1, knafo: 1, bournazel: 1, dati: 0, mariani: 0, chikirou: -1 },
    context: {
      description:
        "La propreté des rues de Paris est assurée par la Direction de la Propreté et de l'Eau (DPE), qui emploie environ 7 000 agents municipaux. Le budget annuel consacré à la propreté dépasse 600 millions d'euros. Paris est régulièrement classée parmi les capitales européennes les moins bien notées sur la propreté par les voyageurs étrangers. Certaines prestations sont déjà partiellement externalisées, notamment le nettoiement de certains marchés et événements. Plusieurs grandes villes françaises comme Lyon ou Bordeaux ont choisi un modèle mixte public-privé.",
      pour: [
        'Les villes ayant externalisé tout ou partie du nettoiement ont pu introduire des obligations de résultat contractuelles absentes dans la gestion publique directe.',
        "La mise en concurrence de prestataires permet théoriquement de réduire les coûts ou d'améliorer la qualité pour un budget équivalent.",
        "Un prestataire privé peut être sanctionné ou remplacé en cas de mauvaise performance, ce qui n'est pas possible avec des agents titulaires.",
      ],
      contre: [
        "Les expériences d'externalisation dans d'autres villes montrent que les économies initiales sont souvent absorbées par les coûts de contrôle et de gestion des contrats.",
        'La privatisation fragilise les conditions de travail des agents, souvent requalifiés en employés précaires chez le prestataire.',
        'La propreté est un service dont la qualité varie fortement selon les quartiers : un prestataire privé tend à concentrer ses efforts sur les zones les plus visibles au détriment des quartiers populaires.',
      ],
    },
  },
  {
    id: 11,
    theme: 'Patrimoine',
    text: 'La Ville de Paris doit vendre le Parc des Princes au Paris Saint-Germain.',
    positions: { gregoire: -1, knafo: 1, bournazel: 1, dati: 1, mariani: -1, chikirou: -1 },
    context: {
      description:
        "Le Parc des Princes est propriété de la Ville de Paris depuis 1972. Le PSG en est locataire et verse un loyer annuel d'environ 2,5 millions d'euros. Le stade a une capacité de 47 929 places et date de 1972. Le PSG souhaite devenir propriétaire pour financer des travaux d'agrandissement et de modernisation, sans lesquels il envisage de construire un nouveau stade en banlieue, notamment à Massy ou Poissy. La valeur théorique du stade est estimée à plus d'un milliard d'euros par certains experts, mais les offres évoquées du côté qatari seraient autour de 40 à 50 millions d'euros, soit un écart considérable. Le Conseil de Paris a voté en 2023 la patrimonialisation du stade, ce qui complique juridiquement une vente.",
      pour: [
        "Vendre permettrait de garder le PSG à Paris et d'éviter un déménagement en banlieue qui priverait la ville d'un club emblématique et de ses retombées économiques.",
        "Un accord de vente pourrait inclure des contreparties pour les Parisiens : rénovation d'équipements sportifs de proximité, espaces verts, accès public au site.",
        'Le PSG propriétaire pourrait investir massivement dans la rénovation du stade sans dépendre du budget municipal.',
      ],
      contre: [
        "L'écart entre la valeur réelle du stade et le prix proposé par le PSG est abyssal, ce qui soulève des questions sur la rentabilité de l'opération pour la Ville.",
        "Vendre un équipement public financé par les contribuables à un club détenu par un fonds souverain étranger pose la question de l'intérêt général.",
        "Une fois vendu, la Ville perd tout contrôle sur l'usage du site et sur son avenir en cas de revente ou de départ du club.",
      ],
    },
  },
]
