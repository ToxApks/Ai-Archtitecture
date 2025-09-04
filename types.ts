
export interface Blueprint {
  projectName: string;
  architecture: {
    diagram: string;
    description: string;
  };
  backend: {
    language: string;
    framework: string;
    apiExample: string;
    geminiIntegration: string;
  };
  database: {
    type: string;
    schemaSuggestion: string;
  };
  frontend: {
    framework: string;
    apiCallExample: string;
  };
  security: {
    bestPractices: string[];
  };
  aiPrompt: {
    samplePrompt: string;
  };
}
