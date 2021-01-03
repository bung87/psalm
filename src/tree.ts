import { Readable } from 'stream';
import readline from 'readline';
import path from 'path';
import { strict as assert } from 'assert';

/**
 * @param input get tree through `tree -F -f -a --noreport <dir>`
 */
export async function parse(input: string, emitDir = false): Promise<{ [key: string]: string }> {
  const result = new Promise<{ [key: string]: string }>((resolve, reject) => {
    const readable = Readable.from([input]);
    const rl = readline.createInterface({
      input: readable,
      crlfDelay: Infinity,
    });
    let currentDir: string;
    let data: { [key: string]: string } = {};
    rl.on('line', (line: string) => {
      const index = line.lastIndexOf(' ');
      const p = line.substring(index + 1);
      if (p.length > 0) {
        if (!currentDir) {
          currentDir = p;
        }
        const rel = path.relative(currentDir, p);
        if (p.endsWith('/')) {
          if (rel.length && emitDir) {
            data[rel] = '';
          }
        } else {
          if (rel.length) {
            data[rel] = '';
          }
        }
      }
    }).on('close', () => {
      resolve(data);
    });
  });
  return result;
}

export function parseSync(input: string, emitDir = false): { [key: string]: string } {
  let currentDir: string;
  let data: { [key: string]: string } = {};
  input.split('\n').forEach((line: string) => {
    const index = line.lastIndexOf(' ');
    const p = line.substring(index + 1);
    if (p.length > 0) {
      if (!currentDir) {
        currentDir = p;
      }
      const rel = path.relative(currentDir, p);
      if (p.endsWith('/')) {
        if (rel.length && emitDir) {
          data[rel] = '';
        }
      } else {
        if (rel.length) {
          data[rel] = '';
        }
      }
    }
  });

  return data;
}

if (require && require.main === module) {
  const data = `
  src/templates/node
  ├── src/templates/node/.editorconfig
  ├── src/templates/node/.gitignore
  ├── src/templates/node/.travis.yml
  ├── src/templates/node/LICENSE
  ├── src/templates/node/README.md
  ├── src/templates/node/lib/
  │   └── src/templates/node/lib/index.js
  ├── src/templates/node/package.json
  ├── src/templates/node/src/
  │   └── src/templates/node/src/index.ts
  └── src/templates/node/tsconfig.json
`;
  parse(data).then((d) => {
    console.log(d);
    const set = new Set(Object.keys(d));
    assert.ok(set.has('.editorconfig'));
  });

  const data2 = `
  src/templates/node
  ├── src/templates/node/.editorconfig
  ├── src/templates/node/.gitignore
  ├── src/templates/node/.travis.yml
  ├── src/templates/node/LICENSE
  ├── src/templates/node/README.md
  ├── src/templates/node/lib/
  │   └── src/templates/node/lib/index.js
  ├── src/templates/node/package.json
  ├── src/templates/node/src/
  │   └── src/templates/node/src/index.ts
  └── src/templates/node/tsconfig.json
`;
  console.log(parseSync(data2));
}
