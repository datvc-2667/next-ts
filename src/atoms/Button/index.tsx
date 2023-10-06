import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';

import { styles } from './styled';

type TSizes = 'xs' | 'sm' | 'md' | 'lg' | 'auto';

type TButtonColors =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'transparent'
  | 'default';

type TButtonVariants = 'contained' | 'outlined';

export interface IProps
  extends ButtonHTMLAttributes<HTMLButtonElement & PropsWithChildren> {
  className?: string;
  color?: TButtonColors;
  disabled?: boolean;
  size?: TSizes;
  variant?: TButtonVariants;
  startIcon?: ReactElement<SVGElement>;
  endIcon?: ReactElement<SVGElement>;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<IProps> = ({
  children,
  className,
  color = 'primary',
  size = 'md',
  variant = 'contained',
  startIcon,
  endIcon,
  ...props
}) => {
  const allClassNames = clsx(
    styles.button,
    styles.colors[color][variant],
    styles.size[size],
    className,
  );

  return (
    <button type="button" className={allClassNames} {...props}>
      {startIcon}
      <span
        className={clsx(
          children &&
            startIcon &&
            (size === 'md' || size === 'lg' ? 'ml-2' : 'ml-1'),
        )}
      >
        {children}
      </span>
      {endIcon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          {endIcon}
        </span>
      )}
    </button>
  );
};
