import { NodePlopAPI, PlopCfg } from "plop";
import commandExists from "command-exists";
import { ActionType as PackageJson } from "./actions/package_json"
import { ActionType as PackageReadme } from './actions/readme_file'
import { ActionType as PackageGitignore } from './actions/gitignore_file'
import { ActionType as PackageLicense } from "./actions/license_file"
import AskName from "./prompts/ask_name";
import AskLicense from './prompts/ask_license'
import AskVersion from './prompts/ask_version'
import AskAuthor from './prompts/ask_author'
import AskProjectType from './prompts/ask_project_type'
import AskLanguage from './prompts/ask_language'
import { fs as memfs, vol, Volume } from 'memfs';
import { parseSync } from "../../tree";
import validatePackageName from 'validate-npm-package-name'

const DirStruct = `
.
├── ./.editorconfig
├── ./.gitignore
├── ./.travis.yml
├── ./LICENSE
├── ./README.md
├── ./lib/
│   └── ./lib/index.js
├── ./package.json
├── ./src/
│   └── ./src/index.ts
└── ./tsconfig.json
`
export default function (plop: NodePlopAPI) {
  const configData = {
    vol: new Volume()
  }
  configData.vol.fromJSON(parseSync(DirStruct))

  const include = {
    // generators: true,
    helpers: false,
    partials: false,
    actionTypes: true,
  };
  plop.load(require.resolve("./actions/license_file"), {}, include);
  plop.load(require.resolve("./actions/package_json"), {}, include);
  plop.load(require.resolve("./actions/readme_file"), {}, include);
  plop.load(require.resolve("./actions/gitignore_file"), {}, include);
  plop.load(require.resolve("./badges"), null, { partials: true });

  plop.setPrompt("askName", AskName);
  plop.setPrompt("askLicense", AskLicense)
  plop.setPrompt("askVersion", AskVersion)
  plop.setPrompt("AskAuthor", AskAuthor)
  plop.setPrompt("AskProjectType", AskProjectType)
  plop.setPrompt("AskLanguage", AskLanguage)
  // name,version,description,entry point,test command,git repository,keywords,author,license,About to write to /Users/bung/js_works/aaa/package.json: Is this OK? (yes) 
  plop.setGenerator("node", {
    description: "node module",
    prompts: [
      {
        type: "list",
        name: "sourceType",
        choices: ['public', 'private'],
        default: 'public',
        message: "Public or private project"
      },
      {
        type: "AskProjectType",
        name: "projectType",
      },
      {
        type: "AskLanguage",
        name: "language",
      },
      {
        type: "askName",
        name: "name",
        message: "Project name",
        when: (e) => e.sourceType === 'public'
      },
      {
        type: "input",
        name: "name",
        message: "Project name(private)",
        validate: (e) => Boolean(validatePackageName(e.name)),
        when: (e) => e.sourceType === 'private'
      },
      {
        type: "askVersion",
        name: "version",
      },
      {
        type: "askLicense",
        name: "license"
      },
      {
        type: "AskAuthor",
        name: "author",
      },
    ],
    // @ts-ignore
    actions: [
      { type: PackageJson, data: configData },
      { type: PackageReadme, data: configData },
      { type: PackageLicense, data: configData },
      { type: PackageGitignore, data: configData }

    ],
  });
}
