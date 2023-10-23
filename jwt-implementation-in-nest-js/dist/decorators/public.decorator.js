"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_API_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_API_KEY = 'isPublic';
const Public = (ispublic) => (0, common_1.SetMetadata)(exports.IS_PUBLIC_API_KEY, ispublic ?? true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map