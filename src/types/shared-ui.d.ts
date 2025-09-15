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

declare module "shared_ui/Select" {
  export interface SelectOption {
    value: string;
    label: string;
  }

  export interface SelectProps {
    options: SelectOption[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    appearance?: 'outline' | 'standard';
  }

  export const Select: React.FC<SelectProps>;
  export default Select;
}

declare module "shared_ui/Tabs" {
  export interface TabProps {
    label: string;
    children?: React.ReactNode;
    disabled?: boolean;
  }

  export interface TabsProps {
    children: React.ReactElement<TabProps>[];
    stretch?: boolean;
    onChange?: (index: number) => void;
    defaultTab?: number;
  }

  export const Tab: React.FC<TabProps>;
  export const Tabs: React.FC<TabsProps>;
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

declare module "shared_ui/Dialog" {
  export interface DialogData {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'info' | 'warning' | 'error';
  }

  export interface DialogProps extends DialogData {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel?: () => void;
  }

  export const Dialog: React.FC<DialogProps>;
}

declare module "shared_ui/DatePicker" {
  export interface DatePickerProps {
    /**
     * The current value of the datepicker (dd/mm/yyyy format)
     */
    value?: string;
    /**
     * Placeholder text when no date is selected
     */
    placeholder?: string;
    /**
     * Called when the date changes
     */
    onChange?: (value: string) => void;
    /**
     * Whether the field is required
     */
    required?: boolean;
    /**
     * Error message to display when validation fails
     */
    error?: string;
  }

  export const DatePicker: React.FC<DatePickerProps>;
}

declare module "shared_ui/Card" {
  export interface CardProps {
    /**
     * The heading text to display at the top of the card
     */
    label?: string;
    /**
     * Whether to show the heading
     */
    showHeading?: boolean;
    /**
     * Whether to remove the drop shadow
     */
    removeDropshadow?: boolean;
    /**
     * The content to display in the card
     */
    children?: React.ReactNode;
    /**
     * Additional CSS class names
     */
    className?: string;
  }

  export const Card: React.FC<CardProps>;
}
declare module 'shared_ui/ExpansionPanel' {
    interface ExpansionPanelProps {
        title: string;
        description?: string;
        children?: React.ReactNode;
        defaultExpanded?: boolean;
    }
    const ExpansionPanel: React.FC<ExpansionPanelProps>;
    export default ExpansionPanel;
}