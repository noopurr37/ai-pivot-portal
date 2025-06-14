
import React, { createContext, useContext, useState } from "react";

interface ResumeContextValue {
  resumeText: string | null;
  setResumeText: (text: string | null) => void;
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeText, setResumeText] = useState<string | null>(null);

  return (
    <ResumeContext.Provider value={{ resumeText, setResumeText }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
