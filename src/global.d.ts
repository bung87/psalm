import { NodePlopAPI, PlopCfg } from 'plop';
import Base from 'inquirer/lib/prompts/base';
import inquirer, { Question, PromptConstructor } from 'inquirer';
type IncludeDefinition =
  | boolean
  | string[]
  | {
      generators?: boolean;
      helpers?: boolean;
      partials?: boolean;
      actionTypes?: boolean;
    };
declare module 'plop' {
  interface NodePlopAPI {
    setPrompt(name: string, prompt: inquirer.prompts.PromptConstructor): void;
    load(target: string[] | string, loadCfg: Partial<PlopCfg> | null, includeOverride: IncludeDefinition): void;
  }
}
