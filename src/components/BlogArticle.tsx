import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getRelatedPosts, type BlogPost } from "@/data/blogs";
import { absoluteUrl, socialLinks } from "@/lib/site";
import BlogCard from "./BlogCard";
import BlogToc from "./BlogToc";
import Reveal from "./motion/Reveal";
import styles from "./BlogArticle.module.scss";

const shareTargets = [
  {
    label: "Share on Facebook",
    icon: "/assets/blogs/icons/share-facebook.svg",
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "Rtambhara on Instagram",
    icon: "/assets/blogs/icons/share-instagram.svg",
    href: () => socialLinks.instagram,
  },
  {
    label: "Rtambhara on YouTube",
    icon: "/assets/blogs/icons/share-youtube.svg",
    href: () => socialLinks.youtube,
  },
];

export default function BlogArticle({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post.slug);
  const url = absoluteUrl(`/blogs/${post.slug}`);

  return (
    <section className={styles.section}>
      <div className={`${styles.wash} ${styles.washLeft}`} aria-hidden="true">
        <Image
          src="/assets/news/sheet.webp"
          alt=""
          fill
          sizes="(max-width: 760px) 360px, 800px"
        />
      </div>
      <div className={`${styles.wash} ${styles.washRight}`} aria-hidden="true">
        <Image
          src="/assets/news/sheet.webp"
          alt=""
          fill
          sizes="(max-width: 760px) 360px, 800px"
        />
      </div>
      <div className={styles.emblem} aria-hidden="true">
        <Image
          src="/assets/gurus/logo.webp"
          alt=""
          width={325}
          height={291}
          sizes="505px"
        />
      </div>

      <div className={styles.shell}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <BlogToc
              items={post.sections.map(({ id, heading }) => ({ id, heading }))}
            />

            <div className={styles.share}>
              <p>Share</p>
              <ul>
                {shareTargets.map((target) => (
                  <li key={target.label}>
                    <a
                      href={target.href(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={target.label}
                    >
                      <Image
                        src={target.icon}
                        alt=""
                        width={24}
                        height={24}
                        unoptimized
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className={styles.quote}>
              &ldquo;{post.quote}&rdquo;
            </blockquote>
          </aside>

          <article
            className={styles.article}
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <Reveal
              as="figure"
              className={styles.featured}
              y={30}
              scale={0.985}
            >
              <Image
                src={post.featured}
                alt={post.featuredAlt}
                fill
                priority
                sizes="(max-width: 1280px) 92vw, 768px"
                className={styles.featuredImage}
              />
            </Reveal>

            {post.sections.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 && (
                  <div className={styles.separator} aria-hidden="true">
                    <Image
                      src="/assets/blogs/icons/lotus.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                )}
                <Reveal as="section" className={styles.block} y={26}>
                  <h2 id={item.id}>{item.heading}</h2>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Reveal>
              </Fragment>
            ))}

            <p className={styles.back}>
              <Link href="/blogs">&larr; All articles</Link>
            </p>
          </article>
        </div>

        <aside className={styles.related} aria-labelledby="related-topics">
          <h2 id="related-topics" className={styles.relatedTitle}>
            Related Topics
          </h2>
          <ul className={styles.relatedGrid}>
            {related.map((item) => (
              <li key={item.slug}>
                <BlogCard post={item} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
