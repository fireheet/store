Feature: Request to create a new Store
	As a System
	I want to create a new store
	Given I am logged in as a Partner
	When I send a POST request to /stores with mandatory data in the body
	Then I should get a response with status code 201
	And the response data should not contain sensitive information

	Scenario: Create a new Store
		Given the system receives a POST request to /stores
		And validates the incoming data
		Then the system should create the Store as Disabled
		And the system should return a response with status code 201
		And the response data should not contain sensitive information

Feature: Request to update a Store
	As a System
	I want to update a store
	Given I am logged in as a Partner
	And I am the owner of the store
	When I send a PUT request to /stores/:id with mandatory data in the body
	Then I should get a response with status code 200
	And the response data should not contain sensitive information

	Scenario: Update a Store
		Given the system receives a PUT request to /stores/:id
		And validates the incoming data
		Then the system should update the Store
		And the system should return a response with status code 200
		And the response data should not contain sensitive information