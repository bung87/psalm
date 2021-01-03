import inquirer from 'inquirer';
import { Interface as ReadLineInterface } from 'readline';
import Base from 'inquirer/lib/prompts/base';

inquirer.registerPrompt('search-list', require('inquirer-search-list'));

const typeList = ['lib', 'app', 'cli'];

class AskProjectType extends Base {
  message?: string | Promise<string> | ((answers: inquirer.Answers) => string | Promise<string>) | undefined;
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
    this.message = question.message;
  }
  _run = (callback: (r: any) => void) => {
    // avoiding recusively prompt self type
    const { type, ...rest } = this.opt;
    const options = Object.assign(rest, {
      // @ts-ignore
      type: 'search-list',
      message: this.message || 'Select Project type',
      choices: typeList,
      default: 'lib',
    });
    // @ts-ignore
    inquirer.prompt(options).then((e) => callback(e[this.opt.name as string]));
    return this;
  };
}

export default AskProjectType;
