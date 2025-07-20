// EDIT COLORS ALSO IN 'tailwind.config', 'general.css' and 'ANTD_THEME' files
import { theme, type ThemeConfig } from 'antd';
import { MAIN_COLORS } from './COLORS';
// #2F2F2F
const MAIN_THEME_TOKEN: ThemeConfig['token'] = {
  // borderRadius: 8,
  borderRadiusLG: 8,
  borderRadiusOuter: 8,
  fontFamily: `var(--font-main)`,
  fontSize: 14,
  fontSizeXL: 16,
  controlHeight: 34,
  controlHeightLG: 51,
};

//     --color-border: rgba(233, 235, 236, var(--tw-border-
export const ANTD_THEME: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: MAIN_COLORS.light.primary,
    colorBgBase: MAIN_COLORS.light.background,
    colorTextBase: MAIN_COLORS.light.text + 'b6',
    colorBorder: MAIN_COLORS.light.border,
    colorBgContainer: MAIN_COLORS.light.card,
    ...MAIN_THEME_TOKEN,
  },
  components: {
    Menu: {
      iconSize: 16,
      itemActiveBg: MAIN_COLORS.light.secondary,
      itemHoverBg: MAIN_COLORS.light.background,
    },
    Select: {
      optionSelectedBg: MAIN_COLORS.light.secondary,
      activeBorderColor: 'transparent',
      hoverBorderColor: 'transparent',
      activeOutlineColor: 'transparent',
    },
    Segmented: {
      trackBg: MAIN_COLORS.light.card,
      itemSelectedColor: MAIN_COLORS.light.primary,
      itemSelectedBg: MAIN_COLORS.light.secondary,
      itemActiveBg: MAIN_COLORS.light.secondary,
    },
    Collapse: {
      borderlessContentBg: MAIN_COLORS.light.card,
      headerBg: MAIN_COLORS.light.input,
      borderlessContentPadding: 0,
    },
    Card: {
      bodyPadding: 16,
      headerPadding:16,
    },
  },
};

export const ANTD_THEME_DARK: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: MAIN_COLORS.dark.primary,
    colorBgBase: MAIN_COLORS.dark.background,
    colorTextBase: MAIN_COLORS.dark.text + 'b6',
    colorBorder: MAIN_COLORS.dark.border,

    ...MAIN_THEME_TOKEN,
  },
  components: {
  },
};
