# cPanel / Passenger preview deployment

Prepared for the owner's existing app:
- Node 22.x (the cPanel screenshot offers 22.23.2).
- Application mode: Production. This is NODE_ENV, not permission to index.
- Application root: wd-marketing-app, outside public_html.
- Application URL: preview.wdmarketing.co.uk at `/`, not the live WordPress domain.
- Startup file: server.js.
- Environment variables: DEPLOYMENT_ENV=preview and CONTACT_ENABLED=false.

## Local build and archive
Pull `feature/interactive-growth-navigation` on the owner's computer, then run:
```
npm ci
node scripts/package-cpanel.cjs
```
The script runs a fresh production build and only creates
`wd-marketing-cpanel-preview.zip` if it succeeds. The ZIP contains `.next`,
`public`, `src`, the startup file, manifests and necessary configuration.
Its contents sit directly at the archive root. No `node_modules`, `.git`,
environment files, local logs or `.next/cache` are included. The script does
not modify WordPress or upload anything. It builds the owner's configured
font assets locally through Next.js; no font binaries are supplied separately.

Do not upload a plain GitHub source ZIP and assume it is a production build.
Do not upload `.next/dev`, a Windows node_modules folder or a database backup.
The build must match the intended public configuration. Rebuild after changing
NEXT_PUBLIC variables or final project images.

## Upload
Stop only this preview Node app. In cPanel File Manager open the home-level
`wd-marketing-app` folder (not public_html and not the preview document root).
Upload and extract the ZIP there. `server.js`, `package.json`, `src`, `public`
and `.next` must be directly within `wd-marketing-app`. Enable Show Hidden Files
to see `.next`. A cPanel-generated sample server.js can be replaced by this
project's server.js after retaining a copy if needed. Preserve cPanel-managed
`node_modules` symlinks, `.htaccess`, passenger control files and other sites.

## Dependencies and startup
Use the activation command shown by cPanel. It has this structure, but copy
the actual command from the UI instead of guessing a username:
```
source "$HOME/nodevenv/wd-marketing-app/22/bin/activate"
cd "$HOME/wd-marketing-app"
npm install --include=dev --no-audit --no-fund
```
Unlike local npm ci, this installation must preserve the CloudLinux-managed
node_modules symlink. Including dev dependencies also retains TypeScript
configuration support. cPanel's Run NPM Install button is an alternative, but
verify it has installed any configuration dependencies required at startup.

Return to the Node app screen and Start/Restart it. Passenger invokes server.js;
do not run npm run dev, a background npm start, PM2 or another listener in SSH.
No change to package.json's existing start script is required for the selector.

## Preview safeguards and verification
server.js defaults to preview: X-Robots-Tag: noindex, nofollow, noarchive; no live
contact delivery; robots.txt permits crawlers to see noindex without advertising
a sitemap. The known preview host remains noindex even if DEPLOYMENT_ENV is
mistakenly changed to production. These are indexing controls, NOT password
protection. Add host-level access control when sharing confidential material.
Do not submit this preview to Search Console.

Check HTTPS certificate validity before entering any sensitive information.
Then check `/`, `/services/seo`, JS/CSS/image loads, the actual menu/hero/FAQ,
and the X-Robots-Tag header. Form delivery deliberately remains unavailable.
Linux CI exercises the real server.js with the production build; it does NOT
certify the owner's Passenger server, SSL, host limits or directory permissions.
If installation/startup fails, retain the logs, redact credentials and resolve
it before touching the live site. Do not disable type checks to force a build.

## Live cutover is a separate approval
Back up WordPress files AND its database first. Review and implement the old URL
map, `.htaccess` conflicts, final images/copy, mail delivery/Turnstile, tracking,
host capacity and rollback. `DEPLOYMENT_ENV=production` is an explicit indexing
opt-in for the real domain only. Public testing must confirm redirects and
canonical/sitemap/robots behaviour after cutover. This update does not migrate
WordPress, modify DNS, configure TLS, delete content, merge main or deploy.

References:
- https://www.namecheap.com/support/knowledgebase/article.aspx/10686/29/how-to-deploy-reactjs-vitejs-react-native-and-nextjs-applications-in-cpanel/
- https://www.namecheap.com/support/knowledgebase/article.aspx/10047/2182/how-to-work-with-nodejs-app/
- https://nextjs.org/docs/app/guides/custom-server
