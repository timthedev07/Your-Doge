import React, { FC } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import Head from "next/head";

const FAQContent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70%",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
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

export default FAQ;
