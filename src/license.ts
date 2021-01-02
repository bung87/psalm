import { getLicense as _getLicense } from 'license'

export function maxLine(content: string) {

  let j = 0;
  const _maxLine = function (p: string, c: string, i: number) {
    if (c.includes("\n")) {
      j = 0;
    } else {
      j = j + c.length;
    }
    if (j + c.length >= 80) {
      p = p.trimRight() + "\n" + c + " ";
      j = 0;
    } else {
      p += c + " ";
    }
    return p;
  };
  return content.split(" ").reduce(_maxLine, "").trimRight();
};

export function getLicense(license: string, replacements?: {
  [key: string]: string | undefined,
  year?: string
  author?: string
  email?:string
  project?:string
} | undefined): any {
  return maxLine(_getLicense(license, replacements as { [key: string]: string }))
}
