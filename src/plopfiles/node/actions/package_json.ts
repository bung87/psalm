import { ActionConfig, NodePlopAPI } from "plop";
import path from "path";
import { Volume } from "memfs/lib/volume";
export const ActionType = 'PackageJson'
interface Answers {
  name: string
  version: string
  author: string
  license: string
}

interface Config {
  data: {
    vol: Volume
  }
}

export default function (plop: NodePlopAPI) {
  plop.setActionType(ActionType, (answers: Partial<Answers>, config?: ActionConfig, plop?: NodePlopAPI) => {
    const data = answers as Answers
    const conf = config as Config
    const { name, version, author, license } = data
    conf.data.vol.writeFileSync('package.json', JSON.stringify({
      name, version, author, license
    }, null, 2))
    return "write package.json success";
  });
}
