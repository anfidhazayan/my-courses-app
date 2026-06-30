import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorMessage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-6 shadow-inner ring-4 ring-red-50">
        <AlertCircle className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
        Something went wrong
      </h2>
      
      <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
        We encountered an error loading the course catalog. Please check your connection or try reloading the page.
      </p>

      <button
        onClick={handleRefresh}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-brand-red/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reload Page</span>
      </button>
    </div>
  );
}