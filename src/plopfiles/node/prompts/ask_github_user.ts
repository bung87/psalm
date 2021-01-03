import inquirer from 'inquirer';
import { Interface as ReadLineInterface } from 'readline';
import Base from 'inquirer/lib/prompts/base';
import userName from 'git-user-name'; //Get a user's name from git config at the project or global scope
// module github-username Get the GitHub username from an email address if the email can be found in any commits on GitHub
class AskGithubUser extends Base {
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

export default AskGithubUser;
