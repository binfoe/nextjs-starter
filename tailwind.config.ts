import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import FormPlugin from '@tailwindcss/forms';

// Button 组件里用了 dynamic classes，如果要使用 blue 之外的颜色需要在此注册到 tailwind safelist 中。
const ButtonColors = ['red'].reduce<string[]>(
  (pv, clr) =>
    pv.concat(
      ...['bg', 'text', 'focus:ring', 'dark:hover:border'].map((v) => `${v}-${clr}-500`),
      `border-${clr}-200`,
      `hover:bg-${clr}-600`,
      `focus:ring-${clr}-600`,
    ),
  [],
);
const config: Config = {
  darkMode: 'class',
  content: ['./node_modules/preline-react/lib/**/*.{js,jsx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
    },
  },
  plugins: [FormPlugin],
  safelist: [...ButtonColors],
};
export default config;
