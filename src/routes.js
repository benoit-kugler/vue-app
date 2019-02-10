import Accueil from "./components/Accueil.vue";
import Equipe from "./components/equipe/Equipe.vue";
import Inscrits from "./components/inscrits/Inscrits.vue";
import Details from "./components/details/Details.vue";


const links = {
    index: {
        path: "/directeurs",
        title: "Accueil",
        description: "Page d'accueil."
	},
	inscrits: {
        path: "/directeurs/inscrits",
        title: "Inscrits",
        description: "Accès à la liste des inscrits et aux groupes."
    },
    equipe: {
        path: "/directeurs/equipe",
        title: "Equipe",
        description: "Accès aux informations de l'équipe et aux documents."
    },
    lettre: {
        path: "/directeurs/lettre",
        title: "Lettre du directeur",
        description:
            "Accès à la lettre envoyée au parent pendant le processus d'inscription."
    },
    vetements: {
        path: "/directeurs/vetements",
        title: "Liste de vêtements",
        description: "Accès à la liste de vêtements demandés au participant."
    },
    details: {
        path: "/directeurs/details",
        title: "Détails du camp",
        description: "Accès aux informations du camp."
    },
    photos: {
        path: "/directeurs/photos",
        title: "Album photos",
        description: "Accès à l'album photos Joomeo dédié au camp."
    }
};

export const routes = [
    {
        path: links.index.path,
        component: Accueil,
        props: { links: links },
        meta: { title: links.index.title }
    },
    {
        path: links.equipe.path,
        component: Equipe,
        meta: { title: links.equipe.title }
	},
	{
        path: links.inscrits.path,
		component: Inscrits,
        meta: { title: links.inscrits.title }
	},
	{
        path: links.details.path,
		component: Details,
        meta: { title: links.details.title }
	},
];
