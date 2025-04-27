
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LTCRBooking from "./pages/LTCRBooking";
import EventBooking from "./pages/EventBooking";
import Activities from "./pages/Activities";
import Notifications from "./pages/Notifications";
import ContactUs from "./pages/ContactUs";
import RequestApproval from "./pages/RequestApproval";
import HighPriority from "./pages/HighPriority";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:userType" element={<Dashboard />} />
          <Route path="/ltcr-booking" element={<LTCRBooking />} />
          <Route path="/event-booking" element={<EventBooking />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/request-approval" element={<RequestApproval />} />
          <Route path="/high-priority" element={<HighPriority />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
