const icons = {
  shield: <path d="M12 2l7 3v7c0 4-3 7-7 9-4-2-7-5-7-9V5l7-3z" />,
  heart: <path d="M19 14c1.5-1.5 2.5-3.5 2.5-5.5C21.5 6 19 3.5 16 3.5c-1.5 0-3 .7-4 1.7-1-.9-2.5-1.7-4-1.7C5 3.5 2.5 6 2.5 8.5c0 2 1 4 2.5 5.5L12 21l7-7z" />,
  car: <path d="M5 17a2 2 0 01-2-2V9l3-5h12l3 5v6a2 2 0 01-2 2M5 17a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM9 5l1 4h4l1-4" />,
  home: <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5zM9 21V12h6v9" />,
  users: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM2 21v-2a4 4 0 014-4h2M16 15a4 4 0 014 4v2M16 7a4 4 0 100-8 4 4 0 000 8z" />,
  plane: <path d="M22 2l-7 20-4-9-9-4 20-7z" />,
  graduation: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  sun: <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 100 12 6 6 0 000-12z" />,
  moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
  menu: <path d="M3 12h18M3 6h18M3 18h18" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />,
  send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  calendar: <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM16 3v4M8 3v4M3 11h18" />,
  clock: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" />,
  check: <path d="M20 6L9 17l-5-5" />,
  alert: <path d="M12 2L1 21h22L12 2zM12 8v4M12 16h.01" />,
  trash: <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6v13a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />,
  eye: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z" />,
  eyeOff: <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24M1 1l22 22" />,
  user: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM2 21v-2a4 4 0 014-4h12a4 4 0 014 4v2" />,
  briefcase: <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M4 7h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />,
  dollar: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  arrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
  info: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4M12 16h.01" />,
  search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  spinner: <path d="M12 2v4M16.24 7.76l2.83-2.83M22 12h-4M16.24 16.24l2.83 2.83M12 18v4M4.93 19.07l2.83-2.83M2 12h4M4.93 4.93l2.83 2.83" />,
}

export function Icon({ name, size = 24, className = '', ...props }) {
  const path = icons[name]
  if (!path) return null
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {path}
    </svg>
  )
}
