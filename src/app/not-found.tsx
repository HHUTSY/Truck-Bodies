import { BodyGlyph } from "@/components/illustrations/BodyGlyph";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-section pt-[calc(var(--header-h)+4rem)]">
      <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="load-in eyebrow text-accent-text">[ 404 ] Not in the shop</p>
          <h1 className="mt-6 text-display-xl">
            <SplitText trigger="load" lines={["This body is", { text: "still on the jig.", className: "words-signal" }]} />
          </h1>
          <p className="load-in mt-8 max-w-md text-lead text-muted" style={{ "--d": "400ms" } as React.CSSProperties}>
            The page you&apos;re looking for doesn&apos;t exist yet — or it moved during our rebuild.
          </p>
          <div className="load-in mt-10 flex flex-wrap gap-3" style={{ "--d": "520ms" } as React.CSSProperties}>
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href={quoteHref} size="lg" variant="secondary">
              Request a Quote
            </Button>
          </div>
        </div>
        <div className="plot-in text-steel-500 lg:col-span-5" style={{ "--d": "300ms" } as React.CSSProperties}>
          <BodyGlyph body="custom" detailed />
        </div>
      </div>
    </section>
  );
}
