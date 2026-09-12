# Checklist de bascule

## Avant

- [ ] `npm run build` passe sans erreur
- [ ] Domaine d'envoi authentifié dans Resend (SPF + DKIM), sinon les
      demandes de devis partent en spam
- [ ] Formulaire testé en conditions réelles : e-mail bien reçu
- [ ] Variables d'environnement renseignées sur Vercel
- [ ] Fiche Google Business Profile à jour, avec le **même** nom, la même
      adresse et le même téléphone que le site (toute divergence affaiblit
      le référencement local)

## Jour J

- [ ] Sauvegarde de l'ancien site avant coupure
- [ ] Bascule DNS
- [ ] Vérifier 10 redirections P1 du CSV avec `curl -I`
- [ ] Soumettre le sitemap dans la Search Console
- [ ] Demander l'indexation des 6 pages prioritaires

## Après — semaines 1 à 4

- [ ] Rapport Pages de la Search Console : surveiller les 404
- [ ] Toute 404 avec du trafic → ajouter la redirection dans
      `lib/redirections.json` et redéployer
- [ ] Vérifier l'affichage des rich results FAQ (test des résultats enrichis)

## Ce qui fait vraiment monter les demandes de devis

Par ordre d'impact décroissant, d'après la structure du site :

1. **Avis Google.** Le pack local se joue là. Demander un avis à chaque
   client satisfait, systématiquement, à la réception des travaux.
2. **Photos de chantier.** Chaque page de réalisation avec des photos
   réelles convertit plusieurs fois mieux qu'une page sans visuel.
3. **Répondre vite.** La promesse « 48 h » est affichée partout sur le site.
   Elle doit être tenue : un lead recontacté sous 24 h se transforme
   nettement mieux.
4. **Écrire le contenu manquant.** Les pages qui ont des impressions sans
   clic sont celles où le contenu est le plus faible.
