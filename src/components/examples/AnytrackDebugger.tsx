"use client";

import React, { useEffect, useState } from "react";
import { debugAnytrackCommands, getAnytrack } from "../analytics/AnytrackUtils";

export default function AnytrackDebugger() {
  const [apiInfo, setApiInfo] = useState<any>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    // Get API info
    const api = getAnytrack();
    if (api) {
      setApiInfo({
        type: typeof api,
        isFunction: typeof api === "function",
        hasInit: typeof api === "object" && "init" in api,
        hasTrack: typeof api === "object" && "track" in api,
        hasPage: typeof api === "object" && "page" in api,
        methods: typeof api === "object" ? Object.keys(api) : [],
      });
    }
  }, []);

  const runTests = () => {
    setTestResults([]);
    const results: string[] = [];

    try {
      debugAnytrackCommands();
      results.push("Debug commands executed - check console for results");
    } catch (error) {
      results.push(`Error running tests: ${error}`);
    }

    setTestResults(results);
  };

  const testPageTracking = () => {
    try {
      const api = getAnytrack();
      if (api && typeof api === "function") {
        // Test different page tracking approaches
        api("page", { title: "Test Page", url: "/test" });
        setTestResults((prev) => [...prev, "✓ page command sent"]);
      } else if (api && typeof api === "object" && "page" in api) {
        (api as any).page("Test Page", { url: "/test" });
        setTestResults((prev) => [...prev, "✓ page method called"]);
      }
    } catch (error) {
      setTestResults((prev) => [...prev, `✗ Page tracking failed: ${error}`]);
    }
  };

  const testEventTracking = () => {
    try {
      const api = getAnytrack();
      if (api && typeof api === "function") {
        // Test different event tracking approaches
        api("track", "test_event", { test: true, timestamp: Date.now() });
        setTestResults((prev) => [...prev, "✓ track command sent"]);
      } else if (api && typeof api === "object" && "track" in api) {
        (api as any).track("test_event", { test: true, timestamp: Date.now() });
        setTestResults((prev) => [...prev, "✓ track method called"]);
      }
    } catch (error) {
      setTestResults((prev) => [...prev, `✗ Event tracking failed: ${error}`]);
    }
  };

  if (!apiInfo) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        Loading AnyTrack API info...
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">AnyTrack Debugger</h3>

      <div className="mb-4">
        <h4 className="font-medium mb-2">API Information:</h4>
        <pre className="bg-white p-2 rounded text-sm overflow-auto">
          {JSON.stringify(apiInfo, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Test Commands:</h4>
        <div className="space-x-2">
          <button
            onClick={runTests}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Run All Tests
          </button>
          <button
            onClick={testPageTracking}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test Page Tracking
          </button>
          <button
            onClick={testEventTracking}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Test Event Tracking
          </button>
        </div>
      </div>

      {testResults.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Test Results:</h4>
          <div className="bg-white p-2 rounded">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-600">
        <p>Check the browser console for detailed debug information.</p>
        <p>Network tab will show AnyTrack API calls if they're working.</p>
      </div>
    </div>
  );
}
