import { ConfigProvider } from "antd";
import { useTheme } from "./ThemeProvider";
import { ANTD_THEME, ANTD_THEME_DARK } from "@/services/constants";

export const AntDProvider = ({ children }: { children: React.ReactNode }) => {
  const { IsDark } = useTheme();
  return (
    <ConfigProvider
      theme={IsDark ? ANTD_THEME_DARK : ANTD_THEME}>
      {children}
    </ConfigProvider>
  );
};
