import plugin from 'tailwindcss/plugin';

/**
 * @type {import('tailwindcss').Config}
 */
export default {
  plugins: [
    plugin(({ matchUtilities, theme }) => {
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
    }),
  ],
  theme: {
    roundedSmooth: { 50: '0.5' },
  },
};
