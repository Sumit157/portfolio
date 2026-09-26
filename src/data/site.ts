export interface SiteConfig {
  name: string;
  role: string;
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  statement: string;
}

/*
  Owner-supplied contact details only. Anything not written here is not
  published anywhere on the site (AGENTS.md §10).
*/
export const siteConfig: SiteConfig = {
  name: 'Sumit Dilip Babar',
  role: 'Software Engineer',
  email: 'sumitbabar1234@gmail.com',
  github: 'https://github.com/Sumit157',
  githubHandle: 'Sumit157',
  linkedin: 'https://www.linkedin.com/in/sumit-babar-su7/',
  linkedinHandle: 'sumit-babar-su7',
  statement:
    'I build software systems — backend services, cloud infrastructure, machine learning models, and experimental applications.',
};
