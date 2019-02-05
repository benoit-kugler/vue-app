import Accueil from "./components/Accueil.vue";
import Equipe from "./components/Equipe.vue";

const links = {
    index: {
        path: "/directeurs",
        title: "Accueil",
        description: "Page d'accueil."
	},
	participants: {
        path: "/directeurs/participants",
        title: "Participants",
        description: "Accès à la liste des inscrits."
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
    }
];
