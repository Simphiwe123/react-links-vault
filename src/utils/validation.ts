import { LinkItem } from '../types';

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateLinkForm = (data: Omit<LinkItem, 'id' | 'createdAt'>): string[] => {
  const errors: string[] = [];
  
  if (!data.title.trim()) errors.push('Title is required');
  if (!data.url.trim()) {
    errors.push('URL is required');
  } else if (!validateUrl(data.url)) {
    errors.push('URL must be valid (include http:// or https://)');
  }
  
  return errors;
};