import { useState, createContext, type ReactNode, useMemo, useEffect } from "react";

interface AdminSettingInfo {
  onlinePaymentEnabled: boolean;
  feedbackEnabled: boolean;
}

interface AdminSettings extends AdminSettingInfo {
  toggleOnlinePayment: () => void;
  toggleFeedback: () => void;
}


export const AdminContext = createContext<AdminSettings | undefined>(undefined);

const getInitialSettings = (): AdminSettingInfo => {
  if (typeof window === "undefined") {
    return {
      onlinePaymentEnabled: false,
      feedbackEnabled: false,
    };
  }

  try {
    const stored = localStorage.getItem("adminSettings");
    return stored
      ? JSON.parse(stored)
      : { onlinePaymentEnabled: false, feedbackEnabled: false };
  } catch {
    localStorage.removeItem("adminSettings");
    return { onlinePaymentEnabled: false, feedbackEnabled: false };
  }
};


export const AdminSettingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettingInfo>(getInitialSettings);

  const toggleOnlinePayment = () => {
    setSettings(prev => ({
      ...prev,
      onlinePaymentEnabled: !prev.onlinePaymentEnabled,
    }));
  };

  const toggleFeedback = () => {
    setSettings(prev => ({
      ...prev,
      feedbackEnabled: !prev.feedbackEnabled,
    }));
  };

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }, [settings]);

  const value = useMemo(
    () => ({
      onlinePaymentEnabled: settings.onlinePaymentEnabled,
      feedbackEnabled: settings.feedbackEnabled,
      toggleOnlinePayment,
      toggleFeedback,
    }),
    [settings]
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
