import type { ReactElement, SVGProps } from 'react';

type IconName =
  | 'check'
  | 'eye'
  | 'eyeOff'
  | 'loader'
  | 'mail'
  | 'plus'
  | 'search'
  | 'settings'
  | 'trash'
  | 'x';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  title?: string;
};

const paths: Record<IconName, ReactElement> = {
  check: <path d="m20 6-11 11-5-5" />,
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2" />
      <path d="M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-3.1 4.1" />
      <path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.5 7 10 7c1.5 0 2.9-.4 4.1-1" />
    </>
  ),
  loader: (
    <>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="m16.24 16.24 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="m16.24 7.76 2.83-2.83" />
    </>
  ),
  mail: (
    <>
      <rect height="16" rx="2" width="20" x="2" y="4" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  settings: (
    <>
      <path d="M12.2 2h-.4l-1 3a7.8 7.8 0 0 0-1.8.8L6.1 4.5l-1.6 1.6L5.8 9c-.3.6-.6 1.2-.8 1.8l-3 1v2.4l3 1c.2.6.5 1.2.8 1.8l-1.3 2.9 1.6 1.6L9 20.2c.6.3 1.2.6 1.8.8l1 3h2.4l1-3c.6-.2 1.2-.5 1.8-.8l2.9 1.3 1.6-1.6-1.3-2.9c.3-.6.6-1.2.8-1.8l3-1v-2.4l-3-1a7.8 7.8 0 0 0-.8-1.8l1.3-2.9-1.6-1.6L17 5.8a7.8 7.8 0 0 0-1.8-.8l-1-3Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
};

export function Icon({ name, size = 18, title, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      fill="none"
      height={size}
      role={title ? 'img' : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
