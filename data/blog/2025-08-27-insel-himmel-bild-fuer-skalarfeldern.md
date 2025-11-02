---
title: Insel-Himmel Bild für Skalerfeldern
date: 2025-08-27
slug: 2025-08-27-insel-himmel-bild-fuer-skalarfeldern
excerpt: Der Gradient des Punktförmigen Coulomfelds ist null.
---

Stell die Ladungsdichte $$\rho(\vec{r})$$ als Landschaft vor. Höhe als Wert von $$\rho$$, Inseln als Bereiche hoher Ladungsdichte. Der Gradient ist der Vektor, der dir an jedem Punkt zeigt, wohin es am steilsten bergauf geht, aber ganz lokal. Der Gradient weiß nur, was direkt in deiner Nachbarschaft passiert.

![Der Normalverteilte Ladungsdichte](/sketches/normal-distributed-charge-density.jpg)

Burada $ \rho(x) $ x boyunca sürekli ve türevlenebilir. Bu yüzden gradyanı analitik olarak sıfır değil. Ama bu yükleri teker teker konumdan bağımlı Dirac-Delta Dağılımı halinde yazarsak:

$$
\rho(x) = \sum_i q_i , \delta(x - x_i)
$$

Bu dağılımın integrali toplam yükü verir ama sürekli olmadığı için x boyunca türevlenemez. Bu da yüklerin bulunduğu noktaları tanım kümelerinden çıkarmamızı zorunlu kılar. Bu durumda da zaten gradyan sıfır olur.

⸻

Dirac-Deltaları “smoothing kernel” ile yaklaştırmak

$$
\delta_\varepsilon(\vec{r}) = \frac{1}{(\sqrt{\pi}\varepsilon)^3} e^{-r^2 / \varepsilon^2}
$$

$$
\varepsilon \to 0
$$

Limitinde tekrar Dirac-Delta’ya yaklaşır.