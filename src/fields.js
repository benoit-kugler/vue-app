export { DIPLOMES, MixinRenderFields, MixinEditFields };

const DIPLOMES = {
    bafa: "BAFA Titulaire",
    bafa_stag: "BAFA Stagiaire",
    bafd: "BAFD titulaire",
    bafd_stag: "BAFD stagiaire",
    cap: "CAP petit enfance",
    ass_sociale: "Assitante Sociale",
    educ_spe: "Educ. spé.",
    mon_educ: "Moniteur educateur",
    instit: "Professeur des écoles",
    prof: "Enseignant du secondaire",
    agreg: "Agrégé",
    bjeps: "BPJEPS",
    dut: "DUT carrière sociale",
    eje: "EJE",
    deug: "DEUG",
    staps: "STAPS",
    bapaat: "BAPAAT",
    beatep: "BEATEP",
    zzautre: "AUTRE"
};

const DOCUMENTS = {
    bafa: "BAFA",
    bafd: "BAFD",
    permis: "Permis de conduire",
    sb: "Surveillant de baignade",
    secour: "Secourisme (PSC1 - AFPS)",
    bafd_equiv: "Equivalent BAFD",
    bafa_equiv: "Equivalent BAFA",
    vaccin: "Vaccin",
    fiche_sanitaire: "Fiche sanitaire",
    carte_vitale: "Carte Vitale",
    test_nautique: "Test nautique",
    haccp: "Cuisine (HACCP)",
    autre: "Autre"
};

const APPROFONDISSEMENTS = {
    aucun: "Non effectué",
    autre: "Approfondissement",
    sb: "Surveillant de beignade",
    canoe: "Canoë - Kayak",
    voile: "Voile",
    moto: "Loisirs motocyclistes"
};

const ROLES = {
    _chauffeur: "Chauffeur",
    _intend: "Intendance",
    _babysiter: "Baby-sitter",
    _anim: "Animation",
    _aideanim: "Aide-animateur",
    _men: "Ménage",
    _dir: "Direction",
    _adjoint: "Adjoint",
    _factotum: "Factotum",
    _infirm: "Infirmière",
    _cuis: "Cuisine",
    _ling: "Lingerie",
    _autre: "Autre",
    _campeur: "Campeur",
    _attente: "Liste d'attente",
    _attente_reponse: "En attente d'une réponse"
};

const SEXE = {
    M: "Masculin",
    F: "Féminin"
};

const DEPARTEMENTS = {
    "00": "Inconnu",
    "01": "Ain",
    "02": "Aisne",
    "03": "Allier",
    "04": "Alpes-de-Haute-Provence",
    "05": "Hautes-Alpes",
    "06": "Alpes-Maritimes",
    "07": "Ardèche",
    "08": "Ardennes",
    "09": "Ariège",
    "10": "Aube",
    "11": "Aude",
    "12": "Aveyron",
    "13": "Bouches-du-Rhône",
    "14": "Calvados",
    "15": "Cantal",
    "16": "Charente",
    "17": "Charente-Maritime",
    "18": "Cher",
    "19": "Corrèze",
    "2A": "Corse-du-Sud",
    "2B": "Haute-Corse",
    "21": "Côte-d'Or",
    "22": "Côtes-d'Armor",
    "23": "Creuse",
    "24": "Dordogne",
    "25": "Doubs",
    "26": "Drôme",
    "27": "Eure",
    "28": "Eure-et-Loir",
    "29": "Finistère",
    "30": "Gard",
    "31": "Haute-Garonne",
    "32": "Gers",
    "33": "Gironde",
    "34": "Hérault",
    "35": "Ille-et-Vilaine",
    "36": "Indre",
    "37": "Indre-et-Loire",
    "38": "Isère",
    "39": "Jura",
    "40": "Landes",
    "41": "Loir-et-Cher",
    "42": "Loire",
    "43": "Haute-Loire",
    "44": "Loire-Atlantique",
    "45": "Loiret",
    "46": "Lot",
    "47": "Lot-et-Garonne",
    "48": "Lozère",
    "49": "Maine-et-Loire",
    "50": "Manche",
    "51": "Marne",
    "52": "Haute-Marne",
    "53": "Mayenne",
    "54": "Meurthe-et-Moselle",
    "55": "Meuse",
    "56": "Morbihan",
    "57": "Moselle",
    "58": "Nièvre",
    "59": "Nord",
    "60": "Oise",
    "61": "Orne",
    "62": "Pas-de-Calais",
    "63": "Puy-de-Dôme",
    "64": "Pyrénées-Atlantiques",
    "65": "Hautes-Pyrénées",
    "66": "Pyrénées-Orientales",
    "67": "Bas-Rhin",
    "68": "Haut-Rhin",
    "69": "Rhône",
    "70": "Haute-Saône",
    "71": "Saône-et-Loire",
    "72": "Sarthe",
    "73": "Savoie",
    "74": "Haute-Savoie",
    "75": "Paris",
    "76": "Seine-Maritime",
    "77": "Seine-et-Marne",
    "78": "Yvelines",
    "79": "Deux-Sèvres",
    "80": "Somme",
    "81": "Tarn",
    "82": "Tarn-et-Garonne",
    "83": "Var",
    "84": "Vaucluse",
    "85": "Vendée",
    "86": "Vienne",
    "87": "Haute-Vienne",
    "88": "Vosges",
    "89": "Yonne",
    "90": "Territoire de Belfort",
    "91": "Essonne",
    "92": "Hauts-de-Seine",
    "93": "Seine-Saint-Denis",
    "94": "Val-de-Marne",
    "95": "Val-d'Oise",
    "971": "Guadeloupe",
    "972": "Martinique",
    "973": "Guyane",
    "974": "La Réunion",
    "976": "Mayotte"
};
var MixinRenderFields = {
    methods: {
        role: value => ROLES[value],
        document: value => DOCUMENTS[value],
        approfondissement: value => APPROFONDISSEMENTS[value],
        diplome: value => DIPLOMES[value],
        date: value =>
            value ? `${value.day}/${value.month}/${value.year}` : "-",
        sexe: value => SEXE[value],
        telephones: value => (value ? value.join(" ; ") : "-"),
        bool: value => (value ? "Oui" : "Non"),
        departement: value => `${value} - ${DEPARTEMENTS[value]}`
    }
};

var MixinEditFields = {
    data() {
        return {
            EDIT: {
                sexe: Object.keys(SEXE).map(k => ({ value: k, text: SEXE[k] }))
            }
        };
    }
};
