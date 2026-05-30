import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import Clinics from "./pages/Clinics";
import DiagnosticCenters from "./pages/DiagnosticCenters";
import Diagnostics from "./pages/Diagnostics";
import Authors from "./pages/Authors";
import Publications from "./pages/Publications";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/diagnostic-centers" element={<DiagnosticCenters />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/services" element={<Services />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/publications" element={<Publications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
