import { ButtonHTMLAttributes } from "react";

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  isCancel?: boolean;
  isClose?: boolean;
};

export function Button({ 
  isOutlined,
  isCancel,
  isClose,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''} ${isCancel ? 'canceled' : ''} ${isClose ? 'closed' : ''}`}
      {...props} 
    />
  );
}