export interface AppStatus {
  loading: boolean;
  error: {
    code?: string;
    message: string;
  } | null;
}
