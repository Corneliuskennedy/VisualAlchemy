import { ProblemsTranslations } from '../types';

export const problems: Record<'en' | 'nl', ProblemsTranslations> = {
  en: {
    title: "Your business is leaking money.",
    subtitle: "THE HIDDEN COSTS",
    description: "Every manual process, disconnected system, and repetitive task is a hidden tax on your growth. We'll show you where.",
    repetitiveTasks: {
      metric: "10+ hours lost per week",
      title: "Wasted time",
      description: "Your best people waste time on manual data entry, copying between systems, and repetitive tasks that could be automated."
    },
    outdatedSystems: {
      metric: "€5,630/month loss",
      title: "Hidden costs",
      description: "Inefficient workflows, manual errors, and legacy software silently eat into your profits without you realizing it."
    },
    missingData: {
      metric: "8+ hours per month wasted on reporting",
      title: "Manual reporting",
      description: "You waste valuable management time manually gathering data, which leads to slow, unreliable, and ultimately costly decisions."
    }
  },
  nl: {
    title: "Uw bedrijf lekt geld.",
    subtitle: "DE VERBORGEN KOSTEN",
    description: "Elk handmatig proces, elk losstaand systeem en elke repetitieve taak is een verborgen belasting op uw groei. Wij laten u zien waar.",
    repetitiveTasks: {
      metric: "10+ uur per week verloren",
      title: "Verspilde tijd",
      description: "Uw beste mensen verspillen tijd aan handmatige data-invoer, kopiëren tussen systemen, en repetitieve taken die geautomatiseerd kunnen worden."
    },
    outdatedSystems: {
      metric: "€5,630/maand verlies",
      title: "Verborgen kosten", 
      description: "Inefficiënte workflows, handmatige fouten en verouderde software vreten stilletjes uw winst op zonder dat u het doorhebt."
    },
    missingData: {
      metric: "8+ uur per maand verspild aan rapportages",
      title: "Handmatige rapportages",
      description: "U verspilt kostbare managementtijd aan het handmatig verzamelen van data, wat leidt tot trage, onbetrouwbare en uiteindelijk kostbare beslissingen."
    }
  }
}; 