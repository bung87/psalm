import { ActionConfig, NodePlopAPI } from "plop";
import path from "path";
import {getLicense} from '../../../license'
import { Volume } from "memfs/lib/volume";

export const ActionType = 'PackageLicense'
interface Answers {
  license: string
  author:string
}

interface Config{
  data:{
    vol: Volume
  }
}

export default function (plop: NodePlopAPI) {
  plop.setActionType(ActionType,  (answers: Partial<Answers>, config?: ActionConfig, plop?: NodePlopAPI) => {
    const data = answers as Answers
    const content:string = getLicense(data.license,{
      year:new Date().getFullYear().toString(),
      author:data.author
    })
    const conf = config as Config
    conf.data.vol.writeFileSync('LICENSE',content)
    
    return "";
  });
}
