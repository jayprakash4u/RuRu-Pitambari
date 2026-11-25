"use client";

import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";

import styles from "./media-uploader.module.css";

type MediaUploaderProps = {
  label: string;
  accept?: "image" | "video" | "both";
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
};

export function MediaUploader({
  label,
  accept = "image",
  value,
  onChange,
  helperText,
}: MediaUploaderProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const isVideo =
    accept === "video" ||
    value.endsWith(".mp4") ||
    value.endsWith(".webm") ||
    value.startsWith("data:video");

  const acceptMime =
    accept === "video"
      ? "video/mp4,video/webm,video/*"
      : accept === "image"
        ? "image/*"
        : "image/*,video/*";

  function handleFileProcess(file: File) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleTriggerBrowse() {
    fileInputRef.current?.click();
  }

  function handleRemove() {
    onChange("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        {helperText ? <span className={styles.helperText}>{helperText}</span> : null}
      </div>

      <input
        accept={acceptMime}
        className={styles.hiddenInput}
        id={inputId}
        onChange={handleInputChange}
        ref={fileInputRef}
        type="file"
      />

      {value ? (
        <div className={styles.previewBox}>
          <div className={styles.mediaFrame}>
            {isVideo ? (
              <video className={styles.videoPreview} controls playsInline src={value} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={label} className={styles.imagePreview} src={value} />
            )}
          </div>

          <div className={styles.previewFooter}>
            <div className={styles.fileMeta}>
              <span className={styles.fileBadge}>{isVideo ? "Video" : "Image"}</span>
              <span title={fileName || value}>
                {fileName || (value.startsWith("data:") ? "Uploaded media from device" : value)}
              </span>
            </div>

            <div className={styles.actionsGroup}>
              <button className={styles.replaceBtn} onClick={handleTriggerBrowse} type="button">
                Replace from device
              </button>
              <button className={styles.removeBtn} onClick={handleRemove} type="button">
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropZone} ${isDragOver ? styles.dropZoneDragOver : ""}`}
          onClick={handleTriggerBrowse}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
        >
          <svg
            className={styles.uploadIcon}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <div className={styles.uploadPrompt}>
            {accept === "video" ? "Choose video from device" : "Choose image from device"}
          </div>
          <div className={styles.uploadSub}>
            Click to browse or drag & drop {accept === "video" ? "MP4, WebM" : "PNG, JPG, WebP"}{" "}
            here
          </div>
          <button className={styles.chooseBtn} onClick={handleTriggerBrowse} type="button">
            Browse device
          </button>
        </div>
      )}
    </div>
  );
}
