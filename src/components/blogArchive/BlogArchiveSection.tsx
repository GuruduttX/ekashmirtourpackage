"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BlogArchiveHeader from "./BlogArchiveHeader";
import BlogPaginationControls from "./BlogPaginationControls";
import BlogGrid, { type IBlog } from "./BlogGrid";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type Blog = IBlog;

// ============================================================================
// MAIN ORCHESTRATION COMPONENT
// ============================================================================

interface BlogArchiveSectionProps {
  blogs: Blog[];
}

const ITEMS_PER_PAGE = 6;
export default function BlogArchiveSection({ blogs }: BlogArchiveSectionProps) {
  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Search Handler + Pagination Reset
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;

    const lowerQuery = searchQuery.toLowerCase();

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowerQuery) ||
        blog.category.toLowerCase().includes(lowerQuery) ||
        blog.subContent.toLowerCase().includes(lowerQuery),
    );
  }, [searchQuery, blogs]);

  // Pagination Logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentBlogs = useMemo(() => {
    return filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBlogs, startIndex]);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative mx-auto w-full max-w-6xl space-y-6 px-4 sm:px-6 md:space-y-8 lg:px-8"
    >
      {/* Ambient Cinematic Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[3rem]">
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-sky-400/10 blur-[120px]" />

        <div className="absolute bottom-0 right-[-5%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" />
      </div>

      <div className="relative z-10 space-y-4 md:space-y-8">
        <BlogArchiveHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <BlogGrid blogs={currentBlogs} />

        <BlogPaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          onPrev={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
        />
      </div>
    </motion.section>
  );
}
