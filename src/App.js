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
import VLPlayerStats from "./components/vl/VLPlayerStats.js";
import VLTeamStats from "./components/vl/VLTeamStats.js";
import NotepadProvider from "./components/notepad/NotepadProvider.js";
import VLGroups from "./components/vl/VLGroups.js";
import VLMatches from "./components/vl/VLMatches.js";
import { MessageProvider } from "./components/MessageProvider.js";

const TRACKING_ID = "G-0GHRD4B2XS";
ReactGA.initialize(TRACKING_ID);


function App() {
    useEffect(() => {
        ReactGA.send("pageview"); // Tracks initial page load
    }, []);
    return (
        <MathJaxContext>
            <MessageProvider>

                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* resume link goes to this path */}
                    <Route path="/resume" element={<Home />} />
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
                        path="/vl/group"
                        element={<AuthenticationGuard component={VLGroups} />}
                    />
                    <Route path="/vl/player-stats/:playerId" element={<AuthenticationGuard component={VLPlayerStats} />} />
                    <Route
                        path="/edit-team"
                        element={<AuthenticationGuard component={VLEditTeam} />}
                    />
                    <Route
                        path="/vl/matches"
                        element={<AuthenticationGuard component={VLMatches} />}
                    />
                    <Route
                        path="/stats"
                        element={<AuthenticationGuard component={VLGraphStats} />}
                    />
                    <Route
                        path="/team-stats"
                        element={<AuthenticationGuard component={VLTeamStats} />}
                    />
                    <Route
                        path="/profile"
                        element={<AuthenticationGuard component={VLProfile} />}
                    />
                </Routes>
            </MessageProvider>
        </MathJaxContext>
    );
}

export default App;
