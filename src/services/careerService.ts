import { api } from './api';

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx'];

export interface CareerApplicationPayload {
  jobId: string;
  position: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  currentCompany: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  additionalInfo: string;
  consent: boolean;
  resume: File;
}

interface CareerApplicationResponse {
  ok: boolean;
  message?: string;
}

/** Reads a file as base64 (without the data: URL prefix). */
const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(new Error('We could not read your resume file. Please choose it again.'));
    reader.readAsDataURL(file);
  });

export async function sendCareerApplication({ resume, ...fields }: CareerApplicationPayload): Promise<void> {
  const data = await toBase64(resume);
  let response: CareerApplicationResponse;

  try {
    response = await api.post<CareerApplicationResponse>('/careers', { ...fields, resume: { name: resume.name, type: resume.type, data } });
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('The application service is unavailable. Please try again in a moment.');
    }
    throw error;
  }

  if (!response.ok) {
    throw new Error(response.message || 'We could not submit your application.');
  }
}
