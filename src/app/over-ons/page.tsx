'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/siteContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import GridBackground from '@/components/ui/GridBackground';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function OverOnsPage() {
  const { overOnsPage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Over Ons' : 'About Us',
      titleNL: 'Over Ons',
      href: isNL ? '/nl/over-ons' : '/over-ons',
      isCurrent: true
    }
  ];

  // Bilingual content
  const content = {
    hero: {
      headline: isNL 
        ? 'Wij zijn architecten van groei, geen technici.'
        : 'We are architects of growth, not technicians.',
      subline: isNL
        ? 'Onze reis heeft ons één ding geleerd: echte groei ontstaat wanneer intelligente systemen en meeslepende creativiteit perfect synchroon werken.'
        : 'Our journey has taught us one thing: real growth happens when intelligent systems and compelling creativity work in perfect harmony.'
    },
    founderStory: {
      headline: isNL
        ? 'Mijn Reis: Van Code naar Creativiteit, en Terug.'
        : 'My Journey: From Code to Creativity, and Back.',
      content: isNL
        ? 'Van jongs af aan werd ik gedreven door een fascinatie voor efficiëntie. Ik zag systemen—zowel digitaal als menselijk—en zag onmiddellijk hoe ze beter konden. Het oplossen van complexe puzzels en het elimineren van chaos door slimme automatisering was niet alleen werk; het was een passie. Het bracht een diepe voldoening om processen te stroomlijnen en te zien hoe een goed geoptimaliseerd systeem een bedrijf vleugels kon geven.\n\nNa jaren van het optimaliseren van bestaande structuren, verschoof mijn focus. Ik wilde niet langer alleen repareren, maar creëren. Dit leidde tot de oprichting van een "startup lab," waar we nieuwe digitale producten vanaf de grond opbouwden. De kick om een abstract idee om te zetten in een tastbaar, functioneel product was verslavend. Hier leerde ik wat er nodig is om een visie om te zetten in een robuust, schaalbaar systeem.\n\nDe meest onverwachte wending in mijn carrière kwam toen een klant, Black Swan Capitalist, me vroeg om AI-gedreven B-roll voor hun YouTube-kanaal te produceren. Ik dook in de wereld van visuele storytelling en realiseerde me iets fundamenteels: het beste systeem ter wereld is nutteloos als het de aandacht niet kan vangen. Een briljant product zonder een meeslepend verhaal is als een motor zonder brandstof.\n\nDeze drie ervaringen—Optimaliseren, Bouwen en Creëren—smolten samen tot de kernfilosofie van Octomatic. Ik realiseerde me dat duurzame groei geen kwestie is van één van deze pilaren, maar van de naadloze integratie van alle drie. Je hebt een efficiënte motor, een solide chassis en een design dat de aandacht trekt nodig om de race te winnen.'
        : 'From a young age, I was driven by a fascination with efficiency. I saw systems—both digital and human—and immediately saw how they could be better. Solving complex puzzles and eliminating chaos through smart automation wasn\'t just work; it was a passion. It brought deep satisfaction to streamline processes and see how a well-optimized system could give a business wings.\n\nAfter years of optimizing existing structures, my focus shifted. I no longer wanted to just fix, but to create. This led to the founding of a "startup lab," where we built new digital products from the ground up. The thrill of turning an abstract idea into a tangible, functional product was addictive. Here I learned what it takes to turn a vision into a robust, scalable system.\n\nThe most unexpected turn in my career came when a client, Black Swan Capitalist, asked me to produce AI-driven B-roll for their YouTube channel. I dove into the world of visual storytelling and realized something fundamental: the best system in the world is useless if it can\'t capture attention. A brilliant product without a compelling story is like an engine without fuel.\n\nThese three experiences—Optimizing, Building, and Creating—merged into Octomatic\'s core philosophy. I realized that sustainable growth isn\'t about one of these pillars, but about the seamless integration of all three. You need an efficient engine, a solid chassis, and a design that captures attention to win the race.'
    },
    mission: {
      headline: isNL
        ? 'Onze Missie: Groei Moeiteloos Laten Voelen.'
        : 'Our Mission: Making Growth Feel Effortless.',
      content: isNL
        ? 'Wij zijn er om ambitieuze bedrijven te bevrijden van de dagelijkse operationele chaos. Door een fundament van intelligente systemen en boeiende content te bouwen, creëren we de ruimte voor jou om te focussen op wat echt telt: innovatie, visie en de groei van je bedrijf.'
        : 'We exist to free ambitious businesses from daily operational chaos. By building a foundation of intelligent systems and compelling content, we create the space for you to focus on what really matters: innovation, vision, and the growth of your business.'
    },
    faq: {
      title: isNL ? 'Veelgestelde Vragen' : 'Frequently Asked Questions',
      items: [
        {
          question: isNL 
            ? 'Zijn jullie een eenmanszaak?'
            : 'Are you a one-person operation?',
          answer: isNL
            ? 'Octomatic is een boutique agency, en dat is ons grootste voordeel. Je krijgt directe toegang tot de hoofd-architect, wat topkwaliteit, duidelijke communicatie en één vast aanspreekpunt garandeert. Voor grotere projecten schalen we op met een vertrouwd netwerk van gespecialiseerde professionals.'
            : 'Octomatic is a boutique agency, and that\'s our biggest advantage. You get direct access to the lead architect, which guarantees top quality, clear communication, and one consistent point of contact. For larger projects, we scale up with a trusted network of specialized professionals.'
        },
        {
          question: isNL
            ? 'Waarom drie verschillende diensten? Zijn die niet compleet verschillend?'
            : 'Why three different services? Aren\'t they completely different?',
          answer: isNL
            ? 'Ze lijken verschillend, maar in de praktijk versterken ze elkaar constant. Ons diepgaand begrip van hoe een bedrijf schaalt (Optimaliseren) stelt ons in staat om betere producten te Bouwen. En onze expertise in het vangen van aandacht (Creëren) zorgt ervoor dat de systemen en producten die we bouwen ook daadwerkelijk succesvol zijn in de markt.'
            : 'They seem different, but in practice they constantly reinforce each other. Our deep understanding of how a business scales (Optimize) enables us to Build better products. And our expertise in capturing attention (Create) ensures that the systems and products we build are actually successful in the market.'
        },
        {
          question: isNL
            ? 'Wie is jullie ideale klant?'
            : 'Who is your ideal client?',
          answer: isNL
            ? 'Onze ideale klant is een ambitieuze oprichter of ondernemer die begrijpt dat succes op de lange termijn zowel een ijzersterk operationeel fundament als een meeslepend merkverhaal vereist. Ze zoeken geen snelle trucjes, maar een strategische partner voor duurzame groei.'
            : 'Our ideal client is an ambitious founder or entrepreneur who understands that long-term success requires both an iron-strong operational foundation and a compelling brand story. They\'re not looking for quick tricks, but a strategic partner for sustainable growth.'
        }
      ]
    }
  };

  return (
    <>
      <UnifiedSEO 
        title={isNL ? 'Over Ons | Octomatic' : 'About Us | Octomatic'}
        description={isNL 
          ? 'Wij zijn architecten van groei, geen technici. Ontdek onze reis en missie.'
          : 'We are architects of growth, not technicians. Discover our journey and mission.'}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/over-ons" : "https://www.octomatic.ai/over-ons"}
      />
      
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen relative font-archivo bg-[#0A0A0A]">
          {/* Hero Section */}
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              {/* Breadcrumb */}
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="about"
                />
              </div>

              {/* Back Button */}
              <Button 
                variant="ghost" 
                asChild
                className="mb-8 hover:bg-secondary/20 group"
              >
                <Link href={isNL ? '/nl' : '/'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Home' : 'Back to Home'}
                </Link>
              </Button>

              {/* Hero Content */}
              <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    {content.hero.headline}
                  </h1>
                  <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full mx-auto"></div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {content.hero.subline}
                  </h2>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Founder Story Section */}
          <section className="py-24 px-4 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                >
                  {content.founderStory.headline}
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                    {content.founderStory.content}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-24 px-4 bg-gray-900/30 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                >
                  {content.mission.headline}
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                    {content.mission.content}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 px-4 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12"
                >
                  {content.faq.title}
                </motion.h2>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {content.faq.items.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="border-gray-800"
                      >
                        <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <AccordionTrigger className="px-6 py-4 text-left text-white hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-gray-300">
                            {item.answer}
                          </AccordionContent>
                        </Card>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}

