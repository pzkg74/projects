const bookTemplate = document.getElementById("bookTemplate");
const addBookTemplate = document.getElementById("addBookTemplate");
const main = document.querySelector("main");

const addBookDialog = document.getElementById("addBookDialog");
const closeModalButton = document.getElementById("closeModal");
const newBookInput = {
	title: document.getElementById("newBookTitle"),
	author: document.getElementById("newBookAuthor"),
};
const formError = document.getElementById("formError");
const addBookForm = addBookDialog.querySelector("form");

const library = [
	{
		id: "3403cc51-e940-492d-a7a6-0d6bb2d4aa0f",
		title: "The Hobbit",
		author: "J.R.R. Tolkien",
		hasRead: true,
	},
	{
		id: "4044185a-d8bf-4256-9236-243c81bbbcb2",
		title: "The Hitchhiker's Guide to the Galaxy",
		author: "Douglas Adams",
		hasRead: true,
	},
	{
		id: "668e6a3e-d9aa-46a4-8b6a-2fed19cac748",
		title: "Charlie and the Great Glass Elevator",
		author: "Roald Dahl",
		hasRead: false,
	},
];

function Book(title, author, hasRead) {
	if (!new.target) {
		throw Error('Must use "new" keyword.');
	}

	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.hasRead = hasRead;
}

function addBookToLibrary(title, author, hasRead) {
	const newBook = new Book(title, author, hasRead);
	library.push(newBook);
}

function displayBooks() {
	main.innerHTML = "";

	library.forEach((book) => {
		const newBook = bookTemplate.content.cloneNode(true);
		newBook.querySelector("article").dataset.id = book.id;
		newBook.querySelector("h2").textContent = book.title;
		newBook.querySelector("h3").textContent = book.author;
		if (book.hasRead) {
			const readButton = newBook.querySelector("button");
			readButton.dataset.hasRead = true;
			readButton.textContent = "Read";
		}

		newBook.querySelector(".readButton").addEventListener("click", (event) => {
			if (event.target.dataset.hasRead === "true") {
				event.target.dataset.hasRead = false;
				event.target.textContent = "Not Read";
				const currentBook = library.find(
					(book) => book.id === event.target.closest("article").dataset.id,
				);
				currentBook.hasRead = false;
			} else {
				event.target.dataset.hasRead = true;
				event.target.textContent = "Read";
				const currentBook = library.find(
					(book) => book.id === event.target.closest("article").dataset.id,
				);
				currentBook.hasRead = true;
			}
		});

		newBook.querySelector(".deleteBook").addEventListener("click", (event) => {
			const currentArticle = event.target.closest("article");

			library.forEach((book, i) => {
				if (book.id === currentArticle.dataset.id) {
					library.splice(i, 1);
					return;
				}
			});

			currentArticle.remove();
		});

		main.append(newBook);
	});

	const addBook = addBookTemplate.content.cloneNode(true);
	main.append(addBook);

	const addBookElement = document.getElementById("addBook");

	addBookElement.addEventListener("click", () => {
		addBookDialog.showModal();
	});

	addBookElement.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			addBookDialog.showModal();
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	displayBooks();

	addBookForm.addEventListener("submit", (event) => {
		if (newBookInput.title.value === "" && newBookInput.author.value === "") {
			formError.textContent = "Please fill out all fields";
			event.preventDefault();
			return;
		}
		if (newBookInput.title.value === "") {
			formError.textContent = "Please enter a title";
			event.preventDefault();
			return;
		}
		if (newBookInput.author.value === "") {
			formError.textContent = "Please enter an author";
			event.preventDefault();
			return;
		}

		addBookToLibrary(
			newBookInput.title.value,
			newBookInput.author.value,
			false,
		);

		const newBookObject = library.at(-1);

		const newBook = bookTemplate.content.cloneNode(true);
		newBook.querySelector("article").dataset.id = newBookObject.id;
		newBook.querySelector("h2").textContent = newBookObject.title;
		newBook.querySelector("h3").textContent = newBookObject.author;

		newBook.querySelector(".readButton").addEventListener("click", (event) => {
			if (event.target.dataset.hasRead === "true") {
				event.target.dataset.hasRead = false;
				event.target.textContent = "Not Read";
				const currentBook = library.find(
					(book) => book.id === event.target.closest("article").dataset.id,
				);
				currentBook.hasRead = false;
			} else {
				event.target.dataset.hasRead = true;
				event.target.textContent = "Read";
				const currentBook = library.find(
					(book) => book.id === event.target.closest("article").dataset.id,
				);
				currentBook.hasRead = true;
			}
		});

		newBook.querySelector(".deleteBook").addEventListener("click", (event) => {
			const currentArticle = event.target.closest("article");

			library.forEach((book, i) => {
				if (book.id === currentArticle.dataset.id) {
					library.splice(i, 1);
					return;
				}
			});

			currentArticle.remove();
		});

		main.insertBefore(newBook, document.getElementById("addBook"));

		newBookInput.title.value = "";
		newBookInput.author.value = "";
		formError.textContent = "";
		addBookForm.reset();

		// displayBooks();
		// TODO: change this so it adds the book instead of re rendering everything
	});

	newBookInput.title.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			newBookInput.author.focus();
		}
	});

	closeModalButton.addEventListener("click", () => {
		addBookDialog.close();
	});

	addBookDialog.addEventListener("close", () => {
		if (newBookInput.title.value === "" && newBookInput.author.value === "") {
			addBookForm.reset();
			formError.textContent = "";
		}
	});
});
