import { VTColors } from "./utils/colors";

const ACTION_SHADE = `.action-shade {background: linear-gradient(${VTColors.ALPHA(80, VTColors.BLACK).hex} 90%, ${VTColors.TRANSPARENT.hex} 100%);}`;
const ACTION_SHADE_DARK = `.action-shade.dark {background: linear-gradient(${VTColors.ALPHA(100, VTColors.BLACK).hex} 96%, ${VTColors.TRANSPARENT.hex} 100%);}`;


export function initializeStyles(app):void {
  [
    ACTION_SHADE, ACTION_SHADE_DARK
  ].forEach(style => app.addCss(style));  
}