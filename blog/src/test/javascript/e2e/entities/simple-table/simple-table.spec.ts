// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SimpleTableComponentsPage, SimpleTableDeleteDialog, SimpleTableUpdatePage } from './simple-table.page-object';

const expect = chai.expect;

describe('SimpleTable e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let simpleTableComponentsPage: SimpleTableComponentsPage;
  let simpleTableUpdatePage: SimpleTableUpdatePage;
  let simpleTableDeleteDialog: SimpleTableDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SimpleTables', async () => {
    await navBarPage.goToEntity('simple-table');
    simpleTableComponentsPage = new SimpleTableComponentsPage();
    await browser.wait(ec.visibilityOf(simpleTableComponentsPage.title), 5000);
    expect(await simpleTableComponentsPage.getTitle()).to.eq('blogApp.simpleTable.home.title');
  });

  it('should load create SimpleTable page', async () => {
    await simpleTableComponentsPage.clickOnCreateButton();
    simpleTableUpdatePage = new SimpleTableUpdatePage();
    expect(await simpleTableUpdatePage.getPageTitle()).to.eq('blogApp.simpleTable.home.createOrEditLabel');
    await simpleTableUpdatePage.cancel();
  });

  it('should create and save SimpleTables', async () => {
    const nbButtonsBeforeCreate = await simpleTableComponentsPage.countDeleteButtons();

    await simpleTableComponentsPage.clickOnCreateButton();
    await promise.all([simpleTableUpdatePage.setNameInput('name'), simpleTableUpdatePage.setContentInput('content')]);
    expect(await simpleTableUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await simpleTableUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    await simpleTableUpdatePage.save();
    expect(await simpleTableUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await simpleTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SimpleTable', async () => {
    const nbButtonsBeforeDelete = await simpleTableComponentsPage.countDeleteButtons();
    await simpleTableComponentsPage.clickOnLastDeleteButton();

    simpleTableDeleteDialog = new SimpleTableDeleteDialog();
    expect(await simpleTableDeleteDialog.getDialogTitle()).to.eq('blogApp.simpleTable.delete.question');
    await simpleTableDeleteDialog.clickOnConfirmButton();

    expect(await simpleTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
