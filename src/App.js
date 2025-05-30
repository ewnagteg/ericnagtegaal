import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Project from './components/Project.js';
import Home from './components/Home.js';
import { MathJaxContext } from "better-react-mathjax";
import Articles from "./components/Articles.js";
import TestAdmin from "./components/TestAdmin.js";
import LoginRedirect from './components/LoginRedirect.js';
import ReactGA from "react-ga4";
import { AuthenticationGuard } from "./components/AuthenticationGuard.js";
import TestApiCall from "./components/TestApp.js";
import VLApp from "./components/VLApp.js";
import VLEditTeam from "./components/VLEditTeam.js";
import VLGraphStats from "./components/VLGraphStats.js";
import VLProfile from "./components/VLProfile.js";
import NotepadProvider from "./components/NotepadProvider.js";
import Llmtest from "./components/Llmtest.js";

const TRACKING_ID = "G-0GHRD4B2XS";
ReactGA.initialize(TRACKING_ID);


function App() {
  useEffect(() => {
    ReactGA.send("pageview"); // Tracks initial page load
  }, []);
  return (
    <MathJaxContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/login" element={<LoginRedirect />} />
          {/* <Route path="/llmtest" element={<Llmtest />} /> */}
          {/* <Route path="/admin" element={
            <PrivateRoute>
              <TestAdmin />
              </PrivateRoute>
          } /> */}
          <Route
            path="/notepad"
            element={<AuthenticationGuard component={NotepadProvider} />}
          />
          <Route
            path="/admin"
            element={<AuthenticationGuard component={TestAdmin} />}
          />
          <Route
            path="/test"
            element={<AuthenticationGuard component={TestApiCall} />}
          />
          <Route
            path="/vl"
            element={<AuthenticationGuard component={VLApp} />}
          />
          <Route
            path="/edit-team"
            element={<AuthenticationGuard component={VLEditTeam} />}
          />
          <Route
            path="/stats"
            element={<AuthenticationGuard component={VLGraphStats} />}
          />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={VLProfile} />}
          />
        </Routes>
    </MathJaxContext>
  );
}

export default App;
