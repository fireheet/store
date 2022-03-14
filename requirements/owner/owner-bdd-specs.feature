Feature: Request to create a new Owner
	As a System
	I want to create a new Owner
	When I send a POST request to /v0/owner with required data on request body
	Then I should get a response with status code 201
	And the response data should not contain sensitive information

	Scenario: Create a new Owner
		Given the system receives a POST request to /v0/owner
		And validates the incoming data
		Then the system should create the Owner
		And the system should return a response with status code 201
		And the response data should not contain sensitive information
