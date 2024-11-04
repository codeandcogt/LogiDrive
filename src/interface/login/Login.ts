export interface Login {
  email: string;
  password: string;
}

export interface jwtData {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  Permission: string[];
  exp: number;
  iss: string;
  aud: string;
}

export interface LoginSessionData {
  nameidentifier: string;
  name: string;
  emailaddress: string;
  role: string;
  token: string;
}
