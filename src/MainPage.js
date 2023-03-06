import MainHeader  from "./components/MainHeader";
import { Container } from "./components/Container";
import { Footer } from "./components/Footer";
import WalletCard from "./components/WalletCard";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import { useEffect } from "react";
import CookieConsent from "react-cookie-consent"
import { useTranslation } from "react-i18next"
import DashboardText from "./components/DashboardText";
import StakeSection from "./sections/StakeSection";

function MainPage() {

    const search = useLocation().search
    const ref = new URLSearchParams(search).get('ref')
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()

    const setRef = () => {
        const cookies = new Cookies();

        if (ref !== undefined && ref !== null && ref !== 'true') {
            cookies.set('ref', ref, { path: '/' })
            const queryParams = new URLSearchParams(location.search)
            if (queryParams.has('ref')) {
            queryParams.delete('ref')
            navigate({
                search: queryParams.toString(),
            }, {replace: true})
            }
        } else {
            const refCookie = cookies.get('ref')
            if (refCookie !== undefined && refCookie !== null && refCookie !== 'true') {
                window.location.search = `?ref=${refCookie}`
            }
        }
    }

    useEffect(() => {
        setRef()
    }, [])


    return (
        <>
            <div className="body">
                <div className="bg1"></div>
                <div className="bg2"></div>
                <div className="bg3"></div>
                <MainHeader />
                <Container>
                    <DashboardText />
                    <WalletCard />
                    <StakeSection />
                </Container>
                <Footer />

                <CookieConsent
                    location="bottom"
                    buttonText={t("Got it")}
                    cookieName="ref"
                    contentStyle={{margin: "0", flex: "unset"}}
                    style={{ background: "linear-gradient(132.55deg,#28ade5 -11.17%,#8d77da 48.6%,#fe3dce 114.93%)", alignItems: 'center', padding: "15px", boxSizing: "border-box", gap: "10px" }}
                    buttonStyle={{ color: "#DB499E", fontSize: "13px", background: "#fff", borderRadius: "8px", fontFamily: "Mulish", fontWeight: "600", boxSizing: "border-box", margin: "0" }}
                >
                    {t("This website uses cookies to enhance the user experience.")}
                </CookieConsent> 
            </div>
        </>
    );
}

export default MainPage
