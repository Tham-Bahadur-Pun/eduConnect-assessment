import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Suspense } from "react";
import { Loader } from "./components/ui/Loader";
import routes from "./routes";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Layout } from "./components/layout/Layout";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Layout>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <Loader size="large" />
                </div>
              }
            >
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
