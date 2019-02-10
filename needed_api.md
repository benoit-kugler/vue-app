# Needed api URLS 

## Equipe

- get_documents : all docs meta data
	[ {cat_doc : {docs : [], need : bool}, id (participant), is_temporaire}  ]
- update_documents : update all requirement
	[ {cat_doc : bool, id (participant), is_temporaire} ]
- get_document : download one doc
	id_doc
- get_all_docs : download all docs
	only_requis : bool

- recherche_equipier
	dic_search

- rattache_equipier 
	id_personne

- cree_equipier_temporaire 
	dic_participant

- delete_equipier
	id_participant, is_temporaire

- modifie_equipier
	dic_participant

- download liste_equipe


## Inscrits

- get_inscrits