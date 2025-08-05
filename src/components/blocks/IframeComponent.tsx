import { storyblokEditable } from "@storyblok/react/rsc";
import { IframeBlok } from "@/types/storyblok";
import { useEffect, useState } from "react";

// Form service configurations
const FORM_SERVICES = {
  typeform: {
    baseUrl: "https://embed.typeform.com/to",
    urlPattern: (formId: string) => `https://embed.typeform.com/to/${formId}`
  },
  jotform: {
    baseUrl: "https://form.jotform.com",
    urlPattern: (formId: string) => `https://form.jotform.com/${formId}`
  },
  googleforms: {
    baseUrl: "https://docs.google.com/forms",
    urlPattern: (formId: string) => `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`
  },
  custom: {
    baseUrl: "",
    urlPattern: (formId: string, baseUrl: string) => `${baseUrl}?formId=${formId}`
  }
};

export default function IframeComponent({ blok }: { blok: IframeBlok }) {
  const [iframeUrl, setIframeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  console.log(blok,'blok');

  // Generate iframe URL based on formId and service type
  useEffect(() => {
    if (blok?.form_id) {
      const serviceType = blok?.service_type || 'custom';
      const service = FORM_SERVICES[serviceType as keyof typeof FORM_SERVICES];
      
      let newUrl = "";
      
      if (serviceType === 'custom' && blok?.base_url) {
        newUrl = service.urlPattern(blok.form_id, blok.base_url);
      } else if (serviceType !== 'custom') {
        newUrl = service.urlPattern(blok.form_id);
      }
      
      setIframeUrl(newUrl);
      setIsLoading(true);
      setHasError(false);
    }
  }, [blok?.form_id, blok?.base_url, blok?.service_type]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] py-16 relative"
    >
      <div className="max-w-4xl mx-auto px-8">
        {/* Title */}
        {blok?.title && (
          <h2 className="text-[#32546D] font-belfius-title text-3xl lg:text-4xl mb-8 text-center">
            {blok.title}
          </h2>
        )}
        
        {/* Iframe Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
          {/* Loading State */}
          {isLoading && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10"
              style={{ height: `${blok?.height || 600}px` }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AF1B3C] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading form {blok?.form_id}...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {hasError && (
            <div 
              className="p-8 text-center bg-red-50"
              style={{ height: `${blok?.height || 600}px` }}
            >
              <p className="text-red-600 font-belfius-body mb-2">
                Failed to load form with ID: {blok?.form_id}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Service: {blok?.service_type || 'custom'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#AF1B3C] text-white px-4 py-2 rounded hover:bg-[#8B1538] transition-colors"
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Iframe */}
          {iframeUrl && !hasError && (
            <iframe
              key={`${blok?.service_type}-${blok?.form_id}`} // Force re-render when form_id or service changes
              src={iframeUrl}
              width="100%"
              height={blok?.height || "600"}
              frameBorder="0"
              allowFullScreen={blok?.allow_fullscreen !== false}
              sandbox={blok?.sandbox || "allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation"}
              className="w-full"
              title={`${blok?.service_type || 'Custom'} Form ${blok?.form_id}`}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
        
        {/* Description */}
        {blok?.description && (
          <p className="text-gray-600 text-center mt-6 font-belfius-body">
            {blok.description}
          </p>
        )}
      </div>
    </section>
  );
}