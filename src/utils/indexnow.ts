// IndexNow API Configuration
const INDEXNOW_KEY = '1c1256719302d43509e7c5928ee3f36c186336515691667e53d36ee7c5bd7ab0';
const BASE_URL = 'https://www.octomatic.ai';

// IndexNow API endpoints
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow', // Microsoft Bing
  'https://www.google.com/indexnow', // Google (if supported)
  'https://yandex.com/indexnow', // Yandex
  'https://search.seznam.cz/indexnow', // Seznam.cz
] as const;

export interface IndexNowSubmission {
  url: string;
  success: boolean;
  endpoint?: string;
  error?: string;
  timestamp: string;
}

export interface IndexNowResponse {
  submissions: IndexNowSubmission[];
  totalSubmitted: number;
  successfulSubmissions: number;
  failedSubmissions: number;
}

/**
 * Submit a single URL to IndexNow API for immediate indexing
 * @param url - The URL to submit for indexing
 * @param searchEngine - Optional specific search engine endpoint
 * @returns Promise with submission results
 */
export async function submitToIndexNow(
  url: string, 
  searchEngine?: string
): Promise<IndexNowResponse> {
  const submissions: IndexNowSubmission[] = [];
  const timestamp = new Date().toISOString();
  
  // Validate URL
  if (!isValidUrl(url)) {
    throw new Error(`Invalid URL provided: ${url}`);
  }

  // Ensure URL is from our domain
  const urlObj = new URL(url);
  if (!urlObj.hostname.includes('octomatic.ai')) {
    throw new Error(`URL must be from octomatic.ai domain: ${url}`);
  }

  const endpoints = searchEngine ? [searchEngine] : INDEXNOW_ENDPOINTS;
  
  // Submit to each endpoint
  const submissionPromises = endpoints.map(async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Octomatic-IndexNow-Client/1.0'
        },
        body: JSON.stringify({
          host: 'www.octomatic.ai',
          key: INDEXNOW_KEY,
          keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: [url]
        })
      });

      const submission: IndexNowSubmission = {
        url,
        endpoint,
        timestamp,
        success: response.ok,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
      };

      // Log response for debugging
      if (!response.ok) {
        console.warn(`IndexNow submission failed for ${endpoint}:`, submission.error);
      } else {
        console.log(`IndexNow submission successful for ${endpoint}: ${url}`);
      }

      return submission;
    } catch (error) {
      const submission: IndexNowSubmission = {
        url,
        endpoint,
        timestamp,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      
      console.error(`IndexNow submission error for ${endpoint}:`, error);
      return submission;
    }
  });

  const results = await Promise.allSettled(submissionPromises);
  
  // Process results
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      submissions.push(result.value);
    } else {
      submissions.push({
        url,
        timestamp,
        success: false,
        error: result.reason?.message || 'Promise rejected'
      });
    }
  });

  const successfulSubmissions = submissions.filter(s => s.success).length;
  const failedSubmissions = submissions.length - successfulSubmissions;

  return {
    submissions,
    totalSubmitted: submissions.length,
    successfulSubmissions,
    failedSubmissions
  };
}

/**
 * Submit multiple URLs to IndexNow API
 * @param urls - Array of URLs to submit
 * @param batchSize - Number of URLs to submit per batch (default: 10)
 * @returns Promise with all submission results
 */
export async function submitBatchToIndexNow(
  urls: string[], 
  batchSize: number = 10
): Promise<IndexNowResponse> {
  const allSubmissions: IndexNowSubmission[] = [];
  
  // Process URLs in batches to avoid overwhelming the API
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchPromises = batch.map(url => submitToIndexNow(url));
    
    const batchResults = await Promise.all(batchPromises);
    
    // Flatten batch results
    batchResults.forEach(result => {
      allSubmissions.push(...result.submissions);
    });
    
    // Add delay between batches to be respectful to the API
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const successfulSubmissions = allSubmissions.filter(s => s.success).length;
  const failedSubmissions = allSubmissions.length - successfulSubmissions;

  return {
    submissions: allSubmissions,
    totalSubmitted: allSubmissions.length,
    successfulSubmissions,
    failedSubmissions
  };
}

/**
 * Submit a blog post URL and related URLs to IndexNow
 * @param blogSlug - The blog post slug
 * @param language - Language version ('en' or 'nl')
 * @returns Promise with submission results
 */
export async function submitBlogPostToIndexNow(
  blogSlug: string, 
  language: 'en' | 'nl' = 'en'
): Promise<IndexNowResponse> {
  const urls: string[] = [];
  
  // Main blog post URL
  const blogUrl = language === 'nl' 
    ? `${BASE_URL}/nl/blog/${blogSlug}`
    : `${BASE_URL}/blog/${blogSlug}`;
  urls.push(blogUrl);
  
  // Blog index pages (to update with new post)
  urls.push(language === 'nl' ? `${BASE_URL}/nl/blog` : `${BASE_URL}/blog`);
  
  // Homepage (if blog is featured)
  urls.push(language === 'nl' ? `${BASE_URL}/nl` : BASE_URL);
  
  // Sitemap
  urls.push(`${BASE_URL}/sitemap.xml`);
  
  return submitBatchToIndexNow(urls);
}

/**
 * Submit service page and related URLs to IndexNow
 * @param serviceSlug - The service page slug
 * @param language - Language version ('en' or 'nl')
 * @returns Promise with submission results
 */
export async function submitServicePageToIndexNow(
  serviceSlug: string, 
  language: 'en' | 'nl' = 'en'
): Promise<IndexNowResponse> {
  const urls: string[] = [];
  
  // Main service page URL
  const serviceUrl = language === 'nl' 
    ? `${BASE_URL}/nl/services/${serviceSlug}`
    : `${BASE_URL}/services/${serviceSlug}`;
  urls.push(serviceUrl);
  
  // Services index page
  urls.push(language === 'nl' ? `${BASE_URL}/nl/services` : `${BASE_URL}/services`);
  
  // Homepage
  urls.push(language === 'nl' ? `${BASE_URL}/nl` : BASE_URL);
  
  // Sitemap
  urls.push(`${BASE_URL}/sitemap.xml`);
  
  return submitBatchToIndexNow(urls);
}

/**
 * Validate if a string is a valid URL
 * @param url - String to validate
 * @returns boolean indicating if URL is valid
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get IndexNow key for verification
 * @returns The IndexNow key
 */
export function getIndexNowKey(): string {
  return INDEXNOW_KEY;
}

/**
 * Get IndexNow key file URL for verification
 * @returns The full URL to the key file
 */
export function getIndexNowKeyUrl(): string {
  return `${BASE_URL}/${INDEXNOW_KEY}.txt`;
} 