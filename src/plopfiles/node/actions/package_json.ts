import { ActionConfig, NodePlopAPI } from 'plop';
import path from 'path';
import { Volume } from 'memfs/lib/volume';

export const ActionType = 'PackageJson';

interface Answers {
  name: string;
  version: string;
  author: string;
  license: string;
  sourceType: string;
  githubUser: string;
  repo: string;
}

interface Config {
  data: {
    vol: Volume;
  };
}

export default function (plop: NodePlopAPI) {
  plop.setActionType(ActionType, (answers: Partial<Answers>, config?: ActionConfig, plop?: NodePlopAPI) => {
    const data = answers as Answers;
    const conf = config as Config;
    const { name, version, author, license } = data;
    const out: { [key: string]: any } = {
      name,
      version,
      author,
      license,
      files: ['lib'],
    };
    if (data.sourceType == 'private') {
      out.private = true;
    }
    // devDependencies
    // "@tsconfig/node12": "^1.0.7",
    // "esbuild": "^0.8.28",
    // "esbuild-register": "^1.1.1",
    // "esm": "^3.2.25",
    // "husky": "^4.3.6",
    // "prettier": "^2.2.1",
    // "rimraf": "^3.0.2",
    // "yarpm": "^0.2.1"
    out.scripts = {
      clean: 'rimraf lib',
      prettier: 'prettier --ignore-path .gitignore --write "src/**/*.{ts,js}"',
      'prettier:diff': 'prettier -l "src/**/*.{ts,js}"',
      ts: 'node -r esm -r esbuild-register',
      build: 'tsc -p tsconfig.json && tsc -p esmconfig.json',
      watch: 'tsc -p . --watch',
      check: 'tsc --noEmit -p .',
      pretty: 'yarpm run prettier --write --print-width 120 .',
    };
    out.repository = `github:${answers.githubUser}/${answers.repo}`;
    conf.data.vol.writeFileSync('package.json', JSON.stringify(out, null, 2));
    return 'write package.json success';
  });
}
