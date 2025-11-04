// Intentionally empty module so TypeScript build won't attempt to compile
// Node-only code. The real Vite config is provided in vite.config.js and
// the build script is configured to use that file.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

// Resolve path relative to this config file
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const version = readFileSync(path.join(__dirname, 'version.txt'), 'utf-8').trim()

export default defineConfig({
	plugins: [react()],
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
})
