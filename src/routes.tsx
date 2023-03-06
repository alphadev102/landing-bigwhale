import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage"
import Privacy from "./views/Privacy"

export const isApp = () : boolean => {
    return !window.location.host.includes("landing")
}

export const useRoutes = () => {

    const landingPage = () => (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
            <Route  path="/privacy" element={<Privacy />} />
        </Routes>
    )

    const app = () => (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
            <Route  path="/privacy" element={<Privacy />} />
                
        </Routes>
    )
    
    return isApp() ? app() : landingPage()
}
