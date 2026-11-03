import { gsap } from 'gsap';

/**
 * Reveal tween for SplitText's `onSplit` when `autoSplit: true` is used.
 *
 * With autoSplit, SplitText re-splits when web fonts finish loading or the element
 * resizes. It can only clean up and time-sync the animation that `onSplit` *returns*.
 * Appending to a shared timeline instead (`tl.from(self.lines, ...)`) leaves the
 * re-split lines stuck in their hidden start state once that timeline has played,
 * which made headings like "From Strategy to Success" disappear.
 *
 * This returns a standalone tween that keeps the timeline's timing: same scroll
 * trigger, its position as a delay, and the timeline's default ease.
 */
export function splitReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  timeline: gsap.core.Timeline,
  position = 0,
): gsap.core.Tween {
  const trigger = timeline.scrollTrigger;
  const defaults = (timeline.vars.defaults ?? {}) as gsap.TweenVars;
  return gsap.from(targets, {
    ease: defaults.ease,
    duration: defaults.duration,
    ...vars,
    delay: position,
    scrollTrigger: trigger ? { trigger: trigger.trigger, start: trigger.vars.start, once: true } : undefined,
  });
}
