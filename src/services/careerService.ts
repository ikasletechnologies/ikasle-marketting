import { api } from './api';

export interface CareerApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  portfolio: string;
  availability: string;
  message: string;
}

interface CareerApplicationResponse {
  ok: boolean;
  message?: string;
}

export async function sendCareerApplication(payload: CareerApplicationPayload): Promise<void> {
  let response: CareerApplicationResponse;

  try {
    response = await api.post<CareerApplicationResponse>('/careers', payload);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Email service is unavailable. Please try again in a moment.');
    }
    throw error;
  }

  if (!response.ok) {
    throw new Error(response.message || 'We could not send your application.');
  }
}