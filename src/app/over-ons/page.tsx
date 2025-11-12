'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/siteContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

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

  return (
    <div className="min-h-screen relative font-archivo bg-[#0A0A0A]">
      {/* Founder Story */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              {overOnsPage.founderStory.headline}
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="prose prose-invert max-w-none"
            >
              <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                {overOnsPage.founderStory.content}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              {overOnsPage.mission.headline}
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="prose prose-invert max-w-none"
            >
              <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                {overOnsPage.mission.content}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
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
              Veelgestelde Vragen
            </motion.h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {overOnsPage.faq.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-gray-800"
                  >
                    <Card className="bg-gray-900/50 border-gray-800">
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
  );
}

