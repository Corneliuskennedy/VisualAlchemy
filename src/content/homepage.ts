/**
 * Homepage Content - Unified bilingual structure
 * Single source of truth for homepage content
 */

import { ContentStructure, HomepageContent } from './types';

export const homepageContent: ContentStructure<HomepageContent> = {
  en: {
    meta: {
      title: 'Build. Optimize. Create. | Octomatic',
      description: 'We build the automated systems and create the captivating content that drives intelligent growth.',
    },
    hero: {
      headline: 'Build. Optimize. Create.',
      subline: 'We build the automated systems and create the captivating content that drives intelligent growth.',
      ctaText: 'Discover How It Works',
    },
    segmentation: {
      headline: 'What is your primary objective?',
      subheadline: '',
      cards: [
        {
          title: 'Build a New System',
          description: 'Turn your vision into a market-ready reality. We architect robust, automated systems from the ground up to validate your idea, minimize risk, and ensure a powerful launch.',
          ctaText: 'Explore the Lab →',
          href: '/build',
        },
        {
          title: 'Optimize an Existing Business',
          description: 'Eliminate operational chaos and unlock your team\'s true potential. We replace costly manual work with intelligent automation to streamline processes and scale your business with precision.',
          ctaText: 'See Automation Services →',
          href: '/optimize',
        },
        {
          title: 'Create Viral Content',
          description: 'Stop shouting into the void. We produce stunning, AI-powered visuals and data-driven content that captivates your audience and commands attention in a crowded digital world.',
          ctaText: 'View the Portfolio →',
          href: '/create',
        },
      ],
    },
    socialProof: {
      headline: 'Trusted by industry leaders and ambitious startups.',
    },
    whyUs: {
      headline: 'The Synergy of System & Story',
      description: 'Most agencies specialize in either technical systems or creative storytelling, but true growth happens at the intersection of both. Our deep expertise in automation ensures our creative work is data-driven and strategically deployed for maximum impact. At the same time, our experience as storytellers means the systems we build are human-centric, intuitive, and designed for real-world engagement. This creates a powerful feedback loop that fuels smarter, more sustainable growth.',
      points: [
        {
          title: 'Proven Expertise',
          description: '12+ startups launched, 200+ businesses helped',
        },
        {
          title: 'Fast & Efficient',
          description: 'From idea to working product in 30 days',
        },
        {
          title: 'Data-Driven',
          description: 'Every decision is supported by data and measurements',
        },
      ],
    },
    finalCta: {
      text: 'Start Your Project Today',
    },
    team: {
      headline: 'Meet the Team',
      description: 'The experts behind every beautiful website we build. 6+ years of experience crafting premium web experiences with Cursor AI.',
      ctaText: 'Ready to work with us?',
    },
  },
  nl: {
    meta: {
      title: 'Build. Optimize. Create. | Octomatic',
      description: 'We bouwen de geautomatiseerde systemen en creëren de boeiende content die intelligente groei aandrijft.',
    },
    hero: {
      headline: 'Build. Optimize. Create.',
      subline: 'We bouwen de geautomatiseerde systemen en creëren de boeiende content die intelligente groei aandrijft.',
      ctaText: 'Ontdek Hoe Het Werkt',
    },
    segmentation: {
      headline: 'Wat is je primaire doel?',
      subheadline: '',
      cards: [
        {
          title: 'Bouw een Nieuw Systeem',
          description: 'Verander je visie in een marktklaar product. We ontwerpen robuuste, geautomatiseerde systemen vanaf de grond om je idee te valideren, risico te minimaliseren en een krachtige lancering te garanderen.',
          ctaText: 'Verken de Lab →',
          href: '/build',
        },
        {
          title: 'Optimaliseer een Bestaand Bedrijf',
          description: 'Elimineer operationele chaos en ontgrendel het ware potentieel van je team. We vervangen kostbare handmatige werkzaamheden door intelligente automatisering om processen te stroomlijnen en je bedrijf met precisie te schalen.',
          ctaText: 'Bekijk Automatisering Diensten →',
          href: '/optimize',
        },
        {
          title: 'Creëer Virale Content',
          description: 'Stop met roepen in de leegte. We produceren verbluffende, AI-aangedreven visuals en data-gedreven content die je publiek boeit en aandacht trekt in een drukke digitale wereld.',
          ctaText: 'Bekijk het Portfolio →',
          href: '/create',
        },
      ],
    },
    socialProof: {
      headline: 'Vertrouwd door industrieleiders en ambitieuze startups.',
    },
    whyUs: {
      headline: 'De Synergie van Systeem & Verhaal',
      description: 'De meeste bureaus specialiseren zich in technische systemen of creatief storytelling, maar echte groei gebeurt op het snijvlak van beide. Onze diepgaande expertise in automatisering zorgt ervoor dat ons creatieve werk data-gedreven is en strategisch wordt ingezet voor maximale impact. Tegelijkertijd betekent onze ervaring als verhalenvertellers dat de systemen die we bouwen mensgericht, intuïtief en ontworpen zijn voor echte wereldwijde betrokkenheid. Dit creëert een krachtige feedbackloop die slimmere, duurzamere groei aanwakkert.',
      points: [
        {
          title: 'Bewezen Expertise',
          description: '12+ startups gelanceerd, 200+ bedrijven geholpen',
        },
        {
          title: 'Snel & Efficiënt',
          description: 'Van idee naar werkend product in 30 dagen',
        },
        {
          title: 'Data-Driven',
          description: 'Elke beslissing wordt ondersteund door data en metingen',
        },
      ],
    },
    finalCta: {
      text: 'Start Je Project Vandaag',
    },
    team: {
      headline: 'Ontmoet het Team',
      description: 'De experts achter elke prachtige website die we bouwen. 6+ jaar ervaring met het creëren van premium web-ervaringen met Cursor AI.',
      ctaText: 'Klaar om met ons samen te werken?',
    },
  },
};



