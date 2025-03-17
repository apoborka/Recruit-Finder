// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  name?: string; // Optional
  location?: string; // Optional
  email?: string; // Optional
  html_url: string;
  company?: string; // Optional
  bio?: string; // Optional
}