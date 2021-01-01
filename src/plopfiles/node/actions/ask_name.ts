import { NodePlopAPI } from "plop";
import path from "path";

export default function (plop: NodePlopAPI) {
  plop.setActionType("askName", async (answers, config, plop) => {
    return "";
  });
}
