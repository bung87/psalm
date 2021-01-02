import { ActionConfig, NodePlopAPI } from "plop";
import path from "path";
import { Volume } from "memfs/lib/volume";
import realfs from 'fs'
import {promisify} from 'util'
export const ActionType = 'PackageReadme'
const readFile = promisify(realfs.readFile)

interface Answers {
  name: string
  // license: string
  // author:string
}

interface Config {
  data: {
    vol: Volume
  }
}

export default function (plop: NodePlopAPI) {
  plop.setActionType(ActionType, async (answers: Partial<Answers>, config?: ActionConfig, plop?: NodePlopAPI) => {
    const data = answers as Answers
    const tpl = path.join(__dirname,'..','..','..','templates','node','README.md')
    
    const f = await readFile(tpl)
    const content = (plop as NodePlopAPI).renderString(f.toString(), {
      projectName: data.name
    })
    const conf = config as Config
    conf.data.vol.writeFileSync('README.md',content as string)
    
    return "write README.md success";
  });
}
