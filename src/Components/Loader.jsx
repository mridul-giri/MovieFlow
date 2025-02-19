import React from "react";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
    </div>
  );
}
