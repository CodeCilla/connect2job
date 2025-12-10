import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages communes
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateOffer from "./pages/CreateOffer";

function AppRoutes() {
    const { isAuthenticated, isStudent, isCompany } = useAuth();

    return (
        <div className="mes-super-classes">
            <Header />
            <main>
                <Routes>
                    {/* Routes publiques */}
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/" replace />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/" replace />
                            ) : (
                                <Register />
                            )
                        }
                    />

                    {/* Routes pour les étudiants */}
                    <Route
                        path="/offers"
                        element={
                            <ProtectedRoute requiredRole="STUDENT">
                                {/* pages offres d'emploi */}
                            </ProtectedRoute>
                        }
                    />

                    {/* ... */}

                    {/* Routes pour les entreprises */}
                    <Route
                        path="/my-offers"
                        element={
                            <ProtectedRoute requiredRole="COMPANY">
                                {/* page mes offres */}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/offers/create"
                        element={
                            <ProtectedRoute requiredRole="COMPANY">
                                <CreateOffer />
                            </ProtectedRoute>
                        }
                    />

                    {/* ... */}

                    {/* Routes partagées - redirigent vers le bon composant selon le rôle */}
                    <Route
                        path="/applications"
                        element={
                            isStudent ? (
                                <ProtectedRoute requiredRole="STUDENT">
                                    {/* page candidature */}
                                </ProtectedRoute>
                            ) : isCompany ? (
                                <ProtectedRoute requiredRole="COMPANY">
                                    {/* page candidats */}
                                </ProtectedRoute>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* ... */}

                    {/* Route 404 */}
                    <Route path="*" element={<>{/* à implémenter */}</>} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
