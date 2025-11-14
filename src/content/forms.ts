/**
 * Forms Content - Unified bilingual structure
 * Content for contact forms and other form elements
 */

import { ContentStructure } from './types';

export interface FormsContent {
  contact: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      company: string;
      message: string;
    };
    submit: string;
    submitting: string;
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
    responseTime: string;
  };
}

export const formsContent: ContentStructure<FormsContent> = {
  en: {
    contact: {
      title: 'Get in touch',
      subtitle: "Let's discuss your automation needs",
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
      },
      submit: 'Send message',
      submitting: 'Sending...',
      success: {
        title: 'Message sent!',
        description: "We'll get back to you within 24 hours.",
      },
      error: {
        title: 'Error sending message',
        description: 'Please try again or contact us directly.',
      },
      responseTime: 'We typically respond within 24 hours',
    },
  },
  nl: {
    contact: {
      title: 'Neem contact op',
      subtitle: 'Laten we uw automatiseringsbehoeften bespreken',
      fields: {
        name: 'Naam',
        email: 'E-mail',
        company: 'Bedrijf',
        message: 'Bericht',
      },
      submit: 'Verstuur bericht',
      submitting: 'Versturen...',
      success: {
        title: 'Bericht verzonden!',
        description: 'We nemen binnen 24 uur contact met u op.',
      },
      error: {
        title: 'Fout bij verzenden bericht',
        description: 'Probeer het opnieuw of neem direct contact met ons op.',
      },
      responseTime: 'We reageren meestal binnen 24 uur',
    },
  },
};



