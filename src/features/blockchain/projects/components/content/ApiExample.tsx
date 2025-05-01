import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { motion } from 'framer-motion';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface ApiExampleProps {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  request?: {
    headers?: Record<string, string>;
    body?: any;
  };
  response?: {
    status: number;
    body: any;
  };
  className?: string;
}

export const ApiExample: React.FC<ApiExampleProps> = ({
  endpoint,
  method,
  request,
  response,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-blue-500 dark:bg-blue-400',
      POST: 'bg-green-500 dark:bg-green-400',
      PUT: 'bg-yellow-500 dark:bg-yellow-400',
      DELETE: 'bg-red-500 dark:bg-red-400',
    };
    return colors[method as keyof typeof colors] || 'bg-gray-500 dark:bg-gray-400';
  };

  const formatJson = (data: any) => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <div className={`my-8 border border-hub-border-light dark:border-hub-border-dark rounded-lg overflow-hidden ${className}`}>
      <div className="bg-hub-hover-light dark:bg-hub-hover-dark p-4 flex items-center">
        <span
          className={`${getMethodColor(
            method
          )} text-white px-4 py-2 rounded-md ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-dsemi mr-4`}
        >
          {method}
        </span>
        <code className={`text-hub-text-primary-light dark:text-hub-text-primary-dark font-mono ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}>
          {endpoint}
        </code>
      </div>

      <div className="border-t border-hub-border-light dark:border-hub-border-dark">
        <div className="flex border-b border-hub-border-light dark:border-hub-border-dark">
          <motion.button
            className={`px-6 py-3 ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-dsemi ${
              activeTab === 'request'
                ? 'text-hub-primary-light dark:text-hub-primary-dark border-b-2 border-hub-primary-light dark:border-hub-primary-dark'
                : 'text-hub-text-secondary-light dark:text-hub-text-secondary-dark hover:text-hub-text-primary-light dark:hover:text-hub-text-primary-dark'
            }`}
            onClick={() => setActiveTab('request')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Request
          </motion.button>
          <motion.button
            className={`px-6 py-3 ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-dsemi ${
              activeTab === 'response'
                ? 'text-hub-primary-light dark:text-hub-primary-dark border-b-2 border-hub-primary-light dark:border-hub-primary-dark'
                : 'text-hub-text-secondary-light dark:text-hub-text-secondary-dark hover:text-hub-text-primary-light dark:hover:text-hub-text-primary-dark'
            }`}
            onClick={() => setActiveTab('response')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Response
          </motion.button>
        </div>

        <div className="p-6">
          {activeTab === 'request' && request && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {request.headers && (
                <div className="mb-6">
                  <h4 className={`${mobileOnly.text.lg} ${desktopOnly.text.xl} font-dsemi text-hub-text-secondary-light dark:text-hub-text-secondary-dark mb-4`}>
                    Headers
                  </h4>
                  <CodeBlock
                    code={formatJson(request.headers)}
                    language="json"
                  />
                </div>
              )}
              {request.body && (
                <div>
                  <h4 className={`${mobileOnly.text.lg} ${desktopOnly.text.xl} font-dsemi text-hub-text-secondary-light dark:text-hub-text-secondary-dark mb-4`}>
                    Body
                  </h4>
                  <CodeBlock
                    code={formatJson(request.body)}
                    language="json"
                  />
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'response' && response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h4 className={`${mobileOnly.text.lg} ${desktopOnly.text.xl} font-dsemi text-hub-text-secondary-light dark:text-hub-text-secondary-dark mb-4`}>
                  Status: {response.status}
                </h4>
              </div>
              <CodeBlock
                code={formatJson(response.body)}
                language="json"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}; 