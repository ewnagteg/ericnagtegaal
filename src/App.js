import React, { useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Project from './components/Projects.js';
import Home from './components/Home.js';
import { MathJaxContext } from "better-react-mathjax";
import Articles from "./components/pages/Articles.js";
import LoginRedirect from './components/LoginRedirect.js';
import ReactGA from "react-ga4";
import { AuthenticationGuard } from "./components/auth/AuthenticationGuard.js";
import VLApp from "./components/vl/VLApp.js";
import VLEditTeam from "./components/vl/VLEditTeam.js";
import VLGraphStats from "./components/vl/VLGraphStats.js";
import VLProfile from "./components/vl/VLProfile.js";
import NotepadProvider from "./components/notepad/NotepadProvider.js";

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
                <Route
                    path="/notepad"
                    element={<AuthenticationGuard component={NotepadProvider} />}
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
