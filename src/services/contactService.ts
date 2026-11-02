import { api } from './api';

export interface ContactFormPayload {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

interface ContactFormResponse {
  ok: boolean;
  message?: string;
}

export async function sendContactForm(payload: ContactFormPayload): Promise<void> {
  let response: ContactFormResponse;

  try {
    response = await api.post<ContactFormResponse>('/contact', payload);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Email service is unavailable. Please try again in a moment.');
    }
    throw error;
  }

  if (!response.ok) {
    throw new Error(response.message || 'We could not send your enquiry.');
  }
}