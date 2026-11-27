export type ModuleType = 'system-design' | 'networking';

export type VisualizationSceneType =
  | 'reverse-proxy'
  | 'load-balancer'
  | 'database-sharding'
  | 'database-replication'
  | 'caching'
  | 'cache-eviction'
  | 'cdn'
  | 'api-gateway'
  | 'microservices'
  | 'message-queue'
  | 'consistent-hashing'
  | 'cap-theorem'
  | 'circuit-breaker'
  | 'scaling-architecture'
  | 'osi-model'
  | 'tcp-handshake'
  | 'dns-resolution'
  | 'routing-switching'
  | 'vpn-firewall'
  | 'http-https'
  | 'network-topology'
  | 'case-study';

export interface VisualizationMode {
  id: string;
  label: string;
  description?: string;
}

export interface AnimationStep {
  step: number;
  title: string;
  description: string;
  activeNodes: string[];
  packet?: {
    from: string;
    to: string;
    label: string;
    type?: 'request' | 'response' | 'sync' | 'blocked' | 'cached';
  };
}

export interface Component3DInfo {
  id: string;
  name: string;
  role: string;
  description: string;
  metrics?: { label: string; value: string }[];
  technologies?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface InterviewQuestion {
  level: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  answer: string;
  keyPoints: string[];
}

export interface TopicContent {
  id: string;
  title: string;
  module: ModuleType;
  category: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  introduction: {
    definition: string;
    analogousStory: string;
    keyTakeaway: string;
  };
  whyRequired: {
    problemsSolved: string[];
    realWorldImpact: string;
    metricsAffected: string[];
  };
  coreArchitecture: {
    description: string;
    components: {
      name: string;
      role: string;
      details: string;
    }[];
  };
  howItWorks: {
    steps: {
      stepNumber: number;
      action: string;
      technicalDetail: string;
    }[];
  };
  visualizationId: string;
  visualizationScene: VisualizationSceneType;
  visualizationModes?: VisualizationMode[];
  visualizationVariant?: string;
  visualizationType: string;
  animationSteps: AnimationStep[];
  interactiveComponents: Component3DInfo[];
  realWorldExample: {
    company: string;
    scenario: string;
    implementation: string;
    scaleDetails: string;
    isConceptual?: boolean;
  };
  advantages: string[];
  disadvantages: string[];
  relatedTopics: {
    id: string;
    title: string;
    module: ModuleType;
  }[];
  interviewQuestions: InterviewQuestion[];
  quiz: QuizQuestion[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string;
  module: ModuleType;
  topics: {
    id: string;
    title: string;
    readTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
}

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  simpleExplanation: string;
  relatedTopicId?: string;
  relatedTopicTitle?: string;
}

export interface UserProgress {
  completedTopics: string[];
  bookmarkedTopics: string[];
  recentTopics: string[];
  quizScores: Record<string, { score: number; total: number; completedAt: string }>;
  theme: 'dark' | 'light';
}
