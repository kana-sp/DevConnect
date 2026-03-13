import * as React from "react";
import { SvgCss } from "react-native-svg/css";
import { SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface Props extends SvgProps {
	xml: string
}

function GlobalSvg(props: Props) {
	return (
		<SvgCss
			width={props.width || 18}
			height={props.width || 18}
			{...props}
		/>
	);
}

const GlobalSvgMEMO = React.memo(GlobalSvg);
export default GlobalSvgMEMO;
