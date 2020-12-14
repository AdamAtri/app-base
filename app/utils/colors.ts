import { Color } from "tns-core-modules/color/color";

export const VTColors = {
    // GRAY
    GRAY_900: new Color('#1F2933'),
    GRAY_800: new Color('#323F4B'),
    GRAY_700: new Color('#52606D'),
    GRAY_600: new Color('#7B8794'),
    GRAY_500: new Color('#9AA5B1'),
    GRAY_400: new Color('#C6CAD2'),
    GRAY_300: new Color('#D9DCE1'),
    GRAY_200: new Color('#E4E7EB'),
    GRAY_100: new Color('#EFF1F3'),
    // BLUE
    BLUE_900: new Color('#081C2B'),
    BLUE_800: new Color('#103956'),
    BLUE_700: new Color('#185581'),
    BLUE_600: new Color('#2172AB'),
    BLUE_500: new Color('#298ED6'),
    BLUE_400: new Color('#69B0E2'),
    BLUE_300: new Color('#A9D2EF'),
    BLUE_200: new Color('#D4E8F7'),
    BLUE_100: new Color('#EAF4FB'),
    DARK_BLUE: new Color('rgba(28, 49, 58, 1)'),
    BLUE: new Color('rgba(69, 90, 100, 1)'),
    BRIGHT_BLUE: new Color('rgba(53, 163, 206, 1)'),
    // TEAL
    TEAL_900: new Color('#0D1F26'),
    TEAL_800: new Color('#193F4D'),
    TEAL_700: new Color('#235468'),
    TEAL_600: new Color('#337C99'),
    TEAL_500: new Color('#409BBF'),
    TEAL_400: new Color('#79B9D2'),
    TEAL_300: new Color('#9FCDDF'),
    TEAL_200: new Color('#C6E1EC'),
    TEAL_100: new Color('#ECF5F9'),
    // ORANGE
    ORANGE_900: new Color('#351002'),
    ORANGE_800: new Color('#692103'),
    ORANGE_700: new Color('#9E3105'),
    ORANGE_600: new Color('#D24107'),
    ORANGE_500: new Color('#ED8155'),
    ORANGE_400: new Color('#F2A180'),
    ORANGE_300: new Color('#F6C0AA'),
    ORANGE_200: new Color('#FAE0D5'),
    ORANGE_100: new Color('#FDEFEA'),

    // PINK - deprecated
    PINK: new Color('rgba(197, 17, 98, 1)'),
    LIGHT_PINK: new Color('rgba(254,231,236,1)'),

    // YELLOW
    YELLOW_900: new Color('#3E3317'),
    YELLOW_800: new Color('#946905'),
    YELLOW_700: new Color('#DAB151'),
    YELLOW_600: new Color('#F9CA5C'),
    YELLOW_500: new Color('#FBD785'),
    YELLOW_400: new Color('#FCE5AD'),
    YELLOW_300: new Color('#FDEBC2'),
    YELLOW_200: new Color('#FDF2D6'),
    YELLOW_100: new Color('#FEF8EB'),
    YELLOW: new Color('rgba(249, 220, 92, 1)'),
    PRIMARY_BTN_DISABLED_TEXT: new Color('#E5AC27'),
    // WHITE
    WHITE_100: new Color('#FDFDFD'),
    WHITE: new Color('#FFFFFF'),
    OFF_WHITE: new Color('rgba(250, 253, 255, 1)'),
    BLACK: new Color('#081C2B'),
    FORM_BLUE: new Color('rgba(228, 233, 236, 1)'),
    FORM_BLUE_HOVER: new Color('rgba(204, 209, 212, 1)'),
    BLUE_GRAY: new Color('rgba(187, 193, 196, 1)'),

    NOTIFICATION: new Color('#C54B62'),
    TRANSPARENT: new Color('#00000000'),
    DEBUG: new Color('rgba(255, 0, 0, 0.2)'),
    PLAYER_BACKGROUND: new Color('#444'),

    ALPHA: (alpha: number = 255, color: Color): Color => {
        const { r, g, b } = color;
        const argb = `${alpha}${r}${g}${b}`;
        if (!alphaCache.has(argb))
            alphaCache.set(argb, new Color(alpha, r, g, b));
        return alphaCache.get(argb);
    }
}

const alphaCache: Map<string, Color> = new Map();