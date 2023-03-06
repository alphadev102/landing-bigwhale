
import styled from 'styled-components'
import {GradientButton} from "../components/GradientButton";
import {useRefLink} from "../hooks/useRefLink";
import {useTranslation} from "react-i18next";
import { Container } from '../components/Container';


export const How = () => {

    const [openPlatformWithRefLink] = useRefLink()
    const { t } = useTranslation()
    const StyeldImage = styled.img`
        width: 40px;
        margin-right: 20px;
    `
    return (
        <section className="how" id="how">
            <Container>
                <div class="container">
                    <h1 class="how_headertitle">How The BigWhale Protocol Works</h1>
                    {/* <p class="text-white">Earn interest, borrow BNB, all on a DeFi Smart Contract. Daily rewards from 0.8% to 2%.</p> */}
                    <div className='d-flex'>
                        <StyeldImage src="/images/logo.svg" class="logo__svg me-3" alt="logo" />
                        <div style={{width:"100%"}}>
                            <p class="fw-bold title fs-5 mb-2">A 100% Transparent DeFi Staking & Borrowing Protocol</p>
                            <hr class="my__hr"/>
                            <p class="text-white">The BigWhale BNB staking &amp; borrowing protocol runs on a decentralized, <a href='https://bscscan.com/address/0x217538d6229c6ca6ea665a7637a502dee9994570' className='pink_link' target={"_blank"}>verified smart contract</a> on the BSC blockchain.</p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <StyeldImage src="/images/logo.svg" class="logo__svg me-3" alt="logo"/>
                        <div style={{width:"100%"}}>
                        <p class="fw-bold title fs-5 mb-2"> Stake &amp; Earn</p>
                            <hr class="my__hr"/>
                            <p class="text-white">Deposit your BNB into our DeFi BNB staking protocol and earn rewards ranging from 0.8% to 2% daily interest for securing &amp; contributing to our protocol.</p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <StyeldImage src="/images/logo.svg" class="logo__svg me-3" alt="logo"/>
                        <div style={{width:"100%"}}>
                        <p class="fw-bold title fs-5 mb-2"> Borrow BNB from our protocol</p>
                            <hr class="my__hr"/>
                            <p class="text-white">Borrow BNB at a rate of 5% interest per day (compounded) from our BNB protocol. Visit our Borrowing page in the app to apply for a loan – minimum loan amount is 200 BNB. Approval and Loan Limit depends on your current assets.</p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <StyeldImage src="/images/logo.svg" class="logo__svg me-3" alt="logo"/>
                        <div style={{width:"100%"}}>
                        <p class="fw-bold title fs-5 mb-2"> Withdraw Instantly</p>
                            <hr class="my__hr"/>
                            <p class="text-white">Withdraw your daily rewards back to your wallet in less than a minute. The BigWhale DeFi protocol works with 14 popular Web3 wallets such as MetaMask for a seamless &amp; secure experience.</p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <StyeldImage src="/images/logo.svg" class="logo__svg me-3" alt="logo"/>
                        <div style={{width:"100%"}}>
                        <p class="fw-bold title fs-5 mb-2"> Refer &amp; Earn More</p>
                            <hr class="my__hr"/>
                            <p class="text-white">Earn even more by referring other people to the BigWhale Protocol. The protocol pays you a part of your referral’s earnings, up to three levels deep – at 10%, 5% &amp; 2%. If you refer other people for a BigWhale Protocol loan, you get 1% (not exceeding 80 BNB) of the sanctioned loan amount if they are approved.</p>
                        </div>
                    </div>
                       
                    </div>
           
        </Container>
        </section>
    )
}
