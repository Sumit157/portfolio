import { siteConfig } from './site';

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  external?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: siteConfig.github,
    handle: `github.com/${siteConfig.githubHandle}`,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.linkedin,
    handle: `linkedin.com/in/${siteConfig.linkedinHandle}`,
    external: true,
  },
  {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
  },
];
