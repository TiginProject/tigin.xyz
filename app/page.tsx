import {ChevronRight} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {RainbowButton} from "@/components/magicui/rainbow-button";
import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern";
import {AnimatedGradientText} from "@/components/magicui/animated-gradient-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  const faqs = [
    {
      question: "What is Tigin?",
      answer: "Tigin is a high-performance, open-source server software for Minecraft: Bedrock Edition. It is designed to provide a stable and efficient platform for hosting Minecraft Servers, with a focus on customization and extensibility through plugins."
    },
    {
      question: "Is Tigin fork of PocketMine-MP?",
      answer: "Yes. Tigin is a fork of PocketMine-MP, which is another popular server software for Minecraft: Bedrock Edition. PocketMine-MP is written in PHP and has a large plugin ecosystem. Tigin was created to provide a more performant and feature-rich alternative to PocketMine-MP."
    },
    {
      question: "Which should I choose: PocketMine-MP or Tigin?",
      answer: "For the fastest access to new Bedrock features, the most accurate vanilla behavior, and official backing from the original author, we strongly recommend Tigin. If you prefer a pure solution with a long-lasting plugin ecosystem and don't mind that some vanilla features are missing, PocketMine-MP remains an option."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <section>
        <div className="relative h-full overflow-hidden py-5 md:py-14 bg-[#0a0a0a]">
          <AnimatedGridPattern
            maxOpacity={0.05}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 text-white opacity-20"
            )}
          />

          <div className="z-10 flex flex-col">
            <div className="mt-20 grid grid-cols-1 md:mt-40">
              <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
                <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                  <h1
                    className={cn(
                      "text-white",
                      "relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2",
                      "text-balance text-left font-semibold tracking-tighter md:text-center",
                      "text-5xl sm:text-7xl"
                    )}
                  >
                    A {" "}
                    <AnimatedGradientText className="font-semibold tracking-tight">
                      highly customisable
                    </AnimatedGradientText>{" "}
                    server software for Minecraft: Bedrock Edition
                  </h1>
                </div>

                <p className="max-w-xl text-balance text-left text-base tracking-tight text-neutral-300 md:text-center md:text-lg">
                  Introducing the ultimate Minecraft: Bedrock Edition Server Software
                  <br />
                  Welcome to <b className="text-white">Tigin</b>, beyond dreams and imagination.
                </p>

                <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4 md:justify-center">
                    <RainbowButton className="rounded-xl h-11 px-8 gap-1" variant="outline" asChild>
                      <Link href="https://github.com/TiginProject/Tigin">
                        View Tigin on GitHub
                        <ChevronRight className="size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"/>
                      </Link>
                    </RainbowButton>

                    <RainbowButton className="rounded-xl h-11 px-8 gap-1" variant="outline" asChild>
                      <Link href="https://github.com/Nukkit/Nukkit">
                        View Documentations Page
                        <ChevronRight className="size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"/>
                      </Link>
                    </RainbowButton>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="faq" className="py-4 bg-black">
        <div className="flex flex-col w-full max-w-3xl gap-4 py-1 px-7 md:px-10 md:mx-auto">
          <h2 className="mb-2 text-center text-5xl font-bold tracking-tighter text-white">
            Frequently Asked Question
          </h2>

          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question} className="border-white/10">
                <AccordionTrigger className="text-lg font-semibold text-left text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="flex flex-col w-full max-w-3xl gap-4 py-1 px-7 md:px-10 md:mx-auto">
          <span className="text-neutral-500 text-sm">
            &copy; 2025 Tigin Project. All rights reserved.
          </span>
        </div>
      </section>
    </div>
  );
}
