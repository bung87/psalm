import npmName from 'npm-name'
import validatePackageName from 'validate-npm-package-name'
import { upperCaseFirst } from 'upper-case-first'

var defaults = {
  message: 'Module Name',
  validate: function () {
    return true;
  }
};

interface Prompt {
  name: string 
  validate?: any
}
interface Inquirer {
  prompt: (e: any) => Promise<any>
}

export default async function askName(prompt: string | Prompt, inquirer: Inquirer): Promise<{}> {
  if (typeof prompt === 'string') {
    prompt = {
      name: prompt
    };
  }

  var prompts = [
    Object.assign({}, defaults, prompt, {
      validate: function (val: string) {
        var packageNameValidity = validatePackageName(val);

        if (packageNameValidity.validForNewPackages) {
          var validate = (prompt as Prompt).validate ?? defaults.validate;

          return validate.apply(this, arguments);
        }

        return packageNameValidity.errors ? upperCaseFirst(packageNameValidity.errors[0]) : 'The provided value is not a valid npm package name'
      }
    }),
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'The name above already exists on npm, choose another?',
      default: true,
      when: async function (answers: { [key: string]: any }) {
        const { registryUrl } = answers
        const available = await npmName(answers[(prompt as Prompt).name], { registryUrl });
        return !available;
      }
    }
  ];

  const props = await inquirer.prompt(prompts);
  if (props.askAgain) {
    return askName(prompt, inquirer);
  }
  return props;
};