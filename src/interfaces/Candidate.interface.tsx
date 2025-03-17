export interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  url: string; // Add the url property
  name?: string; // Optional as it might be missing
  location?: string; // Optional as it might be missing
  email?: string; // Optional as it might be missing
  html_url: string;
  company?: string; // Optional as it might be missing
  bio?: string; // Optional as it might be missing
}