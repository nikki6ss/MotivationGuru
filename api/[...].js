import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Import the CommonJS built server
const appModule = require(join(__dirname, '../dist/index.cjs'));

export default appModule;
