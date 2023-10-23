// Dada Ki Jay Ho

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_API_KEY = 'isPublic';
export const Public = (ispublic?: boolean) =>
  SetMetadata(IS_PUBLIC_API_KEY, ispublic ?? true);
