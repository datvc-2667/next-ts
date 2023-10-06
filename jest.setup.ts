import '@testing-library/jest-dom/extend-expect';
import { createContext } from 'react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// eslint-disable-next-line no-console
console.warn = jest.fn().mockImplementation((message: string) => {
  if (
    message.startsWith('There are no focusable elements') ||
    message.startsWith('Image with src') ||
    message.startsWith(
      'The width(0) and height(0) of chart should be greater than 0',
    )
  )
    return;
  throw new Error(message);
});

// eslint-disable-next-line no-console
console.error = jest
  .fn()
  .mockImplementation((error: { [key: string]: string } | string) => {
    if (
      typeof error === 'object' &&
      Object.values(error).includes('XMLHttpRequest')
    )
      return;

    throw new Error(error as string);
  });

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// Refer: https://github.com/vercel/next.js/issues/43769#issuecomment-1371647893
jest.mock('next/dist/shared/lib/router-context.js', () => ({
  RouterContext: createContext(true),
}));
