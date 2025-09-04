
import React, { useState, useCallback } from 'react';
import { generateBlueprint } from './services/geminiService';
import type { Blueprint } from './types';
import { BlueprintDisplay } from './components/BlueprintDisplay';
import { Loader } from './components/Loader';
import { SparklesIcon, ErrorIcon } from './components/Icons';

const App: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setBlueprint(null);

    try {
      const result = await generateBlueprint(projectDescription);
      setBlueprint(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate blueprint. The model may be unavailable or the request was blocked. Please check the console for details and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [projectDescription]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const getIntroText = () => {
    return (
        <div className="text-center p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 animate-fade-in">
            <SparklesIcon className="w-16 h-16 mx-auto text-brand-primary" />
            <h2 className="mt-4 text-2xl font-bold text-brand-dark dark:text-brand-light">Welcome to the AI Full-Stack Architect</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                Describe your application idea below, and our AI will generate a comprehensive technical blueprint to kickstart your development.
            </p>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-brand-dark dark:text-brand-light font-sans">
      <header className="bg-white dark:bg-brand-dark shadow-md p-4 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 22.5H11.5C5.15 22.5 0 17.35 0 11V6C0 5.45 0.45 5 1 5C1.55 5 2 5.45 2 6V11C2 16.25 6.25 20.5 11.5 20.5H12.5C13.05 20.5 13.5 20.95 13.5 21.5C13.5 22.05 13.05 22.5 12.5 22.5ZM23 19C23.55 19 24 18.55 24 18V13C24 6.65 18.85 1.5 12.5 1.5H11.5C10.95 1.5 10.5 1.95 10.5 2.5C10.5 3.05 10.95 3.5 11.5 3.5H12.5C17.75 3.5 22 7.75 22 13V18C22 18.55 22.45 19 23 19Z M12 17.25C8.27 17.25 5.25 14.23 5.25 10.5C5.25 6.77 8.27 3.75 12 3.75C15.73 3.75 18.75 6.77 18.75 10.5C18.75 14.23 15.73 17.25 12 17.25ZM12 5.75C9.38 5.75 7.25 7.88 7.25 10.5C7.25 13.12 9.38 15.25 12 15.25C14.62 15.25 16.75 13.12 16.75 10.5C16.75 7.88 14.62 5.75 12 5.75Z"/></svg>
            AI Full-Stack Architect
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white dark:bg-brand-dark shadow-xl rounded-lg p-6 w-full max-w-4xl mx-auto">
          <p className="text-lg font-semibold mb-2">Project Idea</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Describe your application in a few sentences. What does it do? Who is it for? What are the key features?</p>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-brand-light dark:bg-gray-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none"
            placeholder="e.g., A social media app for pet owners to share photos and tips, with a feature to identify pet breeds from images."
          />
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Press <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl+Enter</kbd> to generate.</p>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !projectDescription.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-primary rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Generating...' : 'Generate Blueprint'}
              <SparklesIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
            {isLoading && <Loader />}
            {error && (
                <div className="flex items-center gap-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-300 border border-red-400 rounded-lg animate-fade-in">
                    <ErrorIcon className="w-6 h-6"/>
                    <p>{error}</p>
                </div>
            )}
            {!isLoading && !blueprint && !error && getIntroText()}
            {blueprint && <BlueprintDisplay blueprint={blueprint} />}
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
