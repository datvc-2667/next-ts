import React, { Suspense } from 'react';
import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import '@/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'default',
      values: [
        {
          name: 'default',
          value: '#F4F5F8',
        },
        {
          name: 'black',
          value: '#000000',
        },
      ],
    },
  },
  decorators: [
    Story => (
      <Suspense fallback={<div>loading translations...</div>}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </Suspense>
    ),
  ],
};

export default preview;
