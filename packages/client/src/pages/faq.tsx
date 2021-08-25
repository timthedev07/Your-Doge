import React, { FC } from "react";
import { CustomAccordionProps } from "../types/props";
import MUAccordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

const Accordion: React.FC<CustomAccordionProps> = ({ content, title }) => {
  return (
    <MUAccordion>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <h5>
          <img
            style={{ width: "45px", height: "45px" }}
            src="/images/icons/question.svg"
            alt=""
          />
          &nbsp;&nbsp;
          {title}
        </h5>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </MUAccordion>
  );
};

const FAQContent = () => {
  return (
    <div className="faq-accordions-container">
      <div
        style={{
          width: "70%",
        }}
      >
        <Accordion
          title="What is the purpose of Your Doge?"
          content="Our destiny is to provide a clean, intuitive, and friendly software to manage your homework effectively and increase your productivity."
        />
        <Accordion
          title="What is the maximum number of items you can have?"
          content="Unfortunately, we don't have that much resources, so each user can have 500 items of homework maximum. However, you can request to increase the quota."
        />
        <Accordion
          title="What do I do when I need more quota?"
          content={
            <div>
              If you find our service helpful and want to increase the quota to
              continue using it, you can send us a message{" "}
              <Link href="/contact" passHref>
                <a className="normal-links">here</a>
              </Link>
              . Make sure the &apos;quota&apos; option is selected as the topic,
              and in the body section, tell us the reason why you want to
              increase the limit.
            </div>
          }
        />
        <Accordion
          title="What would happen once you delete your account?"
          content="Your account will be permanently removed along with you homework data. You cannot recover anything once the process is complete."
        />
        <Accordion
          title="How do you handle our data?"
          content={
            <div>
              We provide our customers free service, and we promise that we
              won&apos;t violate any policy or sell your data. Please see our{" "}
              <Link href="/terms-and-conditions">
                <a className="normal-links">Terms and Conditions</a>
              </Link>
              {" and "}
              <Link href="/privacy-policy">
                <a className="normal-links">Privacy Policy</a>
              </Link>{" "}
              for more information.
            </div>
          }
        />
      </div>
    </div>
  );
};

const FAQ: FC = () => {
  return (
    <div className="faq-page">
      <Head>
        <title>FAQ | Your Doge</title>
      </Head>
      <header className="faq-page-header">
        <div className="faq-page-header__background"></div>
        <h1 className="fag-page-header__heading">FAQ</h1>
      </header>

      <main className="faq-page-content">
        <FAQContent />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (_context) => {
  return {
    props: {},
  };
};

export default FAQ;
