# README
## js-rails-spa-book-app
A simple single page book application using vanilla javascript to access a Rails API backend. Uses devise for a basic login to store JSON Web Tokens for each users session. Only intended for local development environment.

## Installation
 Uses an SQL database

```bash
  cd js-rails-spa-book-app
  bundle install
  rails db:migrate
  rails db:seed [optional]
  rails s
```
Then cd into bookListerFrontend and open index.html in a browser.

## Usage
If the database was seeded you can login to the seed user by using the info found in the seed file. This will display seeded lists, books and reviews for that user. Otherwise you can create a new user by using the signup button.

## Contributing
Pull requests are welcome, for changes please open an issue first.

## License
