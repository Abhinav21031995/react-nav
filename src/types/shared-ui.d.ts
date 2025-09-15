declare module "shared_ui/Button" {
  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
    disabled?: boolean;
  }

  export const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module "shared_ui/Checkbox" {
  export interface CheckboxProps {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    color?: 'primary' | 'secondary';
    onChange?: (checked: boolean) => void;
  }
  const Checkbox: React.FC<CheckboxProps>;
  export default Checkbox;
}

declare module "shared_ui/RadioButton" {
  export interface RadioOption {
    value: string;
    label: string;
  }

  export interface RadioButtonProps {
    options: RadioOption[];
    label?: string;
    selectedValue?: string;
    onChange?: (value: string) => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    name: string;
  }

  export const RadioButton: React.FC<RadioButtonProps>;
  export default RadioButton;
}

declare module "shared_ui/ProgressSpinner" {
  export type SpinnerColor = 'primary' | 'accent' | 'warn';
  export type SpinnerMode = 'determinate' | 'indeterminate';

  export interface ProgressSpinnerProps {
    /**
     * The color theme of the spinner
     */
    color?: SpinnerColor;
    /**
     * The mode of operation
     */
    mode?: SpinnerMode;
    /**
     * The value for determinate mode (0-100)
     */
    value?: number;
    /**
     * The size of the spinner in pixels
     */
    size?: number;
  }

  export const ProgressSpinner: React.FC<ProgressSpinnerProps>;
  export default ProgressSpinner;
}

declare module "shared_ui/Tooltip" {
  export type TooltipPosition = 'above' | 'below' | 'left' | 'right' | 'before' | 'after';

  export interface TooltipProps {
    /**
     * The text content to display in the tooltip
     */
    label: string;
    /**
     * The position of the tooltip relative to its target
     */
    position?: TooltipPosition;
    /**
     * The content that triggers the tooltip
     */
    children: React.ReactNode;
    /**
     * Custom class for styling
     */
    className?: string;
  }

  export const Tooltip: React.FC<TooltipProps>;
}

declare module "shared_ui/Loader" {
  export interface LoaderProps {
    /**
     * Custom class name for the loader
     */
    className?: string;
  }

  export const Loader: React.FC<LoaderProps>;
}

declare module "shared_ui/Chipset" {
  export interface ChipItem {
    id: string | number;
    label: string;
    color?: 'primary' | 'accent' | 'warn';
    removable?: boolean;
    selected?: boolean;
  }

  export interface ChipsetProps {
    chips: ChipItem[];
    selectable?: boolean;
    removable?: boolean;
    onRemove?: (chip: ChipItem) => void;
    onToggle?: (chip: ChipItem) => void;
  }

  export const Chipset: React.FC<ChipsetProps>;
}

declare module "shared_ui/Input" {
  export interface InputProps {
    /**
     * The current value of the input
     */
    value?: string;
    /**
     * Placeholder text when input is empty
     */
    placeholder?: string;
    /**
     * Label text for the input field
     */
    label?: string;
    /**
     * Callback fired when the input value changes
     */
    onChange?: (value: string) => void;
  }

  export const Input: React.FC<InputProps>;
}
