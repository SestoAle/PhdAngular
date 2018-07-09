import { CoordinatorModule } from './coordinator.module';

describe('CoordinatorModule', () => {
  let coordinatorModule: CoordinatorModule;

  beforeEach(() => {
    coordinatorModule = new CoordinatorModule();
  });

  it('should create an instance', () => {
    expect(coordinatorModule).toBeTruthy();
  });
});
