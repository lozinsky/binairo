import harmony from '@evilmartians/harmony/base';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const appearancePlugin = createAppearancePlugin();
const roundedSmoothPlugin = createRoundedSmoothPlugin();

export default {
  content: ['./app/**/*.{ts,tsx}'],
  plugins: [
    appearancePlugin([
      {
        appearance: {
          colors: {
            base: {
              100: harmony.gray[100],
              200: harmony.gray[200],
              300: harmony.gray[300],
              content: harmony.gray[900],
            },
            cell: {
              b: { DEFAULT: harmony.blue[600], focus: harmony.blue[400], highlight: harmony.blue[500] },
              e: { DEFAULT: harmony.gray[600], focus: harmony.gray[400], highlight: harmony.gray[500] },
              r: { DEFAULT: harmony.red[600], focus: harmony.red[400], highlight: harmony.red[500] },
            },
            primary: {
              content: harmony.purple[100],
              DEFAULT: harmony.purple[700],
            },
            secondary: {
              content: harmony.purple[900],
              DEFAULT: harmony.purple[300],
            },
          },
        },
        rule(content) {
          return {
            'html[data-appearance="auto"],html[data-appearance="light"]': content,
          };
        },
        scheme: 'light',
      },
      {
        appearance: {
          colors: {
            base: {
              100: harmony.gray[900],
              200: harmony.gray[800],
              300: harmony.gray[700],
              content: harmony.gray[100],
            },
            cell: {
              b: { DEFAULT: harmony.blue[500], focus: harmony.blue[700], highlight: harmony.blue[600] },
              e: { DEFAULT: harmony.gray[500], focus: harmony.gray[700], highlight: harmony.gray[600] },
              r: { DEFAULT: harmony.red[500], focus: harmony.red[700], highlight: harmony.red[600] },
            },
            primary: {
              content: harmony.purple[900],
              DEFAULT: harmony.purple[300],
            },
            secondary: {
              content: harmony.purple[100],
              DEFAULT: harmony.purple[700],
            },
          },
        },
        rule(content) {
          return {
            'html[data-appearance="auto"]': {
              '@media (prefers-color-scheme: dark)': content,
            },
            'html[data-appearance="dark"]': content,
          };
        },
        scheme: 'dark',
      },
    ]),
    roundedSmoothPlugin,
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 150ms ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
      },
      screens: {
        'scripting-enabled': { raw: '(scripting: enabled)' },
        'scripting-none': { raw: '(scripting: none)' },
      },
    },
    roundedSmooth: { 50: '0.5' },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
  },
};

function createAppearancePlugin() {
  function getColor(value) {
    const match = value.match(/(?<format>.+)\((?<value>.+)\)/);

    if (match === null) {
      return { format: null, value };
    }

    return { format: match.groups.format, value: match.groups.value };
  }

  function getVariable(key, path) {
    return key === 'DEFAULT' ? `--${path.join('-')}` : `--${path.join('-')}-${key}`;
  }

  function addColorScheme(scheme, target) {
    target.colorScheme = scheme;
  }

  function addValues(appearance, target, path, parse) {
    for (const [key, data] of Object.entries(appearance)) {
      if (typeof data === 'object') {
        addValues(data, target, [...path, key], parse);
      } else {
        target[getVariable(key, path)] = parse(data);
      }
    }
  }

  function addDeclarations(appearance, target, path, parse) {
    for (const [key, data] of Object.entries(appearance)) {
      if (typeof data === 'object') {
        addDeclarations(data, (target[key] ??= {}), [...path, key], parse);
      } else {
        target[key] = parse(getVariable(key, path), data);
      }
    }
  }

  return plugin.withOptions(
    (appearances) => (api) => {
      for (const options of appearances) {
        const appearance = {};

        if (typeof options.scheme === 'string') {
          addColorScheme(options.scheme, appearance);
        }

        if (typeof options.appearance.colors === 'object') {
          addValues(options.appearance.colors, appearance, [], (data) => {
            const color = getColor(data);

            return color.value;
          });
        }

        api.addBase(options.rule(appearance));
      }
    },
    (appearances) => {
      const theme = {};

      for (const options of appearances) {
        if (typeof options.appearance.colors === 'object') {
          addDeclarations(options.appearance.colors, (theme.colors ??= {}), [], (variable, data) => {
            const color = getColor(data);

            return color.format === null ? `var(${variable})` : `${color.format}(var(${variable}) / <alpha-value>)`;
          });
        }
      }

      return { theme };
    },
  );
}

function createRoundedSmoothPlugin() {
  return plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        'rounded-smooth'(value) {
          const radius = Number(value);
          const polygon = Array.from({ length: 360 }, (_, index) => {
            const theta = (index * Math.PI) / 180;
            const x = Math.abs(Math.cos(theta)) ** radius * 50 * Math.sign(Math.cos(theta)) + 50;
            const y = Math.abs(Math.sin(theta)) ** radius * 50 * Math.sign(Math.sin(theta)) + 50;

            return `${Math.round(x * 10) / 10}% ${Math.round(y * 10) / 10}%`;
          }).join(', ');

          return { clipPath: `polygon(${polygon})` };
        },
      },
      { values: theme('roundedSmooth') },
    );
  });
}
