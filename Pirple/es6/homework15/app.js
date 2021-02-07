const mainContent = document.getElementById('main');
const btnRefreshData = document.getElementById('refreshData');
const btnFetchData = document.getElementById('fetchData');

// btnRefreshData.addEventListener('click', refreshContent);
btnFetchData.addEventListener('click', getContent);

const //set constants
	url =
		'https://api.thenewsapi.com/v1/news/top' +
		'?api_token=w8ShtFDOCYHJame67en32wKBMBaUdtMpb5f1D6ql' +
		'&locale=nl' +
		'&limit=3',
	req = new Request(url);

// function refreshContent() {}

function getContent() {
	fetch(req)
		.then(function(response) {
			return response.json();
		})
		.then((c) => populateContent(c.data))
		.catch((err) => alert("Sorry, we couldn't access the API"));
}

function populateContent(contentArray) {
	mainContent.innerHTML = '';
	btnFetchData.innerText = 'Refresh Data';
	for (const prop of contentArray) {
		buildContent(prop);
	}
}

function buildContent(contentObj) {
	const { image_url, description, title, snippet, url, categories, published_at, source } = contentObj;
	const contentArticle = `
	<article class='article'>
		<img src="${image_url}" alt="${description}">
		<a href="${url}"><h2>${title}</h2></a>
		<p>
			${snippet}
		</p>
		<footer>
			<div class="categories">${categories}</div>
			<div class="footer-bottom">
				<div class="date">${published_at}</div>
				<div class="source">${source}</div>
			</div>
		</footer>
	</article>
`;
	mainContent.insertAdjacentHTML('beforeend', contentArticle);
}
