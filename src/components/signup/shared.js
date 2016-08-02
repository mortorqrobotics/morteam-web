import React from "react";

import { withCss, withProps } from "~/util/component";
import styles from "~/styles/signup";

import TextBox from "~/components/shared/forms/TextBox";
import SubmitButton from "~/components/shared/forms/SubmitButton";
import Form from "~/components/shared/forms/Form";

export const SignupInput = withCss(TextBox, styles.input);
export const SignupSubmitButton = withCss(SubmitButton, styles.submitButton);
export const SignupContainer = withCss("div", styles.container);
export const SignupForm = withCss(Form, styles.form);
