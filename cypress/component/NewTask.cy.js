import NewTask from '../../src/routes/new-task';


describe('NewTask.cy.js', () => {
  it('should add a new task successfully', () => {
    cy.mount(<NewTask />); 
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SaveTaskMutation') {
        req.reply((res) => {
          res.send({
            data: {
              saveTask: {
                id: '1',
                task_name: 'New Task',
                description: 'This is a new task',
                status: false,
              },
            },
          });
        });
      }
    });

    cy.get('input[name="task_name"]').type('New Task');
    cy.get('textarea[name="description"]').type('This is a new task');
    cy.get('select[name="user_assigned"]').select('1');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/tasks');
    cy.get('h2').should('contain', 'Assigned Tasks');
    cy.get('div').should('contain', 'New Task');
    cy.get('p').should('contain', 'This is a new task');
  });

  it('should display an error message if saving task fails', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SaveTaskMutation') {
        req.reply((res) => {
          res.send({
            errors: [{ message: 'Failed to save task' }],
          });
        });
      }
    });

    cy.get('input[name="task_name"]').type('New Task');
    cy.get('textarea[name="description"]').type('This is a new task');
    cy.get('select[name="user_assigned"]').select('1');

    cy.get('button[type="submit"]').click();

    cy.get('.toast-error').should('be.visible').contains('Failed to save task');
  });
})




 
  