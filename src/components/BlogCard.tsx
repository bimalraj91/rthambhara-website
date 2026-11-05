import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/data/blogs";
import styles from "./BlogCard.module.scss";

export default function BlogCard({
  post,
  headingLevel = "h2",
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className={styles.card}>
      <Link
        href={`/blogs/${post.slug}`}
        className={styles.link}
        aria-label={`${post.title}, read the article`}
      >
        <span className={styles.media}>
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 760px) 92vw, (max-width: 1280px) 46vw, 380px"
            className={styles.image}
          />
        </span>

        <span className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <time dateTime={post.date} className={styles.date}>
            {formatBlogDate(post.date)}
          </time>
        </span>

        <Heading className={styles.title}>{post.title}</Heading>
        <span className={styles.excerpt}>{post.excerpt}</span>

        <span className={styles.more}>
          Read More
          <Image
            src="/assets/news/icons/read-more-arrow.svg"
            alt=""
            width={8}
            height={3}
            unoptimized
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}
