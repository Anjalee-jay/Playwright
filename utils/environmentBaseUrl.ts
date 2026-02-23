type CIConfig = {
  prefix: string;
  suffix: string;
};

type SiteConfig = {
  api: string;
  home: string;
};

type EnvironmentConfig = {
  ci: CIConfig;
  local: SiteConfig;
  production: SiteConfig;
  staging: SiteConfig;
};

const environmentConfig: EnvironmentConfig = {
  ci: {
    prefix: 'https://dev-myapp-',
    suffix: '.mydomain.com',
  },
  local: {
    api: 'https://local-myapp.mydomain.com/api',
    home: 'https://local-myapp.mydomain.com',
  },
  production: {
    api: 'https://myapp.mydomain.com/api',
    home: 'https://myapp.mydomain.com',
  },
  staging: {
    api: 'https://staging-myapp.mydomain.com/api',
    home: 'https://staging-myapp.mydomain.com',
  },
};

export default environmentConfig;

// Helper: get home URL for an environment.
// For `ci`, provide the CI branch or identifier to construct the hostname: prefix + id + suffix
export const getHomeUrl = (
  environment: keyof EnvironmentConfig = 'local',
  ciIdentifier?: string,
): string => {
  if (environment === 'ci') {
    if (!ciIdentifier) {
      throw new Error('ciIdentifier is required when environment is "ci"');
    }
    return `${environmentConfig.ci.prefix}${ciIdentifier}${environmentConfig.ci.suffix}`;
  }
  return environmentConfig[environment].home;
};

export const getApiUrl = (
  environment: keyof EnvironmentConfig = 'local',
  ciIdentifier?: string,
): string => {
  if (environment === 'ci') {
    if (!ciIdentifier) {
      throw new Error('ciIdentifier is required when environment is "ci"');
    }
    return `${environmentConfig.ci.prefix}${ciIdentifier}${environmentConfig.ci.suffix}/api`;
  }
  return environmentConfig[environment].api;
};
