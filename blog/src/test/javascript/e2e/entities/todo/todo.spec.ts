// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoComponentsPage, TodoDeleteDialog, TodoUpdatePage } from './todo.page-object';

const expect = chai.expect;

describe('Todo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let todoComponentsPage: TodoComponentsPage;
  let todoUpdatePage: TodoUpdatePage;
  let todoDeleteDialog: TodoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Todos', async () => {
    await navBarPage.goToEntity('todo');
    todoComponentsPage = new TodoComponentsPage();
    await browser.wait(ec.visibilityOf(todoComponentsPage.title), 5000);
    expect(await todoComponentsPage.getTitle()).to.eq('blogApp.todo.home.title');
  });

  it('should load create Todo page', async () => {
    await todoComponentsPage.clickOnCreateButton();
    todoUpdatePage = new TodoUpdatePage();
    expect(await todoUpdatePage.getPageTitle()).to.eq('blogApp.todo.home.createOrEditLabel');
    await todoUpdatePage.cancel();
  });

  it('should create and save Todos', async () => {
    const nbButtonsBeforeCreate = await todoComponentsPage.countDeleteButtons();

    await todoComponentsPage.clickOnCreateButton();
    await promise.all([todoUpdatePage.setTitleInput('title'), todoUpdatePage.setDescriptionInput('description')]);
    expect(await todoUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await todoUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    const selectedComplete = todoUpdatePage.getCompleteInput();
    if (await selectedComplete.isSelected()) {
      await todoUpdatePage.getCompleteInput().click();
      expect(await todoUpdatePage.getCompleteInput().isSelected(), 'Expected complete not to be selected').to.be.false;
    } else {
      await todoUpdatePage.getCompleteInput().click();
      expect(await todoUpdatePage.getCompleteInput().isSelected(), 'Expected complete to be selected').to.be.true;
    }
    await todoUpdatePage.save();
    expect(await todoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await todoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Todo', async () => {
    const nbButtonsBeforeDelete = await todoComponentsPage.countDeleteButtons();
    await todoComponentsPage.clickOnLastDeleteButton();

    todoDeleteDialog = new TodoDeleteDialog();
    expect(await todoDeleteDialog.getDialogTitle()).to.eq('blogApp.todo.delete.question');
    await todoDeleteDialog.clickOnConfirmButton();

    expect(await todoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
