Feature: Players API

    In order to retrieve players and the list of players
    As an API client
    I want to be able to a player given by its id or the list of players sorted by ids

    @players
    Scenario: Should get the list of players sorted by ids
        Given I am public
        When I get the list of players
        Then Should return response code 200
        And Should return response in json format
        And Should return an object with "players"

    @players
    Scenario: Should get the list of players sorted by ids
        Given I am public
        When I get the list of players
        When I get a player with id index = 0
        Then Should return response code 200
        And Should return response in json format
        And Should return an object with "player"



