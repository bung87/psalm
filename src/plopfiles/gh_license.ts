import { NodePlopAPI } from 'plop';
export default function (plop: NodePlopAPI) {
  plop.setPartial('ghLicense', '![license](https://badgen.net/github/license/#{{pkgName}})');
}
