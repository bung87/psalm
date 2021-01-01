import JSZip from "jszip"
import fs from "fs";
import path from 'path'

const new_zip = new JSZip();
const p = path.join(__dirname, 'gitignore.zip')
const data = fs.readFileSync(p)

export async function get(q:string) {
  await new_zip.loadAsync(data)
  const files = new_zip.file(new RegExp(q + '.gitignore', 'i'));
  if(files.length){
    return files[0].async('string')
  }
  return Promise.reject('')
}

if (require && require.main === module) {
  get('node').then(console.log)
}