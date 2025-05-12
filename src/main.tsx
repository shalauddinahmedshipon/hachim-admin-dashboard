import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { useThemeStore } from "./store/useThemeStore";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ThemeInitializer = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeInitializer />
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
