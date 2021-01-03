import { NodePlopAPI, PlopCfg } from 'plop';
import Base from 'inquirer/lib/prompts/base';
import inquirer, { Question, Prompt } from 'inquirer';
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
    setPrompt<T extends Base, Q extends Question>(name: string, prompt: T<Q>): void;
    load(target: string[] | string, loadCfg: Partial<PlopCfg> | null, includeOverride: IncludeDefinition): void;
  }
}
