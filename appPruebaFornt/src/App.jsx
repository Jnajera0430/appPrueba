import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { RouteProtectedLogin } from "./RouteProtectedLogin";
import { useAuthStore } from "../api/apiStoreZustand";
import { RouteProtected } from "./RouteProtected";
const Login = lazy(() => import("./components/login/Login"));
const Navbar = lazy(() => import("./Navbar"));
const IndexUser = lazy(() => import("./components/user/Index"));
const IndexAdmin = lazy(()=>import("./components/admin/IndexAdmin"));
const IndexEmple = lazy(()=>import("./components/empleado/IndexEmple"));
function App() {
  const profileAuth = useAuthStore((state) => state.profile);
  return (
    <div>
        <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <RouteProtectedLogin
                isAllowed={!!profileAuth}
                redirectTo={
                  profileAuth?.rol == "user" ? "/user" : profileAuth?.rol == "admin" ? "/admin" : profileAuth?.rol == "empleado" ? "/empleado":"/" 
                }
              />
            }
          >
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            element={
              <RouteProtected
              isAllowed={
                !!profileAuth && profileAuth?.rol == "user"
              }
              redirectTo="/login"
              />
            }
          >
            <Route path="/user" element={<IndexUser/>}/>
          </Route>
          <Route
            element={
              <RouteProtected
              isAllowed={
                !!profileAuth && profileAuth?.rol == "admin"
              }
              redirectTo="/login"
              />
            }
          >
            <Route path="/admin" element={<IndexAdmin/>}/>
          </Route>
          <Route
            element={
              <RouteProtected
              isAllowed={
                !!profileAuth && profileAuth?.rol == "empleado"
              }
              redirectTo="/login"
              />
            }
          >
            <Route path="/empleado" element={<IndexEmple/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
