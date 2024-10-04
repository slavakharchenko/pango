import { test } from '@playwright/test';

export function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = `${this.constructor.name}.${context.name as string}`;
    return test.step(name, async () => {
      return await target.call(this as any, ...args);
    });
  };
}
