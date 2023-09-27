import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route } from "react-router-dom";
import Login from "./features/Pages/login/login";
import SignUp from "./features/Pages/login/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Verification from "./features/Pages/login/verification";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContent from "./features/layouts/auth-content";
import Campaign from "./features/Pages/campaign/campaign";
import PulpyDashboard from "./features/Pages/dashboard/dashboard";
import Settings from "./features/Pages/settings/settings";
import AllLeads from './features/Pages/leads/allleads';
import TeamList from './features/Pages/Teams/teams';


const mdTheme = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#FF8140",
            color: "#FFF",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 4px -1px rgb(0 0 0 / 15%)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: "100%",
          justifyContent: "space-between",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verification" element={<Verification />} />
          <Route
            path="/dashboard"
            element={
              <AuthContent>                
                <PulpyDashboard />
              </AuthContent>
            }
          />
          <Route
              path="/settings"
              element={
                <AuthContent>
                  <Settings />
                </AuthContent>
              }
          />
          <Route
            path="/campaign"
            element={
              <AuthContent>
                <Campaign />
              </AuthContent>
            }
          />
           <Route
            path="/leads"
            element={
              <AuthContent>
                <AllLeads />
              </AuthContent>
            }
          />
           <Route
            path="/teamlist"
            element={
              <AuthContent>
                <TeamList />
              </AuthContent>
            }
          />
          
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
