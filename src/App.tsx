import * as React from "react";
import "simplebar/dist/simplebar.min.css";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./routes";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <React.Fragment>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <ScrollToTop />
        <Router />
      </SnackbarProvider>
    </React.Fragment>
  );
}
