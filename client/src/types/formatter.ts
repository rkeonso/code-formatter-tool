// 1. Structure of formatting options controlled by UI toggles
export interface FormattingConfig {
  useSingleQuotes: boolean;
  removeSemicolons: boolean;
  tabWidth: number;
}

// 2. Expected response structure returned from our Express API
export interface FormatApiResponse {
  originalCode: string;
  formattedCode: string;
  rulesApplied: FormattingConfig;
  timestamp: string;
  error?: string;
}