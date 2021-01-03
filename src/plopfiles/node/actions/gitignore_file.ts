import { ActionConfig, NodePlopAPI } from 'plop';
import { Volume } from 'memfs/lib/volume';
import { gitignore } from '../../../gitignore';

export const ActionType = 'PackageGitignore';
interface Answers {
  license: string;
  author: string;
}

interface Config {
  data: {
    vol: Volume;
  };
}

export default function (plop: NodePlopAPI) {
  plop.setActionType(ActionType, async (answers: Partial<Answers>, config?: ActionConfig, plop?: NodePlopAPI) => {
    const data = answers as Answers;
    const content = await gitignore('node');
    const conf = config as Config;
    conf.data.vol.writeFileSync('.gitignore', content);
    console.log(conf.data.vol.toJSON());
    return '';
  });
}
