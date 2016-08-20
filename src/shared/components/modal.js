import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import TextBox from "~/shared/components/forms/TextBox";
import TextArea from "~/shared/components/forms/TextArea";
import Button from "~/shared/components/forms/Button";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import styles from "~/shared/styles/modal";

export const ModalTextBox = withCss(TextBox, styles.textBox);
export const ModalTextArea = withCss(TextArea, styles.textArea);
export const ModalButton = withCss(Button, styles.button);
export const ModalSubmitButton = withCss(SubmitButton, styles.button);
export const ModalErrorMsg = withCss(ErrorMsg, styles.errorMsg);
