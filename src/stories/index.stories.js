import React from "react";
import { action } from "@storybook/addon-actions";
import LineWidthPicker from "..";

export default {
  title: "LineWidthPicker",
  component: LineWidthPicker
};

export const LineWidthPickerDefault = () => (
  <LineWidthPicker onChange={action("change")} onClick={action("click")} />
);
export const LineWidthPickerPink = () => (
  <div
    style={{
      background: "grey",
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthPicker colour="hotpink" onClick={action("click")} />
  </div>
);
export const LineWidthPickerPinkWithCustomArray = () => (
  <div
    style={{
      background: "grey",
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthPicker
      colour="hotpink"
      onClick={action("click")}
      lineWidths={[1, 3, 7]}
    />
  </div>
);
export const LineWidthPickerDarkBackground = () => (
  <LineWidthPicker background={"#909090"} onClick={action("click")} />
);
export const LineWidthPickerCustomWidthWhiteOnBlackWithAlpha = () => (
  <div
    style={{
      background: "black",
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthPicker
      width={50}
      onClick={action("click")}
    />
  </div>
);

export const LineWidthPickerTransparent = () => (
  <div
    style={{
      background: "black",
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthPicker
      background={"#00000090"}
      onClick={action("click")}
    />
  </div>
);

export const LineWidthPickerBiggerFont = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthPicker
      fontSize={"40px"}
      onClick={action("click")}
    />
  </div>
);

export const LineWidthPickerSelectedWidth = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthPicker
      background={"#ffffff"}
      lineWidth={3}
      onClick={action("click")}
    />
  </div>
);
