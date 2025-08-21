import { AnytrackDebugger } from "@/components/examples";

export default function DemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AnyTrack Integration Demo</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Debug AnyTrack Integration
        </h2>
        <p className="text-gray-600 mb-4">
          Use this debugger to test and understand the AnyTrack API integration.
          Check the browser console for detailed information.
        </p>
        <AnytrackDebugger />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Instructions:
        </h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>
            Click "Run All Tests" to see what AnyTrack commands are available
          </li>
          <li>Check the browser console for detailed debug output</li>
          <li>
            Look at the Network tab to see if AnyTrack API calls are being made
          </li>
          <li>
            Use the individual test buttons to test specific functionality
          </li>
        </ol>
      </div>
    </div>
  );
}
