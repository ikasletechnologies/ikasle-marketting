import { api } from './api';

interface NewsletterResponse {
  ok: boolean;
  message?: string;
}

/** Subscribes an email address. `website` is the honeypot field and must stay empty for real visitors. */
export async function subscribeToNewsletter(email: string, source: string, website = ''): Promise<string> {
  let response: NewsletterResponse;
  try {
    response = await api.post<NewsletterResponse>('/newsletter', { email, source, website });
  } catch (error) {
    if (error instanceof TypeError) throw new Error('Subscriptions are unavailable right now. Please try again in a moment.');
    throw error;
  }
  if (!response.ok) throw new Error(response.message || 'We could not subscribe you right now.');
  return response.message || 'Thanks for subscribing.';
}
