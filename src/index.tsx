import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupWorker } from "msw";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import todosDb from "./backend/db";
import { handlers } from "./backend/server";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Seed the database
todosDb.seed();

// Start the Mock Service Worker
setupWorker(...handlers).start();

const brandColors = {
  50: "#f6f8fa",
  100: "#d9e1e9",
  200: "#bfcde1",
  300: "#a4b8d8",
  400: "#8aa3d0",
  500: "#6f8ec7",
  600: "#5b74a6",
  700: "#455b85",
  800: "#2f4163",
  900: "#182840",
};

const theme = extendTheme({
  fonts: {
    heading: `'Quicksand', sans-serif`,
    body: `'Quicksand', sans-serif`,
  },
  colors: {
    brand: brandColors,
  },
});

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
