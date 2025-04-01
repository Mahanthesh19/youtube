import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VideoDetails from "./pages/VideoDetails";
import ChannelDetails from "./pages/ChannelDetails";

const App = () => {
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <AuthProvider>
        <Router>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/video/:videoId" element={<VideoDetails />} />
                <Route path="/channel/:channelId" element={<ChannelDetails />} />
              </Routes>
            </div>
        </Router>  
    </AuthProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

