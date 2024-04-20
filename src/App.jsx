import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Payments from "./pages/Payments";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddStudent from "./pages/AddStudent";
import { Toaster } from "react-hot-toast";
import EditStudent from "./pages/EditStudent";
import AddClass from "./pages/AddClass";
import EditClass from "./pages/EditClass";
import AddPayment from "./pages/AddPayment";
import EditPayment from "./pages/EditPayment";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="classes" element={<Classes />} />
                <Route path="classes/addClass" element={<AddClass />} />
                <Route path="classes/:classId" element={<EditClass />} />
                <Route path="students" element={<Students />} />
                <Route path="students/addStudent" element={<AddStudent />} />
                <Route path="students/:studentId" element={<EditStudent />} />
                <Route path="payments" element={<Payments />} />
                <Route path="payments/addPayment" element={<AddPayment />} />
                <Route path="payments/:paymentId" element={<EditPayment />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 3000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
