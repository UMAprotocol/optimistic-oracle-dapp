import React, {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
} from "react";

import { COLORS } from "./button-colors";
import { BaseButton } from "./Button.styled";

type Variant = "primary" | "outline" | "base";
export type Props = {
  variant?: Variant;
} & HTMLAttributes<HTMLButtonElement>;

interface ButtonStyles extends React.CSSProperties {
  "--textColor": string;
  "--bgColor": string;
  "--borderColor": string;
  "--hoverBackgroundColor": string;
  "--hoverTextColor"?: string;
}

const STYLES: {
  [key in Variant]: ButtonStyles;
} = {
  primary: {
    "--textColor": COLORS.white,
    "--bgColor": COLORS.primary,
    "--borderColor": "transparent",
    "--hoverBackgroundColor": COLORS.primaryDark,
    "--hoverTextColor": COLORS.white,
  },
  outline: {
    "--textColor": COLORS.primary,
    "--bgColor": COLORS.white,
    "--borderColor": "currentColor",
    "--hoverBackgroundColor": COLORS.primary,
    "--hoverTextColor": COLORS.white,
  },
  base: {
    "--textColor": "",
    "--bgColor": "",
    "--borderColor": "",
    "--hoverBackgroundColor": "",
    "--hoverTextColor": "",
  },
};

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { children, variant = "primary", ...delegated },
  externalRef
) => {
  if (!["primary", "outline", "base"].includes(variant)) {
    throw new Error(
      `Button should be passed a valid variant prop, you passed ${variant}. If you don't pass a variant prop, Button will default to primary.`
    );
  }

  const styles = STYLES[variant];
  return (
    <BaseButton style={styles} ref={externalRef} {...delegated}>
      {children}
    </BaseButton>
  );
};

const Button = forwardRef(ButtonComponent);
Button.displayName = "Button";

export default Button;
