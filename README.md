# MyReads Project

This is my code for the first project in the React Nanodegree program. MyReads is a 'bookshelf' app that lets you select and categorize books from an API.

From the root page, you can see that Books can be put into three different shelves -- read, currently reading, and want to read. To move a book between shelves use the dropdown and select the new shelf.

To find new books and add them to your shelves use the search button in the bottom right hand corner. This will take you to a search page where you can search the terms in SEARCH_TERMS.md. If your search doesn't turn up any books you will be told that no books were found. Books on this page can be added to the root shelves using the same dropdown as the root page.

## To Get Started

* clone this repository to a local directory and then change directory to it in Terminal
* install all project dependencies with `npm install`
* start the development server with `npm start`
* by default, the server will use localhost:3000 to display the app. a Window should pop up when you run this app.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
