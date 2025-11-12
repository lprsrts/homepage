---
title: From Gaussian to Quantum Uncertainty
date: 2025-11-12T00:00:00.000Z
slug: 2025-11-12-from-gaussian-to-quantum-uncertainty
excerpt: The world can’t be described by fixed points because the more you try to pin something down, the more everything else seizes out of existence.
---

Today I opened Desmos and plotted a function I always found visually satisfying:

$$
f(x) = e^{-x^2}
$$

The shape was calm, centered, and somehow complete. Then I added a shift $$ x_0 $$ to move it along the axis, and out of curiosity, I integrated it from $$ -\infty $$ to $$ +\infty $$. The value came out as about $$ 1.772... $$ . If you are someone who "plays" with a calculator often you might know this number, I do. That number is $$ \sqrt{\pi} $$. There is a [video](https://www.youtube.com/watch?v=cy8r7WSuT1I) from 3Blue1Brown explaining the reason.

So I divided by that constant and defined:

$$
f(x) = \frac{1}{\sqrt{\pi}} e^{-(x - x_0)^2}
$$

Now the integral over all space was exactly $$ 1 $$. It feels like a “normalized existence", something that integrates to a whole.

Then I introduced a scale parameter $$ a $$ into the exponent to control how sharply it falls:

$$
f_a(x) = \frac{1}{a\sqrt{\pi}} e^{-(x - x_0)^2 / a^2}
$$

When I changed $$ a $$, I saw the function widen and narrow. Yet the total area, the integral, stayed equal to $$ 1 $$. That small invariance made me think of conservation laws: spread it or squeeze it, the total remains constant.

I noticed another strange thing. As $$ a $$ became smaller, the peak became taller and narrower, almost like a spike. I remembered that is the definition of Dirac delta, written as:

$$
\delta(x - x_0) = \lim_{a \to 0} \frac{1}{a\sqrt{\pi}} e^{-(x - x_0)^2 / a^2}
$$

and realized that what I was seeing was a smooth delta emerging from the Gaussian as (a \to 0). The area was always 1, but the height diverged. That is a mathematical way of *pointing* to a position. The smaller a got, the more precisely the point was defined.

At that moment, I thought of the field of a point charge. The divergence of the electric field is zero everywhere except at the location of the charge, and that this “except” is expressed using the delta function:

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
\quad \text{with} \quad
\rho(\mathbf{r}) = q , \delta(\mathbf{r} - \mathbf{r}_0)
$$

A point charge is not a real finite distribution; it’s a limit of something infinitely localized, just like my Gaussian.

So I differentiated my Gaussian — visually, on [Desmos](https://www.desmos.com/calculator/5nfow4tqy2) — and it was clear that its slope became steeper as $$ a $$ decreased. The “field,” in my mind, became more intense but confined to a smaller region.

![A screenshot of the configuration](/plots/normal-distributed-charge-density.jpeg)

The more I tried to localize the charge, the more violent the field became. This field is exactly the magnitude of the divergence of the displacement vector.

Then a thought hit me: when a tends to zero, the function technically “disappears” everywhere except the center; division by zero, infinite slope, undefined values. It’s like the price of perfect knowledge of *where* something is, is the complete loss of *how* it behaves.

That was the moment something clicked.

I realized this is what the uncertainty principle actually "feels" like. If I imagine the Gaussian not as charge but as a wave packet, the parameter $$ a $$ measures position uncertainty. And its Fourier transform, another Gaussian, has width proportional to $$ \frac{1}{a} $$.

So the product of position width and momentum width stays constant:

$$
\Delta x , \Delta k \sim 1
$$

To see the particle sharply in space, $$ a $$ must shrink but then its frequency content, its “momentum,” explodes across all values.
And if I stretch $$ a $$, the wave becomes smooth and global, but I lose the ability to say *where* it is exactly. I can only say that a single point charge is inside this mountain. The peak is visually clear to me but even if I put my finger on the x axis where I "think" the peak falls to I will miss the exact position by an infinitesimal value.

The entire structure of quantum mechanics suddenly felt natural: The world can’t be described by fixed points because the more you try to pin something down, the more everything else its motion, its energy, its surrounding field becomes infinite or undefined or seizes out of existence.

That realization came not from an equation, but from watching a Gaussian narrow, reach to the sky and realizing that certainty of position erases everything else about existence. This makes me think our whole math developed by the giants which we stand on is incapable of pointing where something is. For that reason we might just be saying out of laziness that the "thing" might be here somewhere and this is my declaration of this probability.
