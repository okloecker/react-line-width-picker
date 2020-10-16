import React, { useState } from "react";
import PropTypes from "prop-types";

const DEFAULT_ELEMENTS = [1, 2, 3, 4, 5, 7, 9];
const DEFAULT_WIDTH = 100;
const DEFAULT_COLOUR = "#00ff00";
const DEFAULT_BACKGROUND = "#000000";
const DEFAULT_FONT = "sans-serif";
const DEFAULT_FONT_SIZE = "initial";

/**
 * Turns hex colour into its negative.
 * "rgb" MUST BE of the form "#000000" with optional alpha: "#00000000"
 */
function invertRgb(rgb) {
  if (!rgb) throw new Error("not a colour, expected #000000 or #00000000");
  const rgbArr = rgb.match(
    /#([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{0,2})/i
  );
  if (!(rgbArr || []).length)
    throw new Error("not a colour, expected #000000 or #00000000");
  const alpha = (rgbArr || []).slice(4);
  const rvArr = (rgbArr || [])
    .slice(1, 4)
    .map(a => +("0x" + a) ^ 0xff)
    .map(a => a.toString(16).padStart(2, 0));
  const rv = "#" + rvArr.join("") + (alpha[0] || "");
  return rv;
}

/**
 * Line Width Picker.
 * Shows 2 columns: numerical width and graphical line in the respective width.
 * On hovering over an element, it will change its opacity and be surrounded by
 * a border in the colour negative to the background.
 *
 * Configurable props:
 * @param lineWidths array of widths to display (default: DEFAULT_WIDTH)
 * @param width component width
 * @param background component's background colour
 * @param colour the texts' and lines' colour
 * @param font the text's font-family
 * @param opacity the component's opacity (not the hovering opacity)
 * @param onClick fires when user clicks a hovered line
 * @param onChange fires when user hovers over a line (enters it)
 *
 */
const LineWidthPicker = ({
  lineWidths,
  lineWidth,
  width,
  background,
  colour,
  hoverBorder,
  hoverBackground,
  font,
  fontSize,
  opacity,
  onClick,
  onChange
}) => {
  const [hoverId, setHoverId] = useState(lineWidth || 0);
  const [selected, setSelected] = useState(lineWidth || undefined);
  const finalColour = colour || DEFAULT_COLOUR;
  const finalBackground = background || DEFAULT_BACKGROUND;
  const finalBorder = el => {
    if (hoverBorder && +hoverId === +el) return hoverBorder;
    const rv =
      +hoverId === +el ? `2px solid ${invertRgb(finalBackground)}` : ``;
    return rv;
  };

  const handleClick = e => {
    setSelected(+e.currentTarget.id);
    onClick(+e.currentTarget.id);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em",
        borderRadius: "8px",
        width: width || DEFAULT_WIDTH,
        // background: finalBackground,
        opacity: opacity || 1
      }}
    >
      {((Array.isArray(lineWidths) && lineWidths) || DEFAULT_ELEMENTS).map(
        el => (
          <div
            key={el + Math.random()}
            id={el}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 5fr",
              gridColumnGap: "1ex",
              alignItems: "center",
              width: el === +selected ? "100%" : "90%",
              padding: "0.3ex",
              outline: finalBorder(el),
              opacity: el === +hoverId ? 1 : opacity,
              background: el === +hoverId && hoverBackground ? hoverBackground : "undefined",
            }}
            onClick={onClick ? handleClick : null}
            onMouseEnter={e => {
              setHoverId(e.currentTarget.id);
              onChange && onChange(e.currentTarget.id);
            }}
            onMouseLeave={e => setHoverId(undefined)}
          >
            <div
              style={{
                color: finalColour,
                fontFamily: font || DEFAULT_FONT,
                fontSize: fontSize || DEFAULT_FONT_SIZE,
              }}
            >
              {el}
            </div>
            <div
              style={{
                borderBottom: `${el}px solid ${colour || DEFAULT_COLOUR}`
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

LineWidthPicker.propTypes = {
  lineWidths: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default LineWidthPicker;
