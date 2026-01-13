import { axiosInstance } from "@/config/axiosInstances";
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";



interface AdminSettingInfo {
  onlinePaymentEnabled: boolean;
  feedbackEnabled: boolean;
}

interface AdminSettingsContextType extends AdminSettingInfo {
  loading: boolean;
  toggleOnlinePayment: () => Promise<void>;
  toggleFeedback: () => Promise<void>;
}



export const AdminContext = createContext<AdminSettingsContextType | undefined>(undefined);



export const AdminSettingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [settings, setSettings] = useState<AdminSettingInfo>({
    onlinePaymentEnabled: false,
    feedbackEnabled: false,
  });

  const [loading, setLoading] = useState<boolean>(true);



  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axiosInstance.get(
          "/open/admin/settings"
        );

        const { onlinePaymentEnabled, feedbackEnabled } =
          response.data;

        setSettings({
          onlinePaymentEnabled,
          feedbackEnabled,
        });
      } catch (error) {
        console.error("Failed to fetch admin settings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);



  const toggleOnlinePayment = async () => {
    try {
      const response = await axiosInstance.patch(
        "/admin/settings/toggle-payment"
      );

      setSettings((prev) => ({
        ...prev,
        onlinePaymentEnabled:
          response.data.onlinePaymentEnabled,
      }));
    } catch (error) {
      console.error("Failed to toggle online payment", error);
    }
  };



  const toggleFeedback = async () => {
    try {
      const response = await axiosInstance.patch(
        "/admin/settings/toggle-feedback"
      );

      setSettings((prev) => ({
        ...prev,
        feedbackEnabled: response.data.feedbackEnabled,
      }));
    } catch (error) {
      console.error("Failed to toggle feedback", error);
    }
  };



  const value = useMemo(
    () => ({
      onlinePaymentEnabled: settings.onlinePaymentEnabled,
      feedbackEnabled: settings.feedbackEnabled,
      loading,
      toggleOnlinePayment,
      toggleFeedback,
    }),
    [settings, loading]
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
