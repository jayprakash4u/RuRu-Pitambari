"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Select } from "@/components/ui";
import { galleryImages } from "@/features/gallery/data/gallery-images";

import styles from "./gallery-grid.module.css";

const pageSizes = [12, 24, 36] as const;

export function GalleryGrid() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(pageSizes[0]);
  const pageCount = Math.max(1, Math.ceil(galleryImages.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, galleryImages.length);
  const visibleImages = useMemo(
    () => galleryImages.slice(startIndex, endIndex),
    [endIndex, startIndex],
  );

  function changePageSize(value: string) {
    setPageSize(Number(value));
    setPage(1);
  }

  return (
    <>
      <div className={styles.toolbar}>
        <label>
          <span>Show</span>
          <Select
            aria-label="Images per page"
            onChange={(event) => changePageSize(event.target.value)}
            value={pageSize}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <span>entries</span>
        </label>
      </div>

      <div className={styles.grid}>
        {visibleImages.map((item, index) => (
          <div className={styles.item} key={item.alt}>
            <Image
              alt={item.alt}
              className={styles.image}
              placeholder="blur"
              priority={page === 1 && index < 4}
              sizes="(max-width: 40rem) 50vw, (max-width: 64rem) 33vw, 25vw"
              src={item.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.tableFooter}>
        <p>
          Showing <strong>{galleryImages.length ? startIndex + 1 : 0}</strong> to{" "}
          <strong>{endIndex}</strong> of <strong>{galleryImages.length}</strong> entries
        </p>

        <nav aria-label="Gallery pagination" className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            type="button"
          >
            Previous
          </button>

          <div>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                aria-current={pageNumber === page ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                type="button"
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            disabled={page === pageCount}
            onClick={() => setPage((current) => current + 1)}
            type="button"
          >
            Next
          </button>
        </nav>
      </div>
    </>
  );
}
