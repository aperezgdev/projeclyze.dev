Feature: Api Projects
  In order to manage the projects

  Scenario: Retrieve project by owner
    Given I send a GET request to "/api/users/0196959b-349e-7683-a2ab-24ea33d93662/projects"
    Then the response status code should be 200
    And the response body should be:
        """
        [
            {
            "id": "0196959b-349e-7683-a2ab-24ea33d93662",
            "title": "Project 1",
            "description": "Project 1 description",
            "owner": "0196959b-349e-7683-a2ab-24ea33d93662",
            "members": ["0196959b-349e-7683-a2ab-24ea33d93662"],
            "updatedOn": "2022-01-01T00:00:00.000Z",
            "createdOn": "2022-01-01T00:00:00.000Z"
            }
        ]
        """

  Scenario: Create a valid project
    Given I send a POST request to "/api/projects" with body:
      """
      {
        "title": "Project title",
        "description": "Project description",
        "owner": "2693c650-2bf7-49c2-a4c5-48c9eb6f8458"
      }
      """
    Then the response status code should be 201

    Scenario: Update project
      Given I send a PUT request to "/api/projects/0196959b-349e-7683-a2ab-24ea33d93662" with body:
        """
        {
          "title": "Project title updated",
          "description": "Project description updated",
          "owner": "0196959b-349e-7683-a2ab-24ea33d93662"
        }
        """
      Then the response status code should be 200


    Scenario: Delete project
      Given I send a DELETE request to "/api/projects/0196959b-349e-7683-a2ab-24ea33d93662"
      Then the response status code should be 204
