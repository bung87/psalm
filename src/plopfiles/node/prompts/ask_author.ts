import inquirer from 'inquirer';
import { Interface as ReadLineInterface } from 'readline';
import Base from 'inquirer/lib/prompts/base';
import userName from 'git-user-name';

class AskAuthor extends Base {
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
  }
  _run = (callback: (r: any) => void) => {
    // avoiding recusively prompt self type
    const { type, ...rest } = this.opt;

    const options = { type: 'input', default: userName() };
    // @ts-ignore
    inquirer.prompt(Object.assign(rest, options)).then((e) => callback(e[this.opt.name as string]));
    return this;
  };
}

export default AskAuthor;
