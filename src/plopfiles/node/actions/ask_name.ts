import { ActionConfig, NodePlopAPI } from "plop";
import path from "path";

interface Answers {
  package:{
    name:string
  }
}

export default function (plop: NodePlopAPI) {
  plop.setActionType("askName", async (answers:Partial<Answers>, config?:ActionConfig, plop?:NodePlopAPI) => {
    const data = answers as Answers
    console.log(data)
    return "";
  });
}
