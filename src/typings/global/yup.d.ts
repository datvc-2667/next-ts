import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    password(message: string): yup.StringSchema<string>;
    positiveFraction(message: string): yup.StringSchema<string>;
  }

  interface MixedSchema {
    file(options: {
      message: string;
      supportedTypes: string[];
      maxSize: number;
    }): MixedSchema;
  }
}
