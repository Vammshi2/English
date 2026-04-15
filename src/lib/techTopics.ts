import { TechTopic, TechCategory } from './types';

export const techCategories: { id: TechCategory; name: string; icon: string }[] = [
  { id: 'languages', name: 'Languages', icon: '💻' },
  { id: 'frameworks', name: 'Frameworks', icon: '🏗️' },
  { id: 'databases', name: 'Databases', icon: '🗄️' },
  { id: 'devops', name: 'DevOps', icon: '⚙️' },
  { id: 'concepts', name: 'Concepts', icon: '🧠' },
];

export const techTopics: TechTopic[] = [
  {
    id: 'csharp',
    name: 'C#',
    icon: '🟪',
    category: 'languages',
    subTopics: [
      'Variables & Data Types', 'Operators', 'Control Flow (if/else/switch)',
      'Loops (for/while/foreach)', 'Methods & Functions', 'Classes & Objects',
      'Inheritance & Polymorphism', 'Interfaces', 'Collections (List, Dictionary)',
      'LINQ', 'Async/Await', 'Exception Handling', 'Delegates & Events',
      'Generics', 'File I/O',
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '🔵',
    category: 'languages',
    subTopics: [
      'Variables & Data Types', 'Pointers & References', 'Control Flow',
      'Functions', 'Arrays & Strings', 'Classes & Objects', 'Inheritance',
      'Polymorphism', 'Templates', 'STL Containers', 'Memory Management',
      'File I/O', 'Operator Overloading', 'Exception Handling',
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    category: 'languages',
    subTopics: [
      'Variables (let/const/var)', 'Data Types', 'Functions & Arrow Functions',
      'Arrays & Array Methods', 'Objects', 'DOM Manipulation', 'Events',
      'Promises & Async/Await', 'Fetch API', 'ES6+ Features',
      'Closures', 'Prototypes', 'Modules', 'Error Handling',
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🟦',
    category: 'languages',
    subTopics: [
      'Types & Type Annotations', 'Interfaces', 'Enums', 'Generics',
      'Union & Intersection Types', 'Type Guards', 'Utility Types',
      'Classes', 'Modules', 'Declaration Files', 'Decorators',
    ],
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    category: 'languages',
    subTopics: [
      'Variables & Data Types', 'Control Flow', 'Functions',
      'Lists & Tuples', 'Dictionaries & Sets', 'String Methods',
      'File Handling', 'Classes & OOP', 'Modules & Packages',
      'List Comprehensions', 'Exception Handling', 'Decorators',
      'Lambda Functions', 'Virtual Environments',
    ],
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    category: 'languages',
    subTopics: [
      'Variables & Data Types', 'Control Flow', 'Methods',
      'Classes & Objects', 'Inheritance', 'Interfaces',
      'Collections Framework', 'Exception Handling', 'Generics',
      'Streams API', 'Multithreading', 'File I/O',
    ],
  },
  {
    id: 'dotnet',
    name: '.NET',
    icon: '🟣',
    category: 'frameworks',
    subTopics: [
      'MVC Architecture', 'Entity Framework', 'Dependency Injection',
      'Middleware', 'Web API Controllers', 'Razor Pages',
      'Authentication & Authorization', 'Configuration',
      'Logging', 'Unit Testing', 'SignalR',
    ],
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: '🅰️',
    category: 'frameworks',
    subTopics: [
      'Components', 'Templates & Data Binding', 'Directives',
      'Services & Dependency Injection', 'Routing', 'Forms (Template & Reactive)',
      'HTTP Client', 'Pipes', 'Modules', 'RxJS Observables',
      'Guards', 'Interceptors', 'Lifecycle Hooks',
    ],
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    category: 'frameworks',
    subTopics: [
      'JSX', 'Components (Function & Class)', 'Props & State',
      'Hooks (useState, useEffect, etc.)', 'Context API',
      'React Router', 'Forms & Controlled Components',
      'Lifecycle Methods', 'Custom Hooks', 'Performance Optimization',
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    category: 'frameworks',
    subTopics: [
      'Modules & require/import', 'File System (fs)', 'HTTP Server',
      'Express.js Basics', 'Middleware', 'REST API Building',
      'Environment Variables', 'NPM & Package Management',
      'Streams', 'Error Handling', 'Authentication (JWT)',
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '📊',
    category: 'databases',
    subTopics: [
      'SELECT & WHERE', 'INSERT, UPDATE, DELETE', 'JOINs (INNER, LEFT, RIGHT)',
      'GROUP BY & HAVING', 'ORDER BY & LIMIT', 'Subqueries',
      'Indexes', 'Stored Procedures', 'Transactions',
      'Normalization', 'Views', 'Triggers',
    ],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    category: 'databases',
    subTopics: [
      'Data Types', 'Schemas', 'Advanced Queries',
      'JSON/JSONB', 'Full-Text Search', 'Window Functions',
      'CTEs', 'Partitioning', 'Roles & Permissions',
    ],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    category: 'databases',
    subTopics: [
      'Documents & Collections', 'CRUD Operations', 'Query Operators',
      'Aggregation Pipeline', 'Indexes', 'Schema Validation',
      'Mongoose ODM', 'Relationships', 'Atlas Cloud',
    ],
  },
  {
    id: 'git',
    name: 'Git',
    icon: '🔀',
    category: 'devops',
    subTopics: [
      'Init & Clone', 'Add, Commit, Push', 'Branching & Merging',
      'Pull Requests', 'Conflict Resolution', 'Stash',
      'Rebase', 'Tags', 'Git Flow', '.gitignore',
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    category: 'devops',
    subTopics: [
      'Images & Containers', 'Dockerfile', 'Docker Compose',
      'Volumes', 'Networking', 'Docker Hub',
      'Multi-stage Builds', 'Environment Variables',
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: '🔄',
    category: 'devops',
    subTopics: [
      'What is CI/CD', 'GitHub Actions', 'Jenkins Basics',
      'Build Pipelines', 'Automated Testing', 'Deployment Strategies',
      'Environment Management',
    ],
  },
  {
    id: 'oop',
    name: 'OOP',
    icon: '🏛️',
    category: 'concepts',
    subTopics: [
      'Classes & Objects', 'Encapsulation', 'Inheritance',
      'Polymorphism', 'Abstraction', 'SOLID Principles',
      'Composition vs Inheritance',
    ],
  },
  {
    id: 'datastructures',
    name: 'Data Structures',
    icon: '📐',
    category: 'concepts',
    subTopics: [
      'Arrays', 'Linked Lists', 'Stacks & Queues',
      'Hash Tables', 'Trees (Binary, BST)', 'Graphs',
      'Sorting Algorithms', 'Searching Algorithms',
      'Big O Notation', 'Recursion',
    ],
  },
  {
    id: 'designpatterns',
    name: 'Design Patterns',
    icon: '🧩',
    category: 'concepts',
    subTopics: [
      'Singleton', 'Factory', 'Observer',
      'Strategy', 'Decorator', 'MVC/MVVM',
      'Repository Pattern', 'Dependency Injection',
    ],
  },
  {
    id: 'restapi',
    name: 'REST APIs',
    icon: '🌐',
    category: 'concepts',
    subTopics: [
      'What is REST', 'HTTP Methods', 'Status Codes',
      'Request/Response', 'Authentication (API Keys, JWT)',
      'Versioning', 'Error Handling', 'Rate Limiting',
      'Documentation (Swagger/OpenAPI)',
    ],
  },
];

export function getTopicsByCategory(category: TechCategory): TechTopic[] {
  return techTopics.filter((t) => t.category === category);
}

export function getTopicById(id: string): TechTopic | undefined {
  return techTopics.find((t) => t.id === id);
}
