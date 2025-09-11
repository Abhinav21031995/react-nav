declare module 'shared_ui/RadioButton' {
    interface RadioOption {
        value: string;
        label: string;
    }

    interface RadioButtonProps {
        options: RadioOption[];
        label?: string;
        selectedValue?: string;
        onChange?: (value: string) => void;
        variant?: 'primary' | 'secondary';
        disabled?: boolean;
        name: string;
    }

    const RadioButton: React.FC<RadioButtonProps>;
    export default RadioButton;
}
