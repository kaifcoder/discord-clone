"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

import "@uploadthing/react/styles.css";
import React from "react";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image
          fill
          src={value}
          alt="Uploaded file"
          className="rounded-full"
          objectFit="cover"
        />
        <button
          title="close"
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500 "
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          title="close"
          onClick={() => onChange("")}
          className="absolute p-1 text-white rounded-full shadow-sm bg-rose-500 -top-2 -right-2 "
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default FileUpload;
