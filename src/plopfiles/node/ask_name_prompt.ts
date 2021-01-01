import inquirer from "inquirer";
import { Interface as ReadLineInterface } from "readline";
import Base from "inquirer/lib/prompts/base";
import askName from "inquirer-npm-name";

class AskName extends Base {
  message?: string | Promise<string> | ((answers: inquirer.Answers) => string | Promise<string>) | undefined;
  name: string;
  constructor(question: inquirer.Question, readLine: ReadLineInterface, answers: inquirer.Answers) {
    super(question, readLine, answers);
    this.name = "name";
    this.message = question.message;
  }
  _run = (callback: (r: any) => void) => {
    askName({ name: this.name, message: this.message }, inquirer).then(callback);
    return this;
  };
}

export default AskName;
