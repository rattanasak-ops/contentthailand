"use client";

import { useState } from "react";
import { Facebook, MessageCircle, Share2, Link, Eye } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  title: string;
  url: string;
  viewCount?: number;
  className?: string;
}

// Derive a deterministic "share count" from the title length
function getMockShareCount(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 900) + 100; // 100–999
}

const platforms = [
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    glowColor: "hover:shadow-[0_0_12px_rgba(236,28,114,0.35)]", // pink glow
    buildUrl: (fullUrl: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    icon: Share2,
    glowColor: "hover:shadow-[0_0_12px_rgba(112,40,116,0.4)]", // purple glow
    buildUrl: (fullUrl: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
  },
  {
    id: "line",
    label: "LINE",
    icon: MessageCircle,
    glowColor: "hover:shadow-[0_0_12px_rgba(246,165,27,0.35)]", // amber glow
    buildUrl: (fullUrl: string) =>
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(fullUrl)}`,
  },
] as const;

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function SocialShare({ title, url, viewCount, className = "" }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareCount = getMockShareCount(title);

  const getFullUrl = () => {
    if (typeof window === "undefined") return url;
    return `${window.location.origin}${url}`;
  };

  const handleShare = (buildUrl: (fullUrl: string, title: string) => string) => {
    const fullUrl = getFullUrl();
    const shareUrl = buildUrl(fullUrl, title);
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleCopyLink = async () => {
    try {
      const fullUrl = getFullUrl();
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Stats */}
      <div className="flex items-center gap-3 mr-1 text-xs font-thai">
        <span className="flex items-center gap-1.5 text-[var(--ct-text-muted)]">
          <Share2 className="w-3.5 h-3.5" />
          <span>{formatCount(shareCount)}</span>
        </span>
        {viewCount !== undefined && (
          <span className="flex items-center gap-1.5 text-[var(--ct-text-muted)]">
            <Eye className="w-3.5 h-3.5" />
            <span>{formatCount(viewCount)}</span>
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-[var(--ct-border)]" />

      {/* Share buttons */}
      <div className="flex items-center gap-1.5">
        {platforms.map((platform) => (
          <div key={platform.id} className="relative group">
            <button
              onClick={() => handleShare(platform.buildUrl)}
              className={`
                relative rounded-lg p-2.5
                bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-surface)]
                text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)]
                transition-all duration-200
                ${platform.glowColor}
              `}
              aria-label={`Share on ${platform.label}`}
            >
              <platform.icon className="w-4 h-4" />
            </button>
            {/* Tooltip */}
            <span
              className="
                pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                whitespace-nowrap rounded-md bg-[var(--ct-bg-elevated)] px-2 py-1
                text-[11px] font-thai text-[var(--ct-text-secondary)] border border-[var(--ct-border)]
                opacity-0 group-hover:opacity-100 transition-opacity duration-150
              "
            >
              {platform.label}
            </span>
          </div>
        ))}

        {/* Copy link */}
        <div className="relative group">
          <button
            onClick={handleCopyLink}
            className={`
              relative rounded-lg p-2.5
              transition-all duration-200
              hover:shadow-[0_0_12px_rgba(247,101,50,0.35)]
              ${
                copied
                  ? "bg-pink/20 text-pink-light"
                  : "bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-surface)] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)]"
              }
            `}
            aria-label="Copy link"
          >
            <Link className="w-4 h-4" />
          </button>
          <span
            className="
              pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
              whitespace-nowrap rounded-md bg-[var(--ct-bg-elevated)] px-2 py-1
              text-[11px] font-thai text-[var(--ct-text-secondary)] border border-[var(--ct-border)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-150
            "
          >
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </div>
      </div>
    </div>
  );
}
