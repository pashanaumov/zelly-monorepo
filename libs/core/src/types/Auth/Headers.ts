export interface RequestHeaders {
  [key: string]: string | null | undefined;
  Accept?: string | null;
  'Content-Type': string | null;
  Authorization?: string;
}
