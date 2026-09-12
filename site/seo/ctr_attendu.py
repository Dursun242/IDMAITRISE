# -*- coding: utf-8 -*-
"""Courbe de CTR moyen par position dans les résultats Google.

Sert de référence pour deux choses :
  - estimer le gain de clics si une requête gagne des positions ;
  - repérer les pages bien placées mais mal cliquées (titre ou meta à revoir).

Valeurs issues des études publiques agrégées. Elles ne sont pas une vérité
absolue : les positions réelles varient selon le secteur et la présence de
blocs Google (pack local, questions, annonces). Elles servent de repère
comparatif, pas de prévision.
"""

COURBE = {
    1: 0.274, 2: 0.152, 3: 0.099, 4: 0.070, 5: 0.053,
    6: 0.042, 7: 0.034, 8: 0.029, 9: 0.025, 10: 0.022,
    11: 0.019, 12: 0.017, 13: 0.015, 14: 0.014, 15: 0.013,
    16: 0.012, 17: 0.011, 18: 0.010, 19: 0.009, 20: 0.009,
}


def ctr_attendu(position: float) -> float:
    """CTR moyen attendu à cette position."""
    p = max(1, int(round(position)))
    if p in COURBE:
        return COURBE[p]
    if p <= 30:
        return 0.008
    if p <= 50:
        return 0.004
    return 0.002


def clics_potentiels(impressions: float, position_actuelle: float, position_visee: int = 5) -> float:
    """Clics supplémentaires si la requête atteignait la position visée.

    On raisonne à impressions constantes, ce qui est prudent : en montant dans
    les résultats, une requête gagne aussi des impressions.
    """
    if position_actuelle <= position_visee:
        return 0.0
    return impressions * (ctr_attendu(position_visee) - ctr_attendu(position_actuelle))
