import { cn } from '@/lib/utils';

export const Logo = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chad Cn Logo"
      className={cn('w-32', className)}
      {...props}
    >
      <text
        x="0"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
      >
        Chad Cn
      </text>
    </svg>
  );
};

export const LogoIconBg = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chad Cn Icon"
      {...props}
    >
      <rect width="256" height="256" rx="60" fill="currentColor" />
      <text
        x="128"
        y="160"
        fontFamily="Arial, sans-serif"
        fontSize="120"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        C
      </text>
    </svg>
  );
};
