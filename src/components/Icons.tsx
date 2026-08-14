import type { ReactElement, SVGProps } from 'react';

type IconName =
  | 'book-open'
  | 'calendar-days'
  | 'check'
  | 'circle'
  | 'clipboard-list'
  | 'file-check'
  | 'graduation-cap'
  | 'loader'
  | 'map'
  | 'plus'
  | 'route'
  | 'search'
  | 'settings'
  | 'sparkles'
  | 'square'
  | 'trash'
  | 'triangle'
  | 'trophy'
  | 'x';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  title?: string;
};

const paths: Record<IconName, ReactElement> = {
  'book-open': (
    <>
      <path d="M12 7v14" />
      <path d="M3 6.2A2.2 2.2 0 0 1 5.2 4H11a1 1 0 0 1 1 1v16a1 1 0 0 0-1-1H5.2A2.2 2.2 0 0 1 3 17.8Z" />
      <path d="M21 6.2A2.2 2.2 0 0 0 18.8 4H13a1 1 0 0 0-1 1v16a1 1 0 0 1 1-1h5.8a2.2 2.2 0 0 0 2.2-2.2Z" />
    </>
  ),
  'calendar-days': (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </>
  ),
  check: <path d="m20 6-11 11-5-5" />,
  circle: <circle cx="12" cy="12" r="8" />,
  'clipboard-list': (
    <>
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M8 11h8" />
      <path d="M8 15h8" />
      <path d="M8 19h5" />
    </>
  ),
  'file-check': (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  'graduation-cap': (
    <>
      <path d="m22 10-10-5-10 5 10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
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
  map: (
    <>
      <path d="M14.1 5.2 9 3 3 5.5v15l6-2.5 6 2.5 6-2.5v-15l-6 2.5-.9-.3Z" />
      <path d="M9 3v15" />
      <path d="M15 5.5v15" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M9 19h2a4 4 0 0 0 4-4V9" />
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
  sparkles: (
    <>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
      <path d="m5 3 .8 2.2L8 6l-2.2.8L5 9l-.8-2.2L2 6l2.2-.8Z" />
    </>
  ),
  square: <rect width="14" height="14" x="5" y="5" rx="2" />,
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  triangle: <path d="M12 4 3 20h18Z" />,
  trophy: (
    <>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M5 5H3v2a4 4 0 0 0 4 4" />
      <path d="M19 5h2v2a4 4 0 0 1-4 4" />
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
