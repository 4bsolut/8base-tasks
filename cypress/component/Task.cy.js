describe('Task', () => {
  beforeEach(() => {
    cy.visit('/tasks');
  });

  it('should display assigned tasks', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetAssignedTasks') {
        req.reply((res) => {
          res.send({
            data: {
              tasksList: {
                items: [
                  {
                    id: '1',
                    task_name: 'Task 1',
                    description: 'This is task 1',
                    status: false,
                  },
                  {
                    id: '2',
                    task_name: 'Task 2',
                    description: 'This is task 2',
                    status: true,
                  },
                ],
              },
            },
          });
        });
      }
    });

    cy.get('h2').should('contain', 'Assigned Tasks');
    cy.get('ul').should('contain', 'Task 1');
    cy.get('ul').should('contain', 'Task 2');
    cy.get('p').should('contain', 'This is task 1');
    cy.get('p').should('contain', 'This is task 2');
    cy.get('p').should('contain', 'Status: Incompleta');
    cy.get('button').should('contain', 'Mark as Completed');
  });

  it('should mark task as completed when clicked', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateTaskStatus') {
        req.reply((res) => {
          res.send({
            data: {
              updateTaskStatus: {
                id: '1',
                task_name: 'Task 1',
                description: 'This is task 1',
                status: true,
              },
            },
          });
        });
      }
    });

    cy.get('button').contains('Mark as Completed').click();
    cy.get('.toast-success').should('be.visible').contains('Task Completed!');
    cy.get('p').should('contain', 'Status: Completa');
  });
});
