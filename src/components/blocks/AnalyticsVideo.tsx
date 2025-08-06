"use client";

import { useRef, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useAnalytics } from "../analytics/AnalyticsContext";

interface AnalyticsVideoStoryblok {
  video_url: string;
  poster?: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  track_play?: boolean;
  track_progress?: boolean; // Track at 25%, 50%, 75%, 100%
  track_completion?: boolean;
  event_name?: string;
  _uid: string;
  component: "analytics_video";
}

interface AnalyticsVideoProps {
  blok: AnalyticsVideoStoryblok;
}

export default function AnalyticsVideo({ blok }: AnalyticsVideoProps) {
  const analytics = useAnalytics();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (blok.track_play) {
        analytics.trackVideoPlay(blok.title || "Video", video.duration);

        if (blok.event_name) {
          analytics.trackCustomEvent(blok.event_name, {
            action: "play",
            video_title: blok.title,
            video_url: blok.video_url,
            video_duration: video.duration,
          });
        }
      }
    };

    const handleTimeUpdate = () => {
      if (!blok.track_progress || !video.duration) return;

      const progress = (video.currentTime / video.duration) * 100;
      const milestones = [25, 50, 75];

      for (const milestone of milestones) {
        if (progress >= milestone && !progressTracked.current.has(milestone)) {
          progressTracked.current.add(milestone);

          analytics.trackCustomEvent("video_progress", {
            video_title: blok.title,
            video_url: blok.video_url,
            progress_percentage: milestone,
          });
        }
      }
    };

    const handleEnded = () => {
      if (blok.track_completion) {
        analytics.trackCustomEvent("video_complete", {
          video_title: blok.title,
          video_url: blok.video_url,
          video_duration: video.duration,
        });
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [analytics, blok]);

  return (
    <div {...storyblokEditable(blok)} className="max-w-4xl mx-auto">
      {blok.title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          {blok.title}
        </h3>
      )}

      {blok.description && (
        <p className="text-gray-600 mb-4">{blok.description}</p>
      )}

      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg shadow-lg"
          poster={blok.poster}
          autoPlay={blok.autoplay}
          muted={blok.muted}
          controls={blok.controls !== false} // Default to true
          loop={blok.loop}
          playsInline
        >
          <source src={blok.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
