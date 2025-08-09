declare module "react-numpad" {
	export interface DateTimeProps {
		dateFormat: string;
		inline: boolean;
		displayRule: (value: string) => string;
		validation: (value: string) => boolean;
		formatInputValue: (value: string) => string;
		confirm: (value: string) => void;
		cancel: () => void;
	}

	export function DateTime(props: DateTimeProps): JSX.Element;
}
