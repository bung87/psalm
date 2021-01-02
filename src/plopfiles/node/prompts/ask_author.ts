import inquirer from "inquirer";
import { Interface as ReadLineInterface } from "readline";
import Base from "inquirer/lib/prompts/base";
var userName = require('git-user-name');

class AskAuthor extends Base {
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
  }
  _run = (callback: (r: any) => void) => {
    // avoiding recusively prompt self type
    const {type,...rest} = this.opt
    // @ts-ignore
    inquirer.prompt(Object.assign(rest,{type:'input',default:userName()})).then( e => callback(e[this.opt.name as string]));
    return this;
  };
}

export default AskAuthor;
