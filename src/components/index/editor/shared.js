import React from "react";

import styles from "~/styles/index/editor";
import { withCss } from "~/util/component";

import Button from "~/components/shared/forms/Button";

export const EditorButton = withCss(Button, styles.button);
