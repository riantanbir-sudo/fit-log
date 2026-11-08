"use client";

import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#15171d",
            color: "#fff",
            border: "1px solid #222630",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#ccff00", secondary: "#0f1115" } },
        }}
      />
    </PlanProvider>
  );
}
