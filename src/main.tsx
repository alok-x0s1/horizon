import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider, ThemeProvider } from "./provider";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
	<QueryProvider>
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<App />
			<Toaster />
		</ThemeProvider>
	</QueryProvider>,
);
