import inquirer from 'inquirer';
import { Interface as ReadLineInterface } from 'readline';
import Base from 'inquirer/lib/prompts/base';
import path from 'path';

class AskRepo extends Base {
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
  }
  _run = (callback: (r: any) => void) => {
    // avoiding recusively prompt self type
    const { type, ...rest } = this.opt;
    const def = this.answers.name || path.basename(process.cwd());
    const options = { type: 'input', default: def };
    // @ts-ignore
    inquirer.prompt(Object.assign(rest, options)).then((e) => callback(e[this.opt.name as string]));
    return this;
  };
}

export default AskRepo;
