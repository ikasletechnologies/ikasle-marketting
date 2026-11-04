export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  privacy: boolean;
}

export type ContactFormField = keyof ContactFormData;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export const ALLOWED_SERVICES = [
  'Digital Marketing',
  'Social Media Marketing',
  'SEO & Search Growth',
  'Brand Growth & Creative'
];

export const ALLOWED_BUDGETS = [
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000+'
];

/**
 * 1. Full Name:
 * - Accept only valid names (letters and spaces).
 * - Do not allow numbers or special characters.
 * - Minimum 2 characters.
 */
export function validateFullName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required.';
  }
  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters.';
  }
  if (trimmed.length > 120) {
    return 'Full name must not exceed 120 characters.';
  }
  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    return 'Full name can only contain letters and spaces.';
  }
  return null;
}

/**
 * 2. Work Email:
 * - Accept only valid email addresses.
 * - Validate proper email format (e.g. name@gmail.com).
 * - Prevent multiple email addresses or additional text.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Work email is required.';
  }
  if (trimmed.length > 254) {
    return 'Email address must not exceed 254 characters.';
  }
  if (/\s/.test(trimmed)) {
    return 'Please enter a single valid email address without extra text or spaces.';
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@company.com).';
  }
  return null;
}

/**
 * 3. Phone Number:
 * - Support Indian mobile numbers with optional +91.
 * - Allow exactly 10 valid mobile digits (starting with 6-9).
 * - Prevent alphabets, duplicate country codes and invalid special characters.
 */
export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) {
    return 'Phone number is required.';
  }
  if (/[^0-9+\s-]/.test(trimmed)) {
    return 'Phone number can only contain digits, +91, spaces, or hyphens.';
  }
  const plusCount = (trimmed.match(/\+/g) || []).length;
  if (plusCount > 1 || (plusCount === 1 && !trimmed.startsWith('+'))) {
    return 'Invalid country code format.';
  }
  let digits = trimmed;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.replace(/[\s-]/g, '').length === 12) {
    digits = digits.slice(2);
  }
  digits = digits.replace(/[\s-]/g, '');

  if (!/^\d+$/.test(digits)) {
    return 'Phone number must contain only numbers.';
  }
  if (digits.length < 10) {
    return 'Phone number is incomplete (10 digits required).';
  }
  if (digits.length > 10) {
    return 'Phone number cannot exceed 10 digits.';
  }
  if (!/^[6-9]/.test(digits)) {
    return 'Indian mobile numbers must start with 6, 7, 8, or 9.';
  }
  return null;
}

/**
 * 4. Company Name (Optional):
 * - Letters, numbers, spaces and commonly used special characters (&, ., -, ', ,, ()).
 */
export function validateCompany(company: string): string | null {
  const trimmed = company.trim();
  if (!trimmed) return null;
  if (trimmed.length > 120) {
    return 'Company name must not exceed 120 characters.';
  }
  if (!/^[A-Za-z0-9\s&.,'’\-()]+$/.test(trimmed)) {
    return 'Company name contains invalid characters.';
  }
  return null;
}

/**
 * 5. Service Interested In:
 * - Optional, but if selected must be from the allowed services list.
 */
export function validateService(service: string): string | null {
  const trimmed = service.trim();
  if (!trimmed || trimmed === 'Select a service') return null;
  if (!ALLOWED_SERVICES.includes(trimmed)) {
    return 'Please select a valid service from the options.';
  }
  return null;
}

/**
 * 6. Project Budget:
 * - Mandatory field.
 * - Must select a valid budget option.
 */
export function validateBudget(budget: string): string | null {
  const trimmed = budget.trim();
  if (!trimmed || trimmed === 'Select a budget range') {
    return 'Please select a project budget range.';
  }
  const normalized = trimmed.replace(/&#8377;/g, '₹');
  const isMatch = ALLOWED_BUDGETS.some(b => normalized.includes(b.replace('₹', '')) || b === normalized);
  if (!isMatch) {
    return 'Please select a valid budget range from the options.';
  }
  return null;
}

/**
 * 7. How Can We Help? (message):
 * - Mandatory field.
 * - Minimum 20 characters.
 * - Prevent empty, whitespace-only or meaningless submissions.
 */
export function validateMessage(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) {
    return 'Please tell us about your goals or project.';
  }
  if (trimmed.length < 20) {
    return `Please provide at least 20 characters (${trimmed.length}/20).`;
  }
  if (trimmed.length > 5000) {
    return 'Message must not exceed 5000 characters.';
  }
  if (/^(.)\1{19,}$/.test(trimmed)) {
    return 'Please provide a meaningful description of your goals or project.';
  }
  return null;
}

/**
 * Privacy Policy agreement:
 */
export function validatePrivacy(checked: boolean): string | null {
  if (!checked) {
    return 'Please agree to the Privacy Policy to proceed.';
  }
  return null;
}

export function validateSingleField(field: ContactFormField, value: unknown): string | null {
  switch (field) {
    case 'fullName':
      return validateFullName(String(value ?? ''));
    case 'email':
      return validateEmail(String(value ?? ''));
    case 'phone':
      return validatePhone(String(value ?? ''));
    case 'company':
      return validateCompany(String(value ?? ''));
    case 'service':
      return validateService(String(value ?? ''));
    case 'budget':
      return validateBudget(String(value ?? ''));
    case 'message':
      return validateMessage(String(value ?? ''));
    case 'privacy':
      return validatePrivacy(Boolean(value));
    default:
      return null;
  }
}

export function validateAllFields(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const nameErr = validateFullName(data.fullName);
  if (nameErr) errors.fullName = nameErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const compErr = validateCompany(data.company);
  if (compErr) errors.company = compErr;

  const servErr = validateService(data.service);
  if (servErr) errors.service = servErr;

  const budgetErr = validateBudget(data.budget);
  if (budgetErr) errors.budget = budgetErr;

  const msgErr = validateMessage(data.message);
  if (msgErr) errors.message = msgErr;

  const privErr = validatePrivacy(data.privacy);
  if (privErr) errors.privacy = privErr;

  return errors;
}

