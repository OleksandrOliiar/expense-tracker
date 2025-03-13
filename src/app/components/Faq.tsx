import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqs = [
    {
      question: "How secure is my financial data?",
      answer:
        "Your financial data is protected with bank-level 256-bit encryption. We use secure connections and never store your banking credentials. Your privacy and security are our top priorities.",
    },
    {
      question: "Can I connect multiple bank accounts?",
      answer:
        "Yes! You can connect multiple bank accounts, credit cards, and investment accounts to get a complete picture of your finances in one place. Premium plans allow for unlimited account connections.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, we offer mobile apps for both iOS and Android devices, allowing you to track your finances on the go. The apps sync seamlessly with the web version so your data is always up to date.",
    },
    {
      question: "What if I need help setting up my account?",
      answer:
        "Our support team is available 7 days a week to help you set up your account, connect your banks, or answer any questions. You can reach us via email, chat, or schedule a call with our financial experts.",
    },
  ];

  return (
    <section className="py-32 max-w-[1000px] mx-auto px-4" id="faq">
      <div className="container mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
          Frequently asked questions
        </h1>
        {faqs.map((faq, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default Faq;