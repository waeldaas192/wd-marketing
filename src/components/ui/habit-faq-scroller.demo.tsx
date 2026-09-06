import FaqSection from "@/components/ui/habit-faq-scroller";
import { faqData } from "@/data/faqs";

// A local composition example, not a new public route or habit-product promotion.
export default function DemoOne() {
  return <FaqSection data={faqData} id="faq-demo" />;
}
