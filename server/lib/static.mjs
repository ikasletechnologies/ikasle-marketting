import fs from 'node:fs';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
};

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Serves the Vite build with SPA fallback. A route that has a prerendered
 * dist/<route>/index.html (route-specific meta tags) gets that file; any other
 * extension-less path gets dist/index.html so client-side routing can take over.
 */
export function createStaticHandler(rootDir) {
  const root = path.resolve(rootDir);
  const indexFile = path.join(root, 'index.html');
  const notFoundFile = path.join(root, '404.html');
  if (!isFile(indexFile)) return null;
  const hasNotFoundPage = isFile(notFoundFile);

  function send(response, filePath, method, status = 200) {
    const ext = path.extname(filePath).toLowerCase();
    const isHashedAsset = filePath.startsWith(path.join(root, 'assets') + path.sep);
    response.writeHead(status, {
      ...SECURITY_HEADERS,
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': isHashedAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    if (method === 'HEAD') {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  }

  return function serveStatic(request, response, pathname) {
    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      response.writeHead(400, SECURITY_HEADERS);
      response.end('Bad request');
      return;
    }
    // Resolve inside the build directory only (blocks ../ traversal and absolute paths).
    const target = path.resolve(root, '.' + path.posix.normalize('/' + decoded));
    if (target !== root && !target.startsWith(root + path.sep)) {
      response.writeHead(403, SECURITY_HEADERS);
      response.end('Forbidden');
      return;
    }

    if (isFile(target)) return send(response, target, request.method);

    const prerendered = path.join(target, 'index.html');
    if (isFile(prerendered)) return send(response, prerendered, request.method);

    if (path.extname(target)) {
      response.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    // Unknown route: the app still boots (and shows its not-found view), but crawlers get a real 404.
    if (hasNotFoundPage) return send(response, notFoundFile, request.method, 404);
    return send(response, indexFile, request.method);
  };
}
