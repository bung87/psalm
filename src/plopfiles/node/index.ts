import { NodePlopAPI, PlopCfg } from "plop";
import commandExists from "command-exists";
import { ActionType as PackageName } from "./actions/package_name"
import { ActionType as PackageLicense } from "./actions/package_license"
import AskName from "./prompts/ask_name";
import AskLicense from './prompts/ask_license'
import AskVersion from './prompts/ask_version'
import AskAuthor from './prompts/ask_author'

export default function (plop: NodePlopAPI) {
  const include = {
    // generators: true,
    helpers: false,
    partials: false,
    actionTypes: true,
  };
  // @ts-ignore
  plop.load(require.resolve("./actions/package_name"), {} as PlopCfg, include);
  // @ts-ignore
  plop.load(require.resolve("./actions/package_license"), {} as PlopCfg, include);
  plop.setPrompt("askName", AskName as any);
  plop.setPrompt("askLicense", AskLicense as any)
  plop.setPrompt("askVersion", AskVersion as any)
  plop.setPrompt("AskAuthor", AskAuthor as any)
  
  // name,version,description,entry point,test command,git repository,keywords,author,license,About to write to /Users/bung/js_works/aaa/package.json: Is this OK? (yes) 
  plop.setGenerator("node", {
    description: "node module",
    prompts: [
      {
        type: "askName",
        name: "name",
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
    actions: [{ type: PackageName }, { type: PackageLicense}],
  });
}
