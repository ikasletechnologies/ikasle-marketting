import { test, expect } from './fixtures';

test('SEO Audit deliverables section elements stay within container across viewports', async ({ page }) => {
  await page.goto('/services/seo-search-growth/audit-strategy');
  await page.waitForSelector('.au-deliver-stage');

  const viewports = [1440, 1280, 1100, 1024, 960, 910, 890, 768, 480];
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 800 });
    // Let layout settle
    await page.waitForTimeout(100);

    const metrics = await page.evaluate(() => {
      const inner = document.querySelector('.ss-deliver-inner');
      const visual = document.querySelector('.ss-deliver-visual');
      const stage = document.querySelector('.au-deliver-stage');
      const chips = Array.from(document.querySelectorAll('.au-l-chip')).map((el, i) => {
        const r = el.getBoundingClientRect();
        return { index: i, right: r.right, left: r.left, width: r.width };
      });
      const book = document.querySelector('.au-l-book')?.getBoundingClientRect();
      const iRect = inner?.getBoundingClientRect();
      const vRect = visual?.getBoundingClientRect();
      const sRect = stage?.getBoundingClientRect();
      const bodyWidth = document.body.clientWidth;
      const docOverflow = document.documentElement.scrollWidth > window.innerWidth;
      return {
        bodyWidth,
        innerLeft: iRect?.left,
        innerRight: iRect?.right,
        visualLeft: vRect?.left,
        visualRight: vRect?.right,
        stageLeft: sRect?.left,
        stageRight: sRect?.right,
        bookLeft: book?.left,
        bookRight: book?.right,
        chips,
        maxChipRight: Math.max(...chips.map(c => c.right)),
        docOverflow,
      };
    });

    console.log(
      `Viewport ${width}px: innerRight=${metrics.innerRight?.toFixed(1)}, visualRight=${metrics.visualRight?.toFixed(1)}, maxChipRight=${metrics.maxChipRight?.toFixed(1)}, diff=${(metrics.maxChipRight - (metrics.innerRight ?? 0)).toFixed(1)}, docOverflow=${metrics.docOverflow}`
    );

    // No horizontal scrollbar on document
    expect(metrics.docOverflow, `Horizontal scroll detected at viewport ${width}px`).toBe(false);

    // Visual elements should not overflow the container right boundary (allow up to 2px for subpixel anti-aliasing)
    if (metrics.innerRight) {
      expect(metrics.maxChipRight, `Chips overflow container at viewport ${width}px`).toBeLessThanOrEqual(metrics.innerRight + 2);
    }
  }
});

