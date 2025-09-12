import React, { useState } from 'react';
import { submitToIndexNow, submitBlogPostToIndexNow, IndexNowResponse } from '../../utils/indexnow';

export const IndexNowTest: React.FC = () => {
  const [url, setUrl] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [language, setLanguage] = useState<'en' | 'nl'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IndexNowResponse | null>(null);

  const handleSubmitUrl = async () => {
    if (!url) return;
    
    setIsLoading(true);
    try {
      const response = await submitToIndexNow(url);
      setResults(response);
    } catch (error) {
      console.error('IndexNow submission failed:', error);
      setResults({
        submissions: [{
          url,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }],
        totalSubmitted: 1,
        successfulSubmissions: 0,
        failedSubmissions: 1
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitBlogPost = async () => {
    if (!blogSlug) return;
    
    setIsLoading(true);
    try {
      const response = await submitBlogPostToIndexNow(blogSlug, language);
      setResults(response);
    } catch (error) {
      console.error('IndexNow blog submission failed:', error);
      setResults({
        submissions: [{
          url: blogSlug,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }],
        totalSubmitted: 1,
        successfulSubmissions: 0,
        failedSubmissions: 1
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">IndexNow API Test</h2>
      
      {/* Single URL Submission */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Submit Single URL</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.octomatic.ai/blog/your-post"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmitUrl}
            disabled={isLoading || !url}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit URL'}
          </button>
        </div>
      </div>

      {/* Blog Post Submission */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Submit Blog Post</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={blogSlug}
            onChange={(e) => setBlogSlug(e.target.value)}
            placeholder="your-blog-post-slug"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'nl')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
          </select>
          <button
            onClick={handleSubmitBlogPost}
            disabled={isLoading || !blogSlug}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit Blog Post'}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {results && (
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Results</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.totalSubmitted}</div>
              <div className="text-sm text-gray-600">Total Submitted</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.successfulSubmissions}</div>
              <div className="text-sm text-gray-600">Successful</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{results.failedSubmissions}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Detailed Results:</h4>
            {results.submissions.map((submission, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  submission.success 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    {submission.endpoint || 'Unknown Endpoint'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    submission.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {submission.success ? 'Success' : 'Failed'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  URL: {submission.url}
                </div>
                <div className="text-sm text-gray-500">
                  Time: {new Date(submission.timestamp).toLocaleString()}
                </div>
                {submission.error && (
                  <div className="text-sm text-red-600 mt-2">
                    Error: {submission.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Instructions</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• <strong>Single URL:</strong> Submit any octomatic.ai URL for immediate indexing</li>
          <li>• <strong>Blog Post:</strong> Enter just the slug (e.g., "ai-automation-guide") and it will submit the post + related pages</li>
          <li>• <strong>Language:</strong> Choose English or Dutch to submit the correct language version</li>
          <li>• <strong>Verification:</strong> The IndexNow key file is available at: <a href="https://www.octomatic.ai/1c1256719302d43509e7c5928ee3f36c186336515691667e53d36ee7c5bd7ab0.txt" target="_blank" className="text-blue-600 hover:text-blue-700">key file</a></li>
        </ul>
      </div>
    </div>
  );
}; 