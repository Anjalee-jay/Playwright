export const baseUrls: Record<string, string> = {
  local: 'http://localhost:3000',
  staging: 'https://staging.example.com',
  production: 'https://example.com',
};

export const getBaseUrl = (environment: string = 'local'): string => {
  return baseUrls[environment] || baseUrls['local'];
};
