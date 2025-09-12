import { BlueprintTranslations } from '../types';

export const blueprint: Record<'en' | 'nl', BlueprintTranslations> = {
  en: {
    badge: "THE BLUEPRINT",
    title: "The antidote to chaos: a fixed-price, guaranteed-ROI workshop",
    description: "This is not a traditional consultation. In this interactive, hands-on 4-hour session, we give your team the tools and methodology to identify and solve the most costly bottlenecks in your processes themselves. You're not investing in a report; you're investing in your team's capabilities.",
    price: "€1.497",
    investmentTitle: "We transform your team into an internal engine of efficiency",
    investmentSubtitle: "For €1,497, they get the operational handles to:",
    input: {
      badge: "INPUT: YOUR CHALLENGE",
      label: "PROBLEM",
      example: "\"Processes feel inefficient\""
    },
    process: {
      step1: {
        title: "Process visualization and mapping",
        description: "We apply the '4Cs Map' methodology together to teach your team the technique of value stream mapping. They leave with a proven, repeatable method to visualize any workflow."
      },
      step2: {
        title: "Identifying highest ROI opportunities", 
        description: "Your team learns how to quantify bottlenecks and prioritize opportunities based on impact versus effort, a core principle for measuring results."
      },
      step3: {
        title: "Building support for change",
        description: "We give your team the tools to remove fear of automation and successfully guide change, by creating awareness and knowledge."
      },
      step4: {
        title: "Defining a concrete action plan",
        description: "We don't end with theory. The goal is to define one clear, validated 'first step' that delivers immediate value and builds momentum."
      }
    },
    output: {
      badge: "OUTPUT: YOUR CREATED ACTION PLAN",
      label: "IDEA",
      example: "Automate review"
    },
    trust: {
      handsOn: {
        title: "100% HANDS-ON",
        description: "No report, real skills."
      },
      guarantee: {
        title: "ROI GUARANTEE",
        description: "€15,000+ savings, or your money back."
      }
    },
    cta: "Book My Workshop & Guarantee My ROI"
  },
  nl: {
    badge: "DE BLAUWDRUK", 
    title: "Het tegengif voor chaos: een fixed-price workshop met ROI-garantie",
    description: "Dit is geen traditionele consultatie. In deze interactieve hands-on sessie van 4 uur geven we uw team de tools en de methode om zelf de meest kostbare knelpunten in uw processen te identificeren en op te lossen. U investeert niet in een rapport; u investeert in de vaardigheden van uw team.",
    price: "€1.497",
    investmentTitle: "We transformeren uw team tot een interne motor van efficiëntie",
    investmentSubtitle: "Voor €1.497 krijgen ze de operationele handvaten om:",
    input: {
      badge: "INPUT: UW UITDAGING",
      label: "PROBLEEM", 
      example: "\"Processen voelen inefficiënt\""
    },
    process: {
      step1: {
        title: "Processen zien en in kaart brengen",
        description: "We passen samen de '4Cs Map' toe om uw team de techniek van value stream mapping te leren. Ze vertrekken met een bewezen, herhaalbare methode om elke workflow te visualiseren."
      },
      step2: {
        title: "De hoogste ROI kansen identificeren",
        description: "Uw team leert hoe ze knelpunten kunnen kwantificeren en kansen kunnen prioriteren op basis van impact versus inspanning, een kernprincipe voor het meten van resultaten."
      },
      step3: {
        title: "Draagvlak creëren voor verandering", 
        description: "We geven uw team de handvaten om de angst voor automatisering weg te nemen en verandering succesvol te begeleiden, door bewustwording en kennis te creëren."
      },
      step4: {
        title: "Een concreet actieplan definiëren",
        description: "We eindigen niet met theorie. Het doel is om één duidelijke, gevalideerde 'eerste stap' te definiëren die onmiddellijke waarde levert en momentum opbouwt."
      }
    },
    output: {
      badge: "OUTPUT: UW GECREËERDE ACTIEPLAN",
      label: "IDEE",
      example: "Automatiseer controle"
    },
    trust: {
      handsOn: {
        title: "100% HANDS-ON",
        description: "Geen rapport, echte vaardigheden."
      },
      guarantee: {
        title: "ROI-GARANTIE", 
        description: "€15.000+ besparing, of uw geld terug."
      }
    },
    cta: "Boek Mijn Workshop & Garandeer Mijn ROI"
  }
}; 