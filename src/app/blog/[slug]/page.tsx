import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Lime } from "@/components/site/page-hero";
import { PhotoGrid } from "@/components/pages/photo-grid";
import { getPosts } from "@/lib/cms";
import { JsonLd, SITE } from "@/components/seo/json-ld";

// Figma: Blog article — Desktop (4015:5150) / Mobile (4015:5500).
// Header, hero photo, 860px body column, supporting visuals, more from the blog.

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

// New posts published in Sanity get their page on first visit.
export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      siteName: "FOAN Group",
      images: [post.image],
      publishedTime: new Date(`${post.date} 12:00 UTC`).toISOString(),
    },
  };
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== slug);

  const image = post.image.startsWith("http")
    ? post.image
    : `${SITE}${post.image}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: [image],
          datePublished: new Date(`${post.date} 12:00 UTC`).toISOString(),
          url: `${SITE}/blog/${post.slug}/`,
          mainEntityOfPage: `${SITE}/blog/${post.slug}/`,
          articleSection: post.categories,
          author: {
            "@type": "Organization",
            name: "FOAN Group",
            url: `${SITE}/`,
          },
          publisher: { "@id": `${SITE}/#organization` },
        }}
      />
      {/* Article header */}
      <section className="max-w-frame px-gutter nav:pt-[168px] mx-auto flex flex-col gap-6 pt-[96px] md:pt-[120px] lg:gap-8">
        <div className="intro-up" style={d(50)}>
          <Button label="Back to blog" href="/blog/" variant="back" />
        </div>
        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="intro-up" style={d(120)}>
            <Tag label={post.categories.join(", ")} />
          </div>
          <h1
            className="intro-up type-h1 text-primary lg:max-w-[1040px]"
            style={d(200)}
          >
            {post.title}
          </h1>
          <div
            className="intro-up type-body-s text-secondary flex flex-wrap items-center gap-3"
            style={d(300)}
          >
            <span className="grid size-8 place-items-center overflow-clip rounded-full bg-white">
              <Image
                src="/images/site/foan-logo.webp"
                alt=""
                width={240}
                height={146}
                className="w-6"
              />
            </span>
            <span className="text-primary">Blog article</span>
            <span className="bg-default h-4 w-px" aria-hidden />
            <span>Published on {post.date}</span>
          </div>
        </div>
        <div
          data-theme="dark"
          className="intro-up bg-surface-raised relative h-[260px] overflow-clip rounded-[16px] md:h-[440px] lg:h-[620px] lg:rounded-[24px]"
          style={d(380)}
        >
          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1320px, 100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
      </section>

      {/* Article body */}
      <article className="px-gutter py-section mx-auto flex max-w-[calc(860px+2*var(--layout-gutter))] flex-col gap-6 lg:gap-7 lg:py-20">
        {post.body.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i} data-reveal className="type-h3 text-primary mt-4">
              {b.text}
            </h2>
          ) : b.type === "quote" ? (
            <blockquote
              key={i}
              data-reveal
              data-theme="dark"
              className="bg-surface type-h4 rounded-[20px] border-l-4 border-lime-500 px-6 py-6 text-white lg:px-10 lg:py-8"
            >
              {b.text}
            </blockquote>
          ) : (
            <p key={i} data-reveal className="type-body-l text-secondary">
              {b.text}
            </p>
          ),
        )}
      </article>

      {/* Supporting visuals */}
      {post.gallery.length > 0 && (
        <section className="max-w-frame px-gutter pb-section mx-auto flex flex-col gap-8 lg:gap-10 lg:pb-20">
          <div data-reveal className="flex flex-col gap-3">
            <p className="type-label-overline text-accent-text">Gallery</p>
            <h2 className="type-h2 text-primary">
              Supporting <Lime>visuals</Lime>
            </h2>
          </div>
          <PhotoGrid items={post.gallery} />
          <div data-reveal className="flex flex-wrap gap-3">
            <Button label="Contact us" href="/contact/" variant="lime" />
            <Button
              label="Press releases"
              href="/press-releases/"
              variant="white"
            />
          </div>
        </section>
      )}

      {/* More from the blog */}
      {more.length > 0 && (
        <section className="max-w-frame px-gutter pb-section mx-auto flex flex-col gap-8 lg:gap-10 lg:pb-20">
          <div
            data-reveal
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div className="flex flex-col gap-3">
              <p className="type-label-overline text-accent-text">Blog</p>
              <h2 className="type-h2 text-primary md:max-w-[640px]">
                Editorial insights, company updates, and field notes from FOAN
                Group.
              </h2>
            </div>
            <Button
              label="All posts"
              href="/blog/"
              variant="white"
              className="self-start md:self-auto"
            />
          </div>
          <div data-reveal-group className="flex flex-col gap-5">
            {more.slice(0, 2).map((m) => (
              <article
                key={m.slug}
                className="group border-subtle bg-surface flex flex-col overflow-clip rounded-[20px] border md:flex-row"
              >
                <div
                  data-theme="dark"
                  className="bg-surface-raised relative h-[220px] shrink-0 overflow-clip md:h-auto md:min-h-[300px] md:w-[45%] lg:w-[640px]"
                >
                  <Image
                    src={m.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 640px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 lg:p-9">
                  <Tag label={m.categories.join(", ")} className="self-start" />
                  <h3 className="type-h3 text-primary">{m.title}</h3>
                  <p className="type-body-m text-secondary line-clamp-3">
                    {m.excerpt}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="type-body-s text-tertiary">{m.date}</span>
                    <Button
                      label="Read article"
                      href={`/blog/${m.slug}/`}
                      variant="lime"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
