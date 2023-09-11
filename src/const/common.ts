export const IS_DEVELOPMENT = import.meta.env.DEV;

export const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const API_DATE_FORMAT = "YYYY-MM-DD" as const;

export const APP_DATE_FORMAT = "DD\u00A0MMM\u00A0YYYY" as const;

export const APP_DATE_TIME_FORMAT = `${APP_DATE_FORMAT}, h:mm\u00A0a` as const;
