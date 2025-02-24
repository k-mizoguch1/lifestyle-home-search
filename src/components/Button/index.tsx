import React, { type ReactNode } from 'react'

type Props = {
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button: React.FC<Props> = ({
  children,
  disabled,
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={`${
        disabled ? 'opacity-50' : 'hover:opacity-90'
      } ${className} `}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
