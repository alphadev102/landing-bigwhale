import {Details} from "../components/Details";
import {useTranslation} from "react-i18next";
import { Container } from "../components/Container";

export const Faq = () => {

    const { t } = useTranslation()

    const faq = [
        {
            summary: `${t("What is BigWhale.io and how does it make money?")}`,
            text: `${t("BigWhale.io is a de-centralized staking & borrowing protocol built on the Binance Smart Chain. We work with carefully vetted borrowers in the crypto industry, who are refused loans by traditional banks who do not fully understand the crypto industry or are bound by out-dated government regulations. These borrowers take loans from our protocol at daily interest rates ranging from 3% to 5%, and this is how we are able to pay stakers like you between 0.8% to 2% daily returns for your investment into the BigWhale Protocol.")}`
        },
        {
            summary: `${t("Who exactly are the borrowers you work with and what do they do?")}`,
            text: `${t("Our borrowers are thoroughly vetted businesses & individuals who usually operate in countries where traditional banks are not crypto-friendly, or in some cases, crypto is banned or heavily regulated at a government level, such as in China. Our borrowers are invovled in large-scale, capital-intensive crypto operations running propertiary AI-based trading & liquidity algorithms on major crypto exchanges, as well as massive crypto mining farms which require tons of capital to scale up. Capital which we are more than happy to provide at 3-5% per day while ensuring 100% anonymity.")}`
        },
        {
            summary: `${t("What is the minimum deposit I can start with? How much do I earn?")}`,
            text: `${t("You can stake a minimum of 0.1 BNB (Approximately ~$30 USD). Our interest rates range from 0.8% to 2% daily, credited to your account every 24 hours and available for withdrawal instantly to your wallet. You can also re-stake your earnings daily if you wish to compound them.")}`
        },
        {
            summary: `${t("When can I withdraw my initial deposit & earnings?")}`,
            text: `${t("You can withdraw your earnings (daily interest & referral rewards) at any time, it is credited to your wallet within seconds. You can withdraw your initial deposit after a minimum of one day, and it is available for withdrawal after 22 days to keep our protocol balanced, fair & sustainable for our stakers.")}`
        },
        {
            summary: `${t("Why do I need BNB, do you accept any other payment method?")}`,
            text: `${t("Our protocol works with BNB as it runs on the Binance Smart Chain. Buying BNB is very easy and straight forward - you can look up our docs or Youtube channel linked on the site or just ask for help in our friendly Telegram group. Another benefit of BNB is that since it is the official coin of the largest crypto exchange in the world, Binance - BNB's value remains very stable and goes up every few months against the dollar.")}`
        },
        {
            summary: `${t("How does the referral system increase my earnings?")}`,
            text: `${t("When you refer new people into the BigWhale Protocol, you help the protocol grow in liquidity. You are paid referral bonuses up to three levels deep - as a percentage of your referral's daily earnings. Your Level 1 referrals are the people you directly refer, Level 2 referrals are the people those people refer, and Level 3 referrals are the people your Level 2 referrals refer. The current referral bonus is 10% for Level 1, 5% for Level 2 and 2% for Level 3, paid out daily. All three levels combined can grow massively over time for you and turn into an optional but substantial passive source of income for you.")}`
        },
        {
            summary: `${t("Will the daily interest and referral bonuses be fixed or vary over time?")}`,
            text: `${t("Our interest rates for both stakers and borrowers, as well as referral bonus rates are locked into the smart contract, however, depending on the liquidity of the contract, as well as factors such as borrower's interest rates and the overall load on the contract balance, we may increase or decrease these rates in the future. However, any such change in interest rates or referral bonuses will be officially announced at least 2 weeks in advance. The BigWhale Protocol is built with long term sustainability and complete transperency in mind.")}`
        },
        {
            summary: `${t("Who is the team behind the BigWhale Protocol? Where are you located?")}`,
            text: `${t("BigWhale Fintech Co, Ltd. is incorporated as a private company in Switzerland. Our protocol is an answer to traditional, KYC banks and restrictive governments who are difficult to work with, especially for anyone in the crypto industry. We value the anonymity of our borrowers and stakers, as well as our partners and our team members. We do not require any form of KYC or identification from you or our borrowers - our trust is built on our open source, verified smart contract which anyone can see at any time on the Binance Smart Chain. As part of the de-centralized finance movement, we do not ask for KYC or ID for those we work with, nor do we give out any KYC or ID of our own. Everything exists on the blockchain in a completely transparent, anonymous and de-centralized manner.")}`
        },
        {
            summary: `${t("How risky is the BigWhale Protocol? How much can I safely invest?")}`,
            text: `${t("Our primary risk comes in the form of \"bad debts\", which is a part of any money-lending business, be it a traditional bank or a modern, DeFi protocol like ours. However, we greatly minimize this risk by not only thoroughly vetting our borrowers, but also by locking in a part of their collateral in a separate, borrowers smart contract which is made between us and the borrower, which safeguards at least 30 to 40% of all of our approved loans in the case of a borrower defaulting on their daily interest payments to us. With that said, we are very open about the risks involved in not just our DeFi project but any DeFi platform for that matter, and we highly recommend you to invest responsibly and do not stake more than 5% of your total savings into any single investment, including us.")}`
        }
    ]

    return (
        <section className="faq" id="faq">
            <Container>
            <div className="faq__title">
                <h2 className="title">
                    {t("FAQ")}
                </h2>
            </div>
            {
                faq.map((item, index) => {
                    return (
                        <Details
                            summary={item.summary}
                            text={item.text}
                        />
                    )
                })
            }
            </Container>
        </section>
    )

}
