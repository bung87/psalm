import { NodePlopAPI } from "plop";
import commandExists from "command-exists";

import AskName from "./ask_name_prompt";

export default function (plop: NodePlopAPI) {
  const include = {
    // generators: true,
    helpers: false,
    partials: false,
    actionTypes: true,
  };
  // @ts-ignore
  plop.load(require.resolve("./actions/ask_name"), {}, include);
  plop.setPrompt("askName", AskName as any);
  plop.setGenerator("node", {
    description: "node module",
    prompts: [
      {
        type: "askName",
        name: "package",
        message: "Module Name",
      },
    ],
    // @ts-ignore
    actions: [{ type: "askName", name: "name" }],
  });
}
