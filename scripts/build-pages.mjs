import { execSync } from 'node:child_process'
import fs from 'node:fs'

const env = {
  ...process.env,
  VITE_PAGES: 'true',
}

execSync('npm run build', { stdio: 'inherit', env })
fs.copyFileSync('dist/index.html', 'dist/404.html')
console.log('Built for https://<username>.github.io/ (root — repo must be <username>.github.io)')
