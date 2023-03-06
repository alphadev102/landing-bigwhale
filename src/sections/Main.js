import {GradientButton} from "../components/GradientButton";
import styled from "styled-components";
import {useRefLink} from "../hooks/useRefLink";
import {useTranslation} from "react-i18next";
import { Container } from "../components/Container";

export const Main = () => {

    const [openPlatformWithRefLink] = useRefLink()
    const { t } = useTranslation()
    // const StyeldSection = styled.section`
    //     background-image: url('/images/b_top.png');
    //     background-size: 100% 100%;
    // `
    const StyledSmall = styled.small`
        color: white;
        margin: auto 10px;
    `
    return (
        <section className="main">
            <Container>
                <div class="row mx-0 w-100">
                    <div class="col-xl-8 col-lg-12">
                        <div class="d-flex">
                            <img src="/images/logo.svg" width={48} style={{marginTop:"-20px", marginRight:"10px"}}/>
                            <h1 class="polar_headertitle ">BigWhale Liquidity Protocol</h1>
                        </div>
                        <p class="polar_title">Earn interest, borrow BNB, all on a Defi Smart Contract.
                            <br class="d-lg-block d-none"/> Daily rewards from 0.8% to 2%</p>
                        <div class="d-flex">
                            <div class="connect_wallet">
                                <GradientButton
                                    text={t("Launch App")}
                                    onClick={openPlatformWithRefLink}                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
                    <div style={{margin: "50px auto", width:"100%", justifyContent:"center", display:"flex"}}>
                        <iframe className="tube_iframe" src="https://www.youtube.com/embed/PReAQdWR8Rc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
            </Container>
        </section>
    )
}
