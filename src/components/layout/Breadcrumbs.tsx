import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  includeJsonLd?: boolean;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

function absoluteUrl(href: string) {
  if (href.startsWith("http")) return href;
  return new URL(href, SITE_URL).toString();
}

export default function Breadcrumbs({
  items,
  className = "",
  includeJsonLd = true,
}: BreadcrumbsProps) {
  const normalizedItems: BreadcrumbItem[] =
    items[0]?.href === "/"
      ? items
      : [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      {includeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`no-scrollbar overflow-x-auto text-sm text-slate-500 ${className}`}
      >
        <ol className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
          {normalizedItems.map((item, index) => {
            const isLast = index === normalizedItems.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex shrink-0 items-center gap-2"
              >
                {index > 0 && <span aria-hidden="true">/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="font-medium text-slate-600 transition hover:text-sky-600"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "font-semibold text-sky-500" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
