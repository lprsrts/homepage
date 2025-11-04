---
title: Insel-Himmel Bild für Skalerfeldern
date: 2025-08-27T00:00:00.000Z
slug: 2025-08-27-insel-himmel-bild-fuer-skalarfeldern
excerpt: Der Gradient des Punktförmigen Coulomfelds ist null.
---


Stell die Ladungsdichte $$\rho(\vec{r})$$ als Landschaft vor. Höhe als Wert von $$\rho$$, Inseln als Bereiche hoher Ladungsdichte. Der Gradient ist der Vektor, der dir an jedem Punkt zeigt, wohin es am steilsten bergauf geht, aber ganz lokal. Der Gradient weiß nur, was direkt in deiner Nachbarschaft passiert.

![Der Normalverteilte Ladungsdichte](/sketches/normal-distributed-charge-density.jpeg)

Hier ist $$ \rho(x) $$ entlang der x-Achse stetig und differenzierbar. Daher ist sein Gradient analytisch gesehen nicht null. Wenn wir jedoch diese Ladungen einzeln als Dirac-Delta-Verteilung ausdrücken, erhalten wir:

$$
\rho(x) = \sum_i q_i , \delta(x - x_i)
$$

Das Integral dieser Verteilung ergibt die Gesamtladung, aber da sie nicht stetig ist, kann sie entlang der x-Achse nicht abgeleitet werden. Dies zwingt uns dazu, die Punkte, an denen sich die Ladungen befinden, aus der Definitionsmenge auszuschließen. In diesem Fall ist der Gradient ohnehin null.

### Annäherung der Dirac-Deltas mit einem „Smoothing Kernel“

$$
\delta_\varepsilon(\vec{r}) = \frac{1}{(\sqrt{\pi}\varepsilon)^3} e^{-r^2 / \varepsilon^2}
$$

$$
\varepsilon \to 0
$$

Im Grenzfall nähert sich dies wieder dem Dirac-Delta an.
