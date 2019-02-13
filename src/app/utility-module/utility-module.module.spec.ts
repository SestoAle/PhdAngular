import { UtilityModuleModule } from './utility-module.module';

describe('UtilityModuleModule', () => {
  let utilityModuleModule: UtilityModuleModule;

  beforeEach(() => {
    utilityModuleModule = new UtilityModuleModule();
  });

  it('should create an instance', () => {
    expect(utilityModuleModule).toBeTruthy();
  });
});
