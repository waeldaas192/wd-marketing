import FaqSection from "@/components/ui/habit-faq-scroller";
import { faqData } from "@/data/faqs";

export function FAQ() {
  return <FaqSection data={faqData} headingId="faq-heading" />;
}
