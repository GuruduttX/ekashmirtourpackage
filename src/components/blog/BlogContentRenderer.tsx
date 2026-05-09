

"use client";

import DOMPurify from "dompurify";
import { motion, Variants } from "framer-motion";

interface BlogContentRendererProps {
  content: string;
}

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BlogContentRenderer({
  content,
}: BlogContentRendererProps) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUpVariants}
      className="blog-content relative"
    >
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      <style jsx global>{`
        .blog-content {
          color: rgb(71 85 105);
        }

        .blog-content > div {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* =========================
           HEADINGS
        ========================= */

        .blog-content h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1;
          font-weight: 300;
          letter-spacing: -0.05em;
          color: rgb(15 23 42);
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .blog-content h2::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1rem;
          width: 5rem;
          height: 1px;
          background: linear-gradient(
            to right,
            rgb(14 165 233),
            rgb(34 211 238)
          );
        }

        .blog-content h3 {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          line-height: 1.1;
          font-weight: 400;
          letter-spacing: -0.04em;
          color: rgb(15 23 42);
          margin-top: 3rem;
          margin-bottom: 1rem;
        }

        .blog-content h4 {
          font-size: 1.25rem;
          line-height: 1.3;
          font-weight: 500;
          color: rgb(30 41 59);
          margin-top: 2rem;
        }

        /* =========================
           PARAGRAPHS
        ========================= */

        .blog-content p {
          font-size: 1.05rem;
          line-height: 2;
          color: rgb(71 85 105);
          font-weight: 300;
          margin: 0;
        }

        @media (min-width: 768px) {
          .blog-content p {
            font-size: 1.12rem;
          }
        }

        /* =========================
           STRONG TEXT
        ========================= */

        .blog-content strong {
          color: rgb(15 23 42);
          font-weight: 600;
        }

        /* =========================
           LINKS
        ========================= */

        .blog-content a {
          color: rgb(14 165 233);
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
        }

        .blog-content a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: rgba(14, 165, 233, 0.3);
          transition: all 0.3s ease;
        }

        .blog-content a:hover::after {
          background: rgba(14, 165, 233, 1);
        }

        /* =========================
           IMAGES
        ========================= */

        .blog-content img {
          width: 100%;
          height: auto;
          border-radius: 2rem;
          margin: 3rem 0;
          object-fit: cover;
          border: 1px solid rgba(186, 230, 253, 0.8);
          box-shadow:
            0 25px 80px rgba(15, 23, 42, 0.08),
            0 10px 30px rgba(14, 165, 233, 0.08);
          overflow: hidden;
        }

        /* =========================
           BLOCKQUOTE
        ========================= */

        .blog-content blockquote {
          position: relative;
          overflow: hidden;
          margin: 3rem 0;
          padding: 2rem;
          border-radius: 2rem;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(186, 230, 253, 0.7);
          backdrop-filter: blur(24px);
          box-shadow: 0 20px 60px rgba(14, 165, 233, 0.08);
        }

        .blog-content blockquote::before {
          content: "“";
          position: absolute;
          top: -1.5rem;
          left: 1rem;
          font-size: 8rem;
          line-height: 1;
          color: rgba(14, 165, 233, 0.12);
          font-weight: 300;
        }

        .blog-content blockquote p {
          position: relative;
          z-index: 1;
          font-size: 1.2rem;
          line-height: 1.9;
          color: rgb(15 23 42);
          font-weight: 300;
          margin: 0;
        }

        /* =========================
           LISTS
        ========================= */

        .blog-content ul,
        .blog-content ol {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-left: 1.5rem;
          margin: 1rem 0 2rem;
        }

        .blog-content li {
          line-height: 1.9;
          color: rgb(71 85 105);
          padding-left: 0.25rem;
        }

        .blog-content ul li::marker {
          color: rgb(14 165 233);
        }

        /* =========================
           HORIZONTAL RULE
        ========================= */

        .blog-content hr {
          border: none;
          height: 1px;
          margin: 4rem 0;
          background: linear-gradient(
            to right,
            transparent,
            rgba(14, 165, 233, 0.3),
            transparent
          );
        }

        /* =========================
           TABLES
        ========================= */

        .blog-content table {
          width: 100%;
          overflow: hidden;
          border-collapse: collapse;
          border-radius: 1.5rem;
          margin: 2rem 0;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(186, 230, 253, 0.7);
        }

        .blog-content thead {
          background: rgba(14, 165, 233, 0.06);
        }

        .blog-content th,
        .blog-content td {
          padding: 1rem 1.25rem;
          text-align: left;
          border-bottom: 1px solid rgba(226, 232, 240, 0.7);
        }

        .blog-content th {
          color: rgb(15 23 42);
          font-weight: 500;
        }

        .blog-content td {
          color: rgb(71 85 105);
          font-weight: 300;
        }

        /* =========================
           FIGURES
        ========================= */

        .blog-content figure {
          margin: 3rem 0;
        }

        .blog-content figcaption {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.9rem;
          color: rgb(148 163 184);
          letter-spacing: 0.02em;
        }

        /* =========================
           MOBILE OPTIMIZATION
        ========================= */

        @media (max-width: 768px) {
          .blog-content h2 {
            margin-top: 3rem;
            margin-bottom: 1.25rem;
          }

          .blog-content p {
            line-height: 1.9;
          }

          .blog-content blockquote {
            padding: 1.5rem;
            border-radius: 1.5rem;
          }

          .blog-content img {
            border-radius: 1.5rem;
            margin: 2.25rem 0;
          }

          .blog-content table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </motion.article>
  );
}