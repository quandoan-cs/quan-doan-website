const fs = require('fs');
const path = require('path');

// Simple recursive watcher that logs file changes under the workspace.
// Run with: node ./scripts/watch-files.js

const root = path.resolve(__dirname, '..');
console.log('watch-files.js: watching', root);

function watchDir(dir) {
  try {
    const watcher = fs.watch(dir, { persistent: true }, (eventType, filename) => {
      if (!filename) return;
      const full = path.join(dir, filename);
      console.log(new Date().toISOString(), eventType, full);
    });

    // Recurse into subdirs
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
      if (err) return;
      for (const e of entries) {
        if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.next') {
          try { watchDir(path.join(dir, e.name)); } catch {}
        }
      }
    });
  } catch (err) {
    // ignore
  }
}

watchDir(root);

process.on('SIGINT', () => {
  console.log('watch-files.js: exiting');
  process.exit(0);
});
