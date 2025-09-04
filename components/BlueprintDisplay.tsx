
import React from 'react';
import type { Blueprint } from '../types';
import { CodeBlock } from './CodeBlock';
import { BlueprintSection } from './BlueprintSection';
import { CheckCircleIcon } from './Icons';

interface BlueprintDisplayProps {
  blueprint: Blueprint;
}

export const BlueprintDisplay: React.FC<BlueprintDisplayProps> = ({ blueprint }) => {

  const tryFormatJson = (jsonString: string) => {
    try {
      const obj = JSON.parse(jsonString);
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return jsonString; // Return original string if it's not valid JSON
    }
  };


  return (
    <div className="space-y-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-center text-brand-dark dark:text-brand-light">
        Project Blueprint: <span className="text-brand-primary">{blueprint.projectName}</span>
      </h2>

      <BlueprintSection title="High-Level Architecture">
        <p className="mb-4 text-gray-600 dark:text-gray-300">{blueprint.architecture.description}</p>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center overflow-x-auto">
           <pre className="text-sm font-mono whitespace-pre-wrap">{blueprint.architecture.diagram}</pre>
           <p className="mt-2 text-xs text-gray-500">You can render this diagram using a Mermaid.js viewer.</p>
        </div>
      </BlueprintSection>

      <BlueprintSection title="Backend (Node.js + Express)">
        <div className="space-y-6">
          <CodeBlock 
            code={blueprint.backend.apiExample}
            language="javascript"
            title="Example REST API Endpoint"
          />
          <CodeBlock
            code={blueprint.backend.geminiIntegration}
            language="javascript"
            title="Gemini API Integration"
          />
        </div>
      </BlueprintSection>

      <BlueprintSection title="Database (Firestore)">
         <CodeBlock
            code={tryFormatJson(blueprint.database.schemaSuggestion)}
            language="json"
            title="Suggested Firestore Schema"
          />
      </BlueprintSection>
      
      <BlueprintSection title="Frontend (React + TypeScript)">
          <CodeBlock
            code={blueprint.frontend.apiCallExample}
            language="typescript"
            title="Example API Call from Frontend"
          />
      </BlueprintSection>

      <BlueprintSection title="Security Best Practices">
        <ul className="space-y-3">
          {blueprint.security.bestPractices.map((practice, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </BlueprintSection>
      
      <BlueprintSection title="Sample AI Prompt for Gemini">
        <div className="p-4 border-l-4 border-brand-primary bg-brand-secondary dark:bg-blue-900/30 rounded-r-lg">
            <p className="italic text-gray-800 dark:text-gray-200">{blueprint.aiPrompt.samplePrompt}</p>
        </div>
      </BlueprintSection>

    </div>
  );
};
