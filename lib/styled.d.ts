import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		header: {
			primaryColor: string;
			secondaryColor: string;
			highlightColor: string;
			backgroundColor: string;
		};
		body: {
			primaryColor: string;
			secondaryColor: string;
			highlightColor: string;
			backgroundColor: string;
		};
		panel: {
			backgroundColor: string;
		};
		global: {
			fontFamily: string;
		};
	}
}
