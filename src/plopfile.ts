import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  const include = { generators: true, helpers: false, partials: false, actionTypes: false }
  // @ts-ignore
  plop.load('./plopfiles/component.js', {}, include);
};