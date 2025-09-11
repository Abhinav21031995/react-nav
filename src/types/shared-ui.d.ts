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
