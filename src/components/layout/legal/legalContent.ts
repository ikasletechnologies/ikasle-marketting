export interface LegalSection {
  id: string;
  title: string;
  body?: string[];
  list?: string[];
}

export interface LegalDocument {
  overline: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const PRIVACY: LegalDocument = {
  overline: 'LEGAL',
  title: 'Privacy Policy',
  intro:
    'How IKASLĒ Marketing collects, uses and protects your information when you visit our website or work with us.',
  updated: 'October 2026',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      body: [
        'IKASLĒ Marketing respects your privacy. This policy explains what information we collect, why we collect it, and the choices you have.',
        'By using our website or contacting us, you agree to the practices described here.',
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      body: ['We only collect information that helps us respond to you and improve our work.'],
      list: [
        'Details you give us, such as your name, email address, phone number and message when you use our contact form.',
        'Project information you share when you ask about our services.',
        'Technical data such as browser type, device, pages visited and approximate location, collected through standard analytics tools.',
      ],
    },
    {
      id: 'how-we-use-it',
      title: 'How we use your information',
      list: [
        'To reply to your enquiries and provide the services you request.',
        'To plan, deliver and improve our marketing work and our website.',
        'To send updates you have asked for. You can opt out at any time.',
        'To meet legal and security obligations.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and analytics',
      body: [
        'We may use cookies and similar technologies to understand how visitors use our site and to keep it working properly.',
        'You can control or delete cookies through your browser settings. Disabling some cookies may affect how parts of the site work.',
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing your information',
      body: [
        'We do not sell your personal information. We share it only with trusted service providers who help us run our business, such as hosting, analytics and email tools, and only as needed to do their job.',
        'We may also disclose information when required by law or to protect our rights.',
      ],
    },
    {
      id: 'retention-security',
      title: 'Retention and security',
      body: [
        'We keep your information only as long as needed for the purposes above or as the law requires.',
        'We use reasonable technical and organisational measures to protect it. No online service can be completely secure, so we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: [
        'Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, or to object to certain processing.',
        'To make a request, please use the Contact page and tell us what you would like us to do.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The date at the top shows when it was last changed. Continued use of the site means you accept the updated policy.',
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  overline: 'LEGAL',
  title: 'Terms & Conditions',
  intro: 'The terms that apply when you use the IKASLĒ Marketing website and our services.',
  updated: 'October 2026',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of terms',
      body: [
        'By accessing this website or engaging IKASLĒ Marketing, you agree to these terms. If you do not agree, please do not use the site.',
      ],
    },
    {
      id: 'services',
      title: 'Our services',
      body: [
        'We provide digital marketing services including strategy, social media, SEO and branding. The exact scope, timelines and fees for each project are agreed in writing before work begins.',
      ],
    },
    {
      id: 'client-responsibilities',
      title: 'Client responsibilities',
      list: [
        'Provide accurate information, assets and approvals on time.',
        'Make sure you have the right to use any content, logos or materials you give us.',
        'Review deliverables promptly and give clear feedback.',
      ],
    },
    {
      id: 'payments',
      title: 'Fees and payment',
      body: [
        'Fees and payment schedules are set out in each proposal or agreement. Unless agreed otherwise, invoices are due by the date shown on the invoice.',
        'Marketing results depend on many factors outside our control, so we cannot guarantee specific rankings, traffic or sales outcomes.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      body: [
        'Unless an agreement says otherwise, final approved deliverables become yours once payment is complete. We keep ownership of our tools, methods, templates and any pre-existing materials.',
        'The content on this website, including text, graphics and logos, belongs to IKASLĒ Marketing and may not be copied or reused without permission.',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      body: ['You agree not to misuse the site, including by attempting to disrupt it, gain unauthorised access, or use it for unlawful purposes.'],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      body: [
        'To the fullest extent permitted by law, IKASLĒ Marketing is not liable for indirect or consequential losses arising from your use of the site or our services.',
        'The website and its content are provided "as is" without warranties of any kind.',
      ],
    },
    {
      id: 'termination',
      title: 'Termination',
      body: [
        'Either party may end an engagement as set out in the project agreement. Fees for work already completed remain payable.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: [
        'We may update these terms from time to time. The date at the top shows the latest version. Continued use of the site means you accept the changes.',
      ],
    },
    {
      id: 'contact',
      title: 'Questions',
      body: ['If you have any questions about these terms, please reach out through the Contact page.'],
    },
  ],
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'Working with us',
    items: [
      {
        question: 'What does IKASLĒ Marketing do?',
        answer:
          'We help brands grow through digital strategy, social media marketing, SEO and search growth, and brand and creative work. Every project starts with understanding your business goals.',
      },
      {
        question: 'How do we get started?',
        answer:
          'Use the Contact page to tell us about your business and what you want to achieve. We will get back to you to discuss your goals and suggest the best next step.',
      },
      {
        question: 'Do you work with small businesses?',
        answer:
          'Yes. We work with brands at different stages, from new businesses building their presence to established companies ready to grow further.',
      },
    ],
  },
  {
    title: 'Services & results',
    items: [
      {
        question: 'Which services can I choose from?',
        answer:
          'Digital Marketing, Social Media Marketing, SEO & Search Growth, and Brand Growth & Creative. You can pick one or combine them into a single plan.',
      },
      {
        question: 'How long before I see results?',
        answer:
          'It depends on the channel and your starting point. Social and paid work can show movement within weeks, while SEO usually takes a few months to build. We set clear expectations at the start.',
      },
      {
        question: 'Can you guarantee rankings or sales?',
        answer:
          'No honest agency can. We focus on proven methods, clear reporting and steady improvement, and we are open about what is working and what is not.',
      },
    ],
  },
  {
    title: 'Process & support',
    items: [
      {
        question: 'What does your process look like?',
        answer:
          'We follow four steps: Discover, Plan, Create and Refine. We learn your goals, build the direction, bring the ideas to life, then review and improve.',
      },
      {
        question: 'Will I be kept updated on progress?',
        answer:
          'Yes. We share regular updates and reviews so you always know what has been done and what comes next.',
      },
      {
        question: 'How is my information handled?',
        answer:
          'We only use your information to deliver our services and respond to you. See our Privacy Policy for the full details.',
      },
    ],
  },
];
