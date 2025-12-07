import { cn } from '@/lib/utils';

export const Logo = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 800 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-32', className)}
      {...props}
    >
      <path
        d="M150 70 L100 95 V155 L150 180 L200 155 V130 L150 155 L125 142.5 V107.5 L150 95 L175 107.5 V117.5 M200 130 V95 L150 70 M150 180 L200 155 M125 107.5 L175 132.5 M175 82.5 L225 107.5 V167.5 L175 192.5 L125 167.5 V142.5 L175 167.5 L200 155 V120 L175 107.5 L150 120 V130 M225 142.5 V107.5 L175 82.5 M175 192.5 L225 167.5 M150 120 L200 145"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="280"
        y="160"
        fontFamily="Arial, sans-serif"
        fontSize="80"
        fontWeight="bold"
        fill="currentColor"
      >
        ChadCn UI
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
      <path
        d="M150 70 L100 95 V155 L150 180 L200 155 V130 L150 155 L125 142.5 V107.5 L150 95 L175 107.5 V117.5 M200 130 V95 L150 70 M150 180 L200 155 M125 107.5 L175 132.5 M175 82.5 L225 107.5 V167.5 L175 192.5 L125 167.5 V142.5 L175 167.5 L200 155 V120 L175 107.5 L150 120 V130 M225 142.5 V107.5 L175 82.5 M175 192.5 L225 167.5 M150 120 L200 145"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
