export const projectWindowId = (projectId) => `project-${projectId}`

export const projects = [
  {
    id: 'sari-sari-pos',
    name: 'Sari-Sari Store POS',
    tagline: 'Point-of-sale and inventory app built around an append-only audit ledger.',
    repoUrl: 'https://github.com/backendbyMel/Sari-sari-pos',
    demoUrl: null,
    status: 'Runs locally. Not deployed yet.',
    problem:
      'Sari-sari stores need a reliable point-of-sale and inventory app to record transactions, monitor stock levels, and track cash movement without accounting errors.',
    users: 'Sari-sari store owners and cashiers.',
    features: [
      'Role-based API security: endpoints are locked to store owners by default, and cashiers get access only where a route is explicitly allowed (CASHIER_OK).',
      'Append-only recording of sales, restocks, stock adjustments, payments, GCash, loads and payouts. Entries are never edited or deleted, and corrections need an owner-approved record.',
      'A custom management command, check_integrity, that checks stock levels, sales, receipts and shift cash balance against each other.',
      'A Django REST API backend with a React (Vite) frontend, containerized with Docker and set up with CI/CD.',
    ],
    stack: [
      'Python',
      'Django',
      'Django REST Framework',
      'React (Vite)',
      'PostgreSQL / SQLite',
      'Docker',
      'CI/CD',
    ],
    challenge: {
      problem:
        'Preventing unauthorized route access and financial data tampering when the app has more than one user role.',
      approach:
        'I designed an append-only transaction ledger and a default-locked route security model, then verified both with automated tests and the custom integrity check.',
    },
    learned: [
      'Designing for financial ledger integrity.',
      'Testing Django REST Framework permissions in detail.',
      'Writing custom Django management commands.',
      'Developing a full-stack app in containers.',
    ],
    improve: [
      'Finish a production deployment with PostgreSQL and HTTPS.',
      'Run with DJANGO_DEBUG=0 and manage secrets securely.',
      'Automate database backups.',
    ],
    screenshots: [],
//     screenshots: [
//   { src: '/screenshots/pos-checkout.png', alt: 'Point-of-sale screen with a sample cart of three items', caption: 'Checkout screen (sample data)' },
// ],
  },
  {
    id: 'discipline-tracking-system',
    name: 'Discipline Tracking System',
    tagline: 'Centralized student discipline records for school staff.',
    repoUrl: 'https://github.com/backendbyMel/DisciplineTrackingSystem',
    demoUrl: null,
    status: 'Live application coming soon.',
    problem:
      'Schools often face delayed incident reporting and inconsistent data because of manual paper processes or scattered spreadsheets. This system brings student discipline logging, account administration and documentation into one web application.',
    users: 'School administrators and educational staff.',
    features: [
      'Discipline management module: logging, tracking and history of student disciplinary incidents.',
      'User and role administration: accounts, authentication and role-based permissions.',
      'Media management: storage for uploaded documents and supporting evidence.',
      'Desktop packaging: the Django runtime, dependencies, templates and SQLite database bundled into standalone desktop executables with PyInstaller.',
    ],
    stack: ['Python', 'Django', 'SQLite', 'PyInstaller'],
    challenge: {
      problem:
        'Bundling a full Django web application into a standalone desktop program that runs without Python installed on the computer.',
      approach:
        'I wrote a custom PyInstaller specification (lumbiaNHS.spec) that handles hidden framework dependencies, static file paths and the relative SQLite database references.',
    },
    learned: [
      'Packaging a framework into a standalone executable.',
      'Resolving file paths across desktop and web setups.',
      'Structuring a Django project into focused modules.',
    ],
    improve: [
      'Move from SQLite to PostgreSQL for multi-school cloud hosting.',
      'Add GitHub Actions to build the executables automatically.',
      'Move settings into .env files.',
      'Increase automated test coverage.',
    ],
    screenshots: [],
  },
]