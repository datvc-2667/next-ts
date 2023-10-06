import * as yup from 'yup';

import Regex from '@/constants/regex';
import { ONE_MB_TO_BYTE } from '@/constants/size';

// this is example
yup.addMethod<yup.StringSchema>(
  yup.string,
  'password',
  function (message: string) {
    return this.matches(Regex.PASSWORD, {
      message,
      excludeEmptyString: true,
    });
  },
);

yup.addMethod<yup.StringSchema>(
  yup.string,
  'positiveFraction',
  function (message: string) {
    return this.test('positiveFraction', message, value => {
      if (!value) return true;
      return new RegExp(Regex.POSITIVE_FRACTION).test(value);
    });
  },
);

yup.addMethod<yup.MixedSchema>(
  yup.mixed,
  'file',
  function (
    this: yup.MixedSchema,
    {
      message,
      supportedTypes,
      maxSize, // mb unit
    }: { message: string; supportedTypes: string[]; maxSize: number },
  ) {
    return this.test('file', message, function (file) {
      if (!file) return true;

      if (!(file instanceof File)) return false;

      const fileType: string = file.name
        .substring(file.name.lastIndexOf('.'), file.name.length)
        .toLowerCase();

      if (
        !supportedTypes.includes(fileType) ||
        file.size > maxSize * ONE_MB_TO_BYTE
      ) {
        return false;
      }

      return true;
    });
  },
);

export default yup;
