import { ListModuleModule } from './list-module.module';

describe('ListModuleModule', () => {
  let listModuleModule: ListModuleModule;

  beforeEach(() => {
    listModuleModule = new ListModuleModule();
  });

  it('should create an instance', () => {
    expect(listModuleModule).toBeTruthy();
  });
});
