Feature: Api users
  In order to manage the users
  
  Scenario: Create a valid user
    Given I send a POST request to "/api/users" with body:
      """
      {
        "name": "John",
        "email": "john@example.com"
      }
      """
    Then the response status code should be 201
  
  Scenario: Retrieve user by id
    Given I send a GET request to "/api/users/0196959b-349e-7683-a2ab-24ea33d93662"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "0196959b-349e-7683-a2ab-24ea33d93662",
        "name": "John",
        "email": "john@example.com",
        "createdOn": "2023-01-01T00:00:00.000Z",
        "updatedOn": "2023-01-01T00:00:00.000Z"
      }
      """
  
  Scenario: Update user
    Given I send a PUT request to "/api/users/0196959b-349e-7683-a2ab-24ea33d93662" with body:
      """
      {
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
      """
    Then the response status code should be 200