import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

const App = () => {
  return (
    <main>
      {/* Toast Container */}
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />

      {/* Navbar */}
      <Navbar />

      {/* Main Content Pages */}
      <Box height="100%" width="100%">
        <AppRoutes />
      </Box>
    </main>
  );
};

export default App;
