export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://192.168.1.103:3002/' 
    : 'https://www.arcanaxapp.xyz/',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    RESET_PASSWORD: '/auth/reset-password',
    UPDATE_PROFILE: '/auth/update',
  },
  TAROT: {
    CARDS: '/tarot/cards',
    SERVICES: '/tarot/services',
    READINGS: '/tarot/readings',
  },
  NUMEROLOGY: {
    CALCULATE: '/numerology/calculate',
    HISTORY: '/numerology/history',
  },
  BALANCE: {
    GET: '/balance',
    TRANSACTIONS: '/balance/transactions',
  },
  DREAMS: {
    INTERPRET: '/dreams/interpret',
    HISTORY: '/dreams/history',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;