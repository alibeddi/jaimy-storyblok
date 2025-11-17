"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  trackCustomEvent,
  trackButtonClick,
  trackFormSubmission,
  trackScrollDepth,
  trackTimeOnPage,
  trackVideoPlay,
  trackDownload,
  trackOutboundLink,
  anytrackIdentify,
  anytrackSetUserProperties,
} from "@/components/analytics";

export default function AnytrackExample() {
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [timeOnPage, setTimeOnPage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage((prev) => {
        const newTime = prev + 1;
        if (newTime % 10 === 0) {
          // Track every 10 seconds
          trackTimeOnPage(newTime, window.location.href);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPercent =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        if (scrollPercent >= 25 && scrollPercent < 50) {
          trackScrollDepth(25, window.location.href);
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          trackScrollDepth(50, window.location.href);
        } else if (scrollPercent >= 75) {
          trackScrollDepth(75, window.location.href);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = (buttonText: string, location: string) => {
    trackButtonClick(buttonText, location, {
      page_section: "example_demo",
      user_email: userEmail || "anonymous",
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    trackFormSubmission("demo_form", true, formData);

    // Track as lead if email is provided
    if (formData.email) {
      anytrackIdentify("demo_user", {
        email: formData.email,
        name: formData.name,
        source: "demo_page",
      });

      anytrackSetUserProperties({
        signup_date: new Date().toISOString(),
        user_type: "demo",
      });
    }

    alert("Form submitted! Check console for tracking events.");
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      trackVideoPlay("Demo Video", "demo_video_001", 30);
    }
  };

  const handleDownload = () => {
    trackDownload("demo-brochure.pdf", "pdf", 1024 * 1024); // 1MB
  };

  const handleOutboundLink = () => {
    trackOutboundLink("https://example.com", "External Link", "demo_page");
  };

  const handleCustomEvent = () => {
    trackCustomEvent("demo_interaction", {
      interaction_type: "button_click",
      user_segment: userEmail ? "identified" : "anonymous",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div ref={scrollRef} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Anytrack Integration Demo
        </h1>
        <p className="text-gray-600">
          This page demonstrates various Anytrack tracking capabilities.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Time on page: {timeOnPage}s | Check browser console for tracking
          events
        </p>
      </div>

      {/* User Identification Section */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">User Identification</h2>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter email to identify user"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              if (userEmail) {
                anytrackIdentify("demo_user", { email: userEmail });
                alert("User identified! Check console for tracking events.");
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Identify User
          </button>
        </div>
      </div>

      {/* Button Tracking Section */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Button Click Tracking</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleButtonClick("Primary CTA", "hero_section")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Primary CTA
          </button>
          <button
            onClick={() =>
              handleButtonClick("Secondary Button", "content_section")
            }
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Secondary Button
          </button>
          <button
            onClick={() => handleButtonClick("Custom Event", "demo_section")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Custom Event
          </button>
        </div>
      </div>

      {/* Form Tracking Section */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Form Tracking</h2>
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Submit Form
          </button>
        </form>
      </div>

      {/* Video Tracking Section */}
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Video Tracking</h2>
        <video
          ref={videoRef}
          controls
          className="w-full max-w-md mx-auto"
          onPlay={handleVideoPlay}
        >
          <source src="/sample-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm text-gray-600 text-center mt-2">
          Click play to trigger video tracking event
        </p>
      </div>

      {/* Other Tracking Examples */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Other Tracking Examples</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Track Download
          </button>
          <button
            onClick={handleOutboundLink}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Track Outbound Link
          </button>
          <button
            onClick={handleCustomEvent}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Track Custom Event
          </button>
        </div>
      </div>

      {/* Scroll Tracking Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Scroll Tracking</h2>
        <p className="text-gray-600">
          Scroll down this page to trigger scroll depth tracking events at 25%,
          50%, and 75%.
        </p>
        <div className="mt-4 h-96 bg-gradient-to-b from-blue-200 to-purple-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-700">Scroll down to see tracking in action</p>
        </div>
      </div>

      {/* Tracking Status */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Tracking Status</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Time on page:</strong> {timeOnPage}s
          </div>
          <div>
            <strong>User identified:</strong> {userEmail ? "Yes" : "No"}
          </div>
          <div>
            <strong>Form submitted:</strong>{" "}
            {formData.name && formData.email ? "Yes" : "No"}
          </div>
          <div>
            <strong>Video played:</strong>{" "}
            {videoRef.current?.played.length ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}

