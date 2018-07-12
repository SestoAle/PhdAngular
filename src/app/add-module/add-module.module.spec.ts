import { AddModuleModule } from './add-module.module';

describe('AddModuleModule', () => {
  let addModuleModule: AddModuleModule;

  beforeEach(() => {
    addModuleModule = new AddModuleModule();
  });

  it('should create an instance', () => {
    expect(addModuleModule).toBeTruthy();
  });
});
