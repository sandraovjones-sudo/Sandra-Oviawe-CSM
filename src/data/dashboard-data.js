export const lifecycleStages = [
  {
    id: 'kickoff',
    name: 'Kickoff & Onboarding',
    icon: '🚀',
    color: '#10b981',
    kpis: [
      { 
        metric: 'Time to Value', 
        value: '28 days', 
        change: '-35%',
        definition: 'Average days from contract signature to first measurable business outcome'
      },
      { 
        metric: 'Setup Completion', 
        value: '94%', 
        change: '+12%',
        definition: 'Percentage of accounts completing technical onboarding within 30 days'
      }
    ],
    playbooks: [
      {
        id: 'partnership-kickoff',
        name: 'New Customer Partnership Kickoff',
        trigger: 'Within 48 hours of contract signature',
        actions: [
          'Schedule 60-min kickoff with exec sponsor + project lead',
          'Share success plan template with pre-filled milestones',
          'Assign CSM + technical account manager',
          'Set 30/60/90-day checkpoint calendar invites'
        ],
        outcome: {
          before: 'Avg. 45 days to first value',
          after: '28 days to first value',
          impact: '35% reduction in TTV'
        }
      },
      {
        id: 'account-transition',
        name: 'Account Transition',
        trigger: 'Post-sale handoff from AE to CSM',
        actions: [
          'Review sales notes + use case validation',
          'Identify "champion" vs. "economic buyer"',
          'Map org chart + stakeholder influence',
          'Inherit CRM data into CS platform'
        ],
        outcome: {
          before: '22% of context lost in handoff',
          after: '4% context loss',
          impact: 'Reduced re-discovery time by 3 weeks'
        }
      },
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding',
        trigger: 'Post-kickoff, technical setup phase',
        actions: [
          'Guided product walkthrough tailored to use case',
          'Integration setup with IT team',
          'Security & compliance review (for regulated accounts)',
          'Train-the-trainer session for power users'
        ],
        outcome: {
          before: '30 days avg. time-to-value',
          after: '20 days avg. time-to-value',
          impact: '33% faster onboarding completion'
        }
      }
    ]
  },
  {
    id: 'adoption',
    name: 'Adoption & Engagement',
    icon: '📈',
    color: '#3b82f6',
    kpis: [
      { 
        metric: 'Feature Adoption', 
        value: '89%', 
        change: '+37%',
        definition: 'Accounts using 3+ core features weekly'
      },
      { 
        metric: 'Active Users', 
        value: '847', 
        change: '+24%',
        definition: 'Monthly active users across portfolio'
      }
    ],
    playbooks: [
      {
        id: 'customer-objectives-review',
        name: 'Customer Objectives Review (COR)',
        trigger: '60 days post-kickoff, then quarterly',
        actions: [
          'Review original success criteria from kickoff',
          'Map product usage to business outcomes achieved',
          'Identify gaps between current state and goals',
          'Co-create 90-day action plan'
        ],
        outcome: {
          before: '52% feature adoption without COR',
          after: '89% feature adoption with COR',
          impact: 'Accounts completing COR showed 71% higher engagement'
        }
      },
      {
        id: 'executive-sponsor',
        name: 'Executive Sponsor Engagement',
        trigger: '30 days post-kickoff, then quarterly',
        actions: [
          'Map C-suite org chart within 30 days',
          'Create exec-level "business outcome brief" (not product demo)',
          'Tie product usage to their KPIs (e.g., "saved 340 analyst hours")',
          'Schedule quarterly strategic reviews'
        ],
        outcome: {
          before: '22% churn in accounts without exec engagement',
          after: '8% churn with exec engagement',
          impact: '3.2x higher expansion rate'
        }
      },
      {
        id: 'product-release',
        name: 'Product Release Playbook',
        trigger: 'Major feature launch or quarterly updates',
        actions: [
          'Segment customers by relevance (who benefits most)',
          'Create "What\'s New" brief with use case examples',
          'Host webinar for early adopters',
          'Track adoption in first 30 days'
        ],
        outcome: {
          before: '18% adoption of new features',
          after: '47% adoption rate',
          impact: 'Proactive release communication drives 2.6x adoption'
        }
      }
    ]
  },
  {
    id: 'renewal',
    name: 'Renewal & Growth',
    icon: '🎯',
    color: '#f59e0b',
    kpis: [
      { 
        metric: 'GRR', 
        value: '97%', 
        change: '+5%',
        definition: 'Gross Revenue Retention (renewals only, no expansion)'
      },
      { 
        metric: 'NRR', 
        value: '117%', 
        change: '+12%',
        definition: 'Net Revenue Retention (renewals + expansion - churn)'
      }
    ],
    playbooks: [
      {
        id: 'budget-planning',
        name: 'Budget Planning',
        trigger: '150 days before renewal (FY planning season)',
        actions: [
          'Share ROI summary for budget justification',
          'Identify expansion opportunities (new users, features)',
          'Align renewal timing with customer\'s fiscal calendar',
          'Provide renewal quote 120 days out'
        ],
        outcome: {
          before: '45% of renewals delayed due to budget cycles',
          after: '12% delayed renewals',
          impact: 'Proactive budget alignment reduced renewal friction by 73%'
        }
      },
      {
        id: 'renewal-management',
        name: 'Renewal Management',
        trigger: '120 days before renewal date',
        actions: [
          'Run pre-mortem: "What would cause us to lose this account?"',
          'Build renewal brief: usage trends, ROI achieved, expansion opportunities',
          'Engage procurement 90 days out',
          'Executive sponsor check-in at 60 days'
        ],
        outcome: {
          before: 'GRR: 92%',
          after: 'GRR: 97%',
          impact: 'Saved £410K ARR through proactive risk mitigation'
        }
      },
      {
        id: 'new-contact-engagement',
        name: 'New Contact Engagement',
        trigger: 'When new stakeholder joins account',
        actions: [
          'Welcome email with "getting started" resources',
          '1:1 intro call to understand their role & goals',
          'Refresh permissions and training needs',
          'Update stakeholder map in CRM'
        ],
        outcome: {
          before: '28% of new contacts never activated',
          after: '89% activation within 14 days',
          impact: 'Reduced "dark zones" where key users weren\'t engaged'
        }
      }
    ]
  },
  {
    id: 'churn',
    name: 'Churn & Offboarding',
    icon: '⚠️',
    color: '#ef4444',
    kpis: [
      { 
        metric: 'Churn Rate', 
        value: '8%', 
        change: '-14%',
        definition: 'Annual logo churn rate'
      },
      { 
        metric: 'Win-Back Rate', 
        value: '40%', 
        change: '+40%',
        definition: 'Churned customers who re-engaged within 12 months'
      }
    ],
    playbooks: [
      {
        id: 'churn-interview',
        name: 'Churn Customer Interview',
        trigger: 'When churn is confirmed (not a save attempt)',
        actions: [
          'Request 30-min exit interview (frame as learning, not sales)',
          'Ask: "What could we have done differently?"',
          'Capture verbatim feedback in CRM',
          'Feed insights to Product & Exec team monthly',
          'Leave door open: "We\'d love to work together again"'
        ],
        outcome: {
          before: 'No structured churn feedback loop',
          after: '18 product improvements from churn interviews',
          impact: '40% of churned logos re-engaged within 12 months'
        }
      },
      {
        id: 'churn-offboarding',
        name: 'Churn Customer Offboarding',
        trigger: 'Post-churn decision',
        actions: [
          'Provide data export assistance',
          'Document handoff requirements',
          'Close account gracefully (no burning bridges)',
          'Add to "win-back nurture" campaign (6-month check-in)'
        ],
        outcome: {
          before: 'Burned bridges with 60% of churned accounts',
          after: 'Maintained relationships, enabled 40% re-engagement',
          impact: 'Professional offboarding preserved long-term opportunities'
        }
      }
    ]
  }
];

export const performanceData = [
  { month: 'Jan', grr: 92, nrr: 105, arr: 6.8 },
  { month: 'Feb', grr: 93, nrr: 108, arr: 7.1 },
  { month: 'Mar', grr: 94, nrr: 111, arr: 7.4 },
  { month: 'Apr', grr: 95, nrr: 113, arr: 7.7 },
  { month: 'May', grr: 96, nrr: 115, arr: 7.9 },
  { month: 'Jun', grr: 97, nrr: 117, arr: 8.2 }
];

export const playbookImpact = [
  { playbook: 'Exec Sponsor', expansion: 3.2, accounts: 24 },
  { playbook: 'COR', expansion: 2.1, accounts: 40 },
  { playbook: 'Renewal Pre-mortem', expansion: 1.8, accounts: 38 },
  { playbook: 'Product Release', expansion: 1.4, accounts: 35 },
  { playbook: 'Marketing Engagement', expansion: 1.1, accounts: 28 }
];

export const churnSignals = {
  caught: [
    { signal: 'Login decline >30 days', count: 12, saved: 9 },
    { signal: 'Exec sponsor change', count: 8, saved: 6 },
    { signal: 'Support ticket spike', count: 6, saved: 5 },
    { signal: 'License downgrades', count: 4, saved: 3 }
  ],
  missed: [
    { signal: 'Budget reallocation', count: 3 },
    { signal: 'Merger/acquisition', count: 2 },
    { signal: 'Champion departure', count: 2 }
  ]
};

export const segmentData = {
  enterprise: {
    accounts: 12,
    arr: 6.5,
    grr: 98,
    nrr: 125,
    ttv: 25,
    adoption: 92
  },
  smb: {
    accounts: 28,
    arr: 1.7,
    grr: 95,
    nrr: 108,
    ttv: 35,
    adoption: 84
  }
};
