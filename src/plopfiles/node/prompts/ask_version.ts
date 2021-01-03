import inquirer from 'inquirer';
import { Interface as ReadLineInterface } from 'readline';
import Base from 'inquirer/lib/prompts/base';
import { valid } from 'semver';

class AskVersion extends Base {
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
  }
  _run = (callback: (r: any) => void) => {
    // avoiding recusively prompt self type
    const { type, ...rest } = this.opt;
    // @ts-ignore
    inquirer
      .prompt(Object.assign(rest, { type: 'input', default: '0.0.1', validate: (e: string) => Boolean(valid(e)) }))
      .then((e) => callback(e[this.opt.name as string]));
    return this;
  };
}

export default AskVersion;
