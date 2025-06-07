Feature: Api tasks
  In order to manage the tasks

  Scenario: Create a valid task
    Given I send a POST request to "/api/tasks" with body:
      """
      {
        "title": "Task title",
        "description": "Task description",
        "dueDate": "2021-01-01T00:00:00.000Z",
        "creator": "0196959b-349e-7683-a2ab-24ea33d93662",
        "project": "0196959b-349e-7683-a2ab-24ea33d93662"
      }
      """
    Then the response status code should be 201

  Scenario: Retrieve task by owner
    Given I send a GET request to "/api/users/0196959b-349e-7683-a2ab-24ea33d93662/tasks"
    Then the response status code should be 200
    And the response body should be:
      """
      [
        {
          "id": "0196959b-349e-7683-a2ab-24ea33d93662",
          "title": "Task 1",
          "description": "Task 1 description",
          "creator": "0196959b-349e-7683-a2ab-24ea33d93662",
          "project": "0196959b-349e-7683-a2ab-24ea33d93662",
          "updatedOn": "2022-01-01T00:00:00.000Z",
          "createdOn": "2022-01-01T00:00:00.000Z"
        }
      ]
      """

  Scenario: Update task
    Given I send a PUT request to "/api/tasks/0196959b-349e-7683-a2ab-24ea33d93662" with body:
      """
      {
        "title": "Task title updated",
        "description": "Task description updated",
        "creator": "0196959b-349e-7683-a2ab-24ea33d93662",
        "project": "0196959b-349e-7683-a2ab-24ea33d93662"
      }
      """
    Then the response status code should be 200


  Scenario: Delete task
    Given I send a DELETE request to "/api/tasks/0196959b-349e-7683-a2ab-24ea33d93662"
    Then the response status code should be 204
