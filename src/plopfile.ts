import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  const include = {
    generators: true,
    helpers: false,
    partials: false,
    actionTypes: false,
  };
  plop.load(require.resolve('./plopfiles/node'), {}, include);
}
