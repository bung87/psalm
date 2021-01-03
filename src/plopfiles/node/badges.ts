import { NodePlopAPI } from 'plop';
export default function (plop: NodePlopAPI) {
  plop.setPartial(
    'npmVersion',
    '[![Npm Version](https://badgen.net/npm/v/{{pkgName}})](https://www.npmjs.com/package/{{pkgName}})',
  );
  plop.setPartial('npmDownloads', '![npm: total downloads](https://badgen.net/npm/dt/{{pkgName}})');
  plop.setPartial('types', '![Types](https://badgen.net/npm/types/{{pkgName}})');
  plop.setPartial('deps', '![Dep](https://badgen.net/david/dep/{{githubUser}}/{{repo}})');
}
