/**
 *
 * @param {string} xmlFile
 * @returns HTMLCollection
 */

function getMovies(xmlFile) {
	const xhr = new XMLHttpRequest();

	xhr.open('GET', xmlFile, false);
	xhr.send();

	if (xhr.status !== 200) {
		throw new Error('error loading file');
	}

	const xmlDoc = xhr.responseXML;
	return xmlDoc.getElementsByTagName('movie');
}

/**
 *
 * @param {string} query
 * @returns array
 */

function search(event) {
	const table = document.querySelector('#movies-container');
	const tr = table.getElementsByTagName('tr');

	let inputText = event.target.value;
	let filter = inputText.toUpperCase();
	let td;
	let cell;
	let i;
	let j;

	for (i = 1; i < tr.length; i++) {
		tr[i].style.display = 'none';

		td = tr[i].getElementsByTagName('td');
		for (j = 0; j < td.length; j++) {
			cell = tr[i].getElementsByTagName('td')[j];
			if (cell) {
				if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = '';
					break;
				}
			}
		}
	}
}

const moviesContainer = document.querySelector('#movies-container tbody');
const searchButton = document.querySelector('#search');

const movies = getMovies('movies.xml');

Array.from(movies).forEach((movie) => {
	let movieCode = movie.children[0].textContent;
	let title = movie.children[1].textContent;

	moviesContainer.innerHTML += `
    <tr>
      <td>${movieCode}</td>
      <td>${title}</td>
    </tr>
  `;
});

searchButton.addEventListener('input', search);
