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

- get_inscrits (besoin aussi des groupes)

- update_inscrit 
	dic (id_groupe, bus, semaine, mail, materiel_ski)

- save groupe
	liste groupe,mode = 'save', 'save_apply', 'save_apply_erase'

- download_liste
	mode , options

## Details du camp

- get
	dic_form, dic_envois

- save _details
	dic_form

- save_envois (save + notification centre d'inscriptions)

