import { gsap } from 'gsap';

/** Gently sway every leafy sprig (SocialArt `Sprig`) around its own base point. */
export const swaySprigs = () => {
  gsap.utils.toArray<SVGGElement>('.sa-sprig').forEach((el, i) => {
    gsap.to(el, {
      rotation: i % 2 ? 5 : -5,
      svgOrigin: `${el.dataset.ox} ${el.dataset.oy}`,
      duration: 2.2 + (i % 4) * 0.45,
      repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  });
};
