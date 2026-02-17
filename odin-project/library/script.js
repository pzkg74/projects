const bookTemplate = document.getElementById("bookTemplate");
const addBookTemplate = document.getElementById("addBookTemplate");
const main = document.querySelector("main");
const readButtons = document.querySelectorAll(".readButtons");
const addBookDialog = document.getElementById("addBookDialog");

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

document.addEventListener("DOMContentLoaded", () => {
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
});
