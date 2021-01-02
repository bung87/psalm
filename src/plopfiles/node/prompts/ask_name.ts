import inquirer from "inquirer";
import { Interface as ReadLineInterface } from "readline";
import Base from "inquirer/lib/prompts/base";
import askName from "inquirer-npm-name";
import path from 'path'

/**
 * validate package name and check if exists on npm
 */
class AskName extends Base {
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
  }
  _run = (callback: (r: any) => void) => {
    // avoiding recusively prompt self type
    const {type,...rest} = this.opt
    console.log(this.opt)
    // TODO inquirer-npm-name only check name,npm-name support registryUrl in options
    // which resolved by package registry-url parse (.npmrc file)
    askName(Object.assign(rest,{type:'input',default:path.basename(process.cwd())}), inquirer).then( e => callback(e[this.opt.name as string]));
    return this;
  };
}

export default AskName;
