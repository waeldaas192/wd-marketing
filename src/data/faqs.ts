import type { FaqSectionData } from "@/components/ui/habit-faq-scroller";

// Existing WD Marketing FAQ copy, with enquiry/payment information in its own card.
export const faqData = {
  mainTitle: "A clearer starting point.",
  mainSubtitle: "Answers before we begin — from choosing the right service to agreeing scope, expectations and next steps.",
  rows: [
    {
      id: "row1", label: "Getting started", speed: "60s", direction: "left",
      faqItems: [
        { id: "q1", question: "Can we start with a single service?", answer: "Yes. A focused website, search or campaign project can be the right starting point. We define the scope around the business problem and identify any dependencies before recommending additional work." },
        { id: "q2", question: "Can you work with an existing website?", answer: "The first step is to assess what can be improved, what should be retained and what is limiting progress. A rebuild is an option, not the automatic recommendation." },
      ],
    },
    {
      id: "row2", label: "Planning your project", speed: "45s", direction: "right",
      faqItems: [
        { id: "q3", question: "What information should I provide?", answer: "Your website, the services you want to grow, the locations you cover and the main business goal are useful starting points. Existing results and constraints help us ask better questions. Do not send passwords in the enquiry form." },
        { id: "q4", question: "How are scope and pricing agreed?", answer: "A proposal should define deliverables, responsibilities, dependencies and fees before paid work begins." },
      ],
    },
    {
      id: "row3", label: "Expectations and enquiries", speed: "70s", direction: "left",
      faqItems: [
        { id: "q5", question: "Do you guarantee rankings or revenue?", answer: "No. We agree a measurement plan and make decisions using the evidence available. Results depend on the offer, market, budget, implementation and follow-up, not just a website or campaign." },
        { id: "q6", question: "Does an enquiry make a booking?", answer: "The enquiry form collects an indicative budget; it does not make a booking or take payment." },
      ],
    },
  ],
} satisfies FaqSectionData;
