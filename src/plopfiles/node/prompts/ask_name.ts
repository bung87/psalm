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
  run =  async ()  =>  {
    // avoiding recusively prompt self type
    const {type,when,...rest} = this.opt
    // let shouldRun = typeof this.opt.when ==='function' ?  this.opt.when(this.answers) :await Promise.resolve(this.opt.when)
    // console.log(shouldRun)
    // if(!shouldRun){
    //   return ''
    // }
    // TODO inquirer-npm-name only check name,npm-name support registryUrl in options
    // which resolved by package registry-url parse (.npmrc file)
    const options = Object.assign(rest,{type:'input',default:path.basename(process.cwd())})
    return  await askName(options, inquirer)
  };
}

export default AskName;
