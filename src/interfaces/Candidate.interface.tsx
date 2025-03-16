// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    name: string;
    location: string;
    email: string;
    html_url: string;
    company: string;
  }