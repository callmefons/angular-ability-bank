import { AbilityFrontPage } from './app.po';

describe('ability-front App', () => {
  let page: AbilityFrontPage;

  beforeEach(() => {
    page = new AbilityFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
