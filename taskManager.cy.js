describe('Повний сценарій: реєстрація, налаштування і створення задач', () => {
  const user = {
    email: `testuser${Date.now()}@example.com`,
    password: 'TestPassword123!',
    name: 'Test User',
  };

  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('перевіряємо сторінку входу', () => {
    cy.url().should('include', 'http://localhost:3000');
    cy.get('[data-cy=login-title]').should('contain', 'Вхід');
    cy.get('[data-cy=input-email]').type("user@email.com");
    cy.get('[data-cy=input-password]').type("12345678");
    cy.get('[data-cy=login-btn]').should('be.visible').click();
    // Перевірка, що сталася помилка входу
    cy.get('[data-cy=login-error]').should('be.visible').and('contain', 'Невірний email або пароль');
    cy.get('[data-cy=login-register]').should('be.visible').and('contain', 'Реєстрація').click();
  });

  it('реєструємо нового користувача', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('[data-cy=input-name]').type(user.name);
    cy.get('[data-cy=select-gender]').select('Чоловіча');
    cy.get('[data-cy=input-email]').type(user.email);
    cy.get('[data-cy=input-password]').type(user.password);
    cy.get('[data-cy=submit-btn]').click();

    // перевірка, що реєстрація пройшла успішно
    cy.url().should('include', '/dashboard');
  });

  it('переходимо в налаштування і змінюємо тему та мову', () => {
    cy.visit('http://localhost:3000/settings');

    cy.get('[data-cy=select-theme]').select('dark');
    cy.get('[data-cy=select-language]').select('uk');

    // Зберігаємо
    cy.get('[data-cy=button-save]').click();

    // Перевірка повідомлення про збереження
    cy.get('[data-cy=save-message]')
      .should('be.visible')
      .and('contain', 'Зберегти');
  });


  it('створюємо 3 тестові задачі на головній сторінці та редагуэмо першу з них', () => {
    cy.visit('http://localhost:3000/dashboard');

    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate() + 1)}`;
    const time = `${pad((now.getHours() + 1) % 24)}:00`;
    const tasks = ['Задача 1', 'Задача 2', 'Задача 3'];

    tasks.forEach((title) => {
      cy.get('[data-cy=task-title]').clear().type(title);
      cy.get('[data-cy=task-date]').clear().type(today);
      cy.get('[data-cy=task-time]').clear().type(time);
      cy.get('[data-cy=submit-task]').click();
      cy.contains(title).should('be.visible');
    });
    cy.get('[data-cy=task-item]').first().find('[data-cy=edit-task]').click();
    cy.get('[data-cy=task-title]').clear().type('Змінена задача 1');
    cy.get('[data-cy=task-date]').clear().type('2029-06-30');
    cy.get('[data-cy=task-time]').clear().type('15:00');
    cy.get('[data-cy=submit-task]').click();

    // Перевірка, що задача була оновлена
    cy.contains('Змінена задача 1').should('be.visible');
  });
});
