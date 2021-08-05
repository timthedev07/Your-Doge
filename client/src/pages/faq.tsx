import React, { FC } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandIcon from "@material-ui/icons/ExpandMore";

const FAQContent = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={ExpandIcon}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const FAQ: FC = () => {
  return (
    <div className="faq-page">
      <header className="faq-page-header"></header>
      <main style={{ width: "50%" }} className="faq-page-content">
        <FAQContent />
      </main>
    </div>
  );
};

export default FAQ;
