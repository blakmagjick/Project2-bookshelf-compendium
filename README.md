# Unit 2 Project: Bookshelf Compendium

App Idea: 
A place to list all of your books and keep track of what you've read or haven't read.

Unit 2's project for General Assembly's SEI course. 
Need to build a fully functional CRUD app using RESTful APIs.

###Technologies Used
Server side: ES6, Node, Express\
Database: MongoDB Atlas\
Front end: HTML, CSS, Javascript, EJS\
Tools: Git, GitHub, Heroku

Deployed Link: https://bookshelf-compendium.herokuapp.com/books

## User Stories
As an app user, I want to be able to catalog all the books I own, so that I can keep track of them.\
As an app user, I want to be able to search my library alphabetically, by author, and by genre.\
As an app user, I want to be able to edit and delete books.
  
## Wireframes
Home Page: \
<img width="550" alt="HomePage" src="https://user-images.githubusercontent.com/6404196/135539167-0d4f69b8-425a-4f80-abaa-3e327ed83a46.png">

Index Page:\
<img width="550" alt="IndexPage" src="https://user-images.githubusercontent.com/6404196/135539173-16cfbf0b-f58f-4323-988f-42407d259d77.png">

Show Page:\
<img width="550" alt="ShowPage" src="https://user-images.githubusercontent.com/6404196/135539180-35437aa3-8004-4567-be48-ff8885cab31b.png">

Add New Book:\
<img width="550" alt="AddNewBook" src="https://user-images.githubusercontent.com/6404196/135539193-0cc11784-9881-4e88-aeec-7346370b096d.png">

## MVP Goals
[x] Add books to database\
[x] Look up books in database\
[x] Stylized\
[x] Partials for header & footer

## Stretch Goals
[ ] Dark mode\
[x] Sign up/log in\
[ ] Wish list model\
[ ] Recommendations by genre\
[ ] Optimize for viewing on mobile
  
## Suggestions from others
[x] Filtering by Genre\
[x] Have the rating show up as stars\
[x] List View\
[x] Button to switch between table and list view\
[x] Add background photo of book pages\
[x] Add ISBN to Schema, and relative pages\
[ ] Firebase, from Google\
[ ] Add "You must be logged in" message for Add/Edit/Delete\
[ ] Add Open Library API so most of the covers of the books can be added automatically (https://openlibrary.org/dev/docs/api/covers)

## Bugs/Issues Found (by friends) & Fixed
[x] When a book has no cover, you can't click it to go to the show page\
[x] New background image makes it hard to see the books, suggested adding a border\
[x] When clicking a book on list view, if you hit the back button from the show page it goes to the cover view, and not the list view again. 
