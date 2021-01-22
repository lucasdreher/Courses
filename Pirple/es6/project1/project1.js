const //get elements
	topContent = document.getElementById('top-content'),
	mainContent = document.getElementById('main-content'),
	//HTML parts
	hLogo = '<h1 class="logo"><span>To</span>do</h1>';

let //Page Description
	hDescription,
	userLoggedIn,
	userFirstName,
	userLastName,
	userEmail,
	userPassword,
	userListCount,
	userCurrentList;

startApp();
// signUpPage();
// homePage();
// dashboardPage();

//localStorage logic
function startApp() {
	const loggedIn = Number(localStorage.getItem('loggedIn'));
	//check if app never started;
	if (loggedIn === 0) {
		homePage();
	} else if (loggedIn > 0) {
		userLoggedIn = Number(localStorage.getItem('loggedIn'));
		userFirstName = localStorage.getItem(`user${userLoggedIn}FirstName`);
		userLastName = localStorage.getItem(`user${userLoggedIn}LastName`);
		userEmail = localStorage.getItem(`user${userLoggedIn}Email`);
		userPassword = localStorage.getItem(`user${userLoggedIn}Password`);
		userListCount = Number(localStorage.getItem(`user${userLoggedIn}ListCount`));
		// console.clear();
		// console.log(userLoggedIn);
		// console.log(userFirstName);
		// console.log(userLastName);
		// console.log(userEmail);
		// console.log(userPassword);
		// console.log(userListCount);
		dashboardPage();
	} else {
		localStorage.clear();
		localStorage.setItem('loggedIn', '0');
		localStorage.setItem('userCount', '0');
		homePage();
	}
}

function signUp() {
	if (validateForm(true)) {
		createUser();
	}
}

function createUser() {
	if (checkUserUnique()) {
		const userID = localStorage.getItem('userCount'),
			userIDName = 'user' + userID;
		localStorage.setItem(`${userIDName}ID`, userID);
		localStorage.setItem(`${userIDName}FirstName`, firstName.value);
		localStorage.setItem(`${userIDName}LastName`, lastName.value);
		localStorage.setItem(`${userIDName}Email`, email.value);
		localStorage.setItem(`${userIDName}Password`, password.value);
		localStorage.setItem(`${userIDName}ListCount`, 0);
		localStorage.setItem('loggedIn', userID);
		startApp();
	}
}

function checkUserUnique() {
	let numUser = Number(localStorage.getItem('userCount'));
	const varEmail = email.value;
	if (numUser < 1) {
		numUser++;
		localStorage.setItem('userCount', numUser);
		return true;
	} else {
		for (let i = 1; i <= numUser; i++) {
			let userEmailVal = localStorage.getItem(`user${i}Email`);
			if (userEmailVal === varEmail) {
				errorMsg(`The email <strong>${varEmail}</strong> already exists. Try another email.`);
				return false;
			}
		}
		numUser++;
		localStorage.setItem('userCount', numUser);
		return true;
	}
}

function validateForm(haveCheckbox) {
	if (firstName.value.length < 3) {
		errorMsg('<strong>First name</strong> must be filled out with at least <strong>3</strong> characters.');
		return false;
	} else if (lastName.value.length < 3) {
		errorMsg('<strong>Last name</strong> must be filled out with at least <strong>3</strong> characters.');
		return false;
	} else if (!validateEmail()) {
		errorMsg('You must enter an <strong>valid email address</strong>.');
		return false;
	} else if (password.value.length < 8) {
		errorMsg('<strong>Password</strong> must be filled out with at least <strong>8</strong> characters.');
		return false;
	} else if (haveCheckbox) {
		if (!terms.checked) {
			errorMsg('You must <strong>agree</strong> with the Terms & Conditions.');
			return false;
		}
		return true;
	} else {
		return true;
	}
}

function validateEmail(mail) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
		return true;
	}
	return false;
}

function errorMsg(msg) {
	message.innerHTML = `<div class="message">${msg}</div>`;
}

function logIn() {
	let numUser = Number(localStorage.getItem('userCount'));
	if (numUser < 1) {
		errorMsg('No user in the system.<br>Please <strong><a href="javascript:signUpPage()">Sign Up</a></strong>.');
		return false;
	} else if (validateFormLogIn()) {
		if (checkUserUnique()) {
			errorMsg('There is no such user in the system.');
			return false;
		} else if (userPasswordMatch()) {
			startApp();
		} else {
			errorMsg('Wrong password.');
		}
	}
}

function userPasswordMatch() {
	let numUser = Number(localStorage.getItem('userCount'));
	const varEmail = email.value,
		varPassword = password.value;
	for (let i = 1; i <= numUser; i++) {
		let userEmailVal = localStorage.getItem(`user${i}Email`),
			userPasswordVal = localStorage.getItem(`user${i}Password`);
		if (userEmailVal === varEmail && varPassword === userPasswordVal) {
			localStorage.setItem('loggedIn', i);
			return true;
		}
	}
	return false;
}

function validateFormLogIn() {
	if (!validateEmail()) {
		errorMsg('You must enter an <strong>valid email address</strong>.');
		return false;
	} else if (password.value.length < 8) {
		errorMsg('<strong>Password</strong> must be filled out with at least <strong>8</strong> characters.');
		return false;
	} else {
		return true;
	}
}

function userAccountSettingsUpdate() {
	if (validateForm(false)) {
		updateUser();
	}
}

function updateUser() {
	if (checkUserUniqueUpdate()) {
		const userIDName = 'user' + userLoggedIn;
		localStorage.setItem(`${userIDName}FirstName`, firstName.value);
		localStorage.setItem(`${userIDName}LastName`, lastName.value);
		localStorage.setItem(`${userIDName}Email`, email.value);
		localStorage.setItem(`${userIDName}Password`, password.value);
		startApp();
	}
}

function checkUserUniqueUpdate() {
	const userIDName = 'user' + userLoggedIn;
	let numUser = Number(localStorage.getItem('userCount'));
	const varEmail = email.value;
	for (let i = 1; i <= numUser; i++) {
		let userEmailVal = localStorage.getItem(`user${i}Email`);
		if (userEmailVal === varEmail && varEmail !== userEmail) {
			errorMsg(`The email <strong>${varEmail}</strong> already exists. Try another email.`);
			return false;
		}
	}
	return true;
}

function validateFormList() {
	if (listName.value.length < 3) {
		errorMsg('<strong>List name</strong> must be filled out with at least <strong>3</strong> characters.');
		return false;
	} else if (listItems.innerHTML.length < 5) {
		errorMsg('The <strong>to-do list</strong> must contain at least <strong>1 item</strong>.');
		return false;
	} else {
		return true;
	}
}

function newList() {
	if (validateFormList()) {
		createList();
	}
}

function createList() {
	if (checkListUnique()) {
		const userIDName = 'user' + userLoggedIn;
		localStorage.setItem(`${userIDName}List${userListCount}Name`, listName.value);
		localStorage.setItem(`${userIDName}List${userListCount}Items`, listItems.innerHTML);
		startApp();
	}
}

function checkListUnique() {
	const varListName = listName.value,
		userIDName = 'user' + userLoggedIn;
	if (userListCount < 1) {
		userListCount++;
		localStorage.setItem(`${userIDName}ListCount`, userListCount);
		return true;
	} else {
		for (let i = 1; i <= userListCount; i++) {
			let listNameVal = localStorage.getItem(`${userIDName}List${i}Name`);
			if (listNameVal === varListName) {
				errorMsg(`The list <strong>${varListName}</strong> already exists. Try another name.`);
				return false;
			}
		}
		userListCount++;
		localStorage.setItem(`${userIDName}ListCount`, userListCount);
		return true;
	}
}

function getNewListItem() {
	listNewItemForm.addEventListener(
		'submit',
		function(e) {
			if (listNewItem.value === '') {
				return false;
			} else {
				e.preventDefault();
				listItems.innerHTML += '<li class="list">' + listNewItem.value + '</li>';
				listNewItem.value = '';
				checkItems();
			}
		},
		false
	);
}

function checkItems() {
	const allLIs = listItems.querySelectorAll('li');
	allLIs.forEach((element) => {
		element.addEventListener('click', function() {
			element.classList.toggle('checked');
		});
	});
}

function userLoadLists() {
	if (userListCount === 0) {
		mainContent.innerHTML = `<div class="empty-message container container-small">
		<h3>No list yet.</h3> Create a <strong><em><a href="javascript:newListPage()">new to-do list</a></em></strong>.
	</div>`;
	} else {
		mainContent.innerHTML = `<section class="lists">
		<div class="container container-small">
			<ul id="listsWrapper" class="lists">
			</ul>
		</div>
	</section>`;
		userCreateListTable();
	}
	function userCreateListTable() {
		const userIDName = 'user' + userLoggedIn;
		for (let i = 1; i <= userListCount; i++) {
			const varListName = localStorage.getItem(`${userIDName}List${i}Name`),
				varListID = `List${i}`;
			listsWrapper.innerHTML += `<li id="${varListID}" class="list opacity-0">${varListName}</li>`;
			varListElement = listsWrapper.querySelector('#' + varListID);
		}
		for (let i = 1; i <= userListCount; i++) {
			setTimeout(() => {
				const varListID = `List${i}`;
				varListElement = listsWrapper.querySelector('#' + varListID);
				varListElement.classList.remove('opacity-0');
			}, 50 * i);
		}
		const allLIs = listsWrapper.querySelectorAll('li');
		allLIs.forEach((element) => {
			element.addEventListener('click', function() {
				// element.classList.toggle('checked');
				userCurrentList = `user${userLoggedIn}${element.id}`;
				console.log(element.id);
				console.log(userCurrentList);
				loadList(userCurrentList);
			});
		});
	}

	function loadList(l) {
		thisListPage();
		const varPageTitle = localStorage.getItem(`${l}Name`),
			varListItems = localStorage.getItem(`${l}Items`);
		//header changes
		pageTitle.innerText = varPageTitle;
		breadcrumbs.innerHTML += bcConstructor(varPageTitle);
		console.log(varListItems);
		//set values to input
		listName.value = varPageTitle;
		listItems.innerHTML = varListItems;
		//Bind functions to items
		checkItems();
		//Bind functions to input
		getNewListItem();
	}

	// function openList() {
	// 	const allLIs = listsWrapper.querySelectorAll('li');
	// 	allLIs.forEach((element) => {
	// 		element.addEventListener('click', function() {
	// 			// element.classList.toggle('checked');
	// 			console.log(element.id);
	// 		});
	// 	});
	// }
}

function updateList() {
	if (validateFormList()) {
		updateListDB();
	}
}

function updateListDB() {
	if (checkListUniqueUpdate()) {
		const userIDName = 'user' + userLoggedIn;
		localStorage.setItem(`${userCurrentList}Name`, listName.value);
		localStorage.setItem(`${userCurrentList}Items`, listItems.innerHTML);
		startApp();
	}
}

function checkListUniqueUpdate() {
	const varListName = listName.value,
		userIDName = 'user' + userLoggedIn,
		thisListName = pageTitle.innerText;
	for (let i = 1; i <= userListCount; i++) {
		let listNameVal = localStorage.getItem(`${userIDName}List${i}Name`);
		if (listNameVal === varListName && varListName !== thisListName) {
			errorMsg(`The list <strong>${varListName}</strong> already exists. Try another name.`);
			return false;
		}
	}
	return true;
}

//pages-----------------------------------------

function contentBox(content) {
	topContent.innerHTML = '';
	mainContent.innerHTML = `
		<main class="full content-center">
			<div class="wrapper">
				${hLogo}
				<h2 class="description">${hDescription}</h2>
				${content}
			</div>
		</main>
		`;
}

function homePage() {
	//Page Description
	hDescription = 'Single Page Application to-do list.';
	const //Page content
	homePage = `
		<div class="button-wrapper home sign">
			${btnConstructor('btnSignUp', 'btn-main', 'Sign Up')}
			${btnConstructor('btnLogIn', 'ghost', 'Log In')}
		</div>`;
	contentBox(homePage);
	//Bind functions to buttons
	btnSignUp.addEventListener('click', signUpPage);
	btnLogIn.addEventListener('click', logInPage);
}

function signUpPage() {
	//Page Description
	hDescription = `Already have an account?<br><a href="javascript:logInPage()">Click here to Log In.</a>`;
	const //Page content
	signUpPage = `
		<form id="formSignUp" class="sign-up" action="#">
			<div id="message"></div>
			${formConstructor('Sign Up', true)}
			<input type="checkbox" name="terms" id="terms"></input>
			<label for="terms">I Agree Terms & Conditions</label>
			<div class="button-wrapper sign">
				${btnConstructor('btnSignUp', 'btn-main', 'Sign Up')}
				${btnConstructor('btnLogOut', 'ghost', 'Cancel')}	
			</div>
		</form>`;
	contentBox(signUpPage);
	//Bind functions to buttons
	btnSystemSignUp();
	btnLogOutHome();
}
function logInPage() {
	//Page Description
	hDescription = `Don't have an account?<br><a href="javascript:signUpPage()">Click here to Sign Up.</a>`;
	const //Page content
	signUpPage = `
		<form id="formLogIn" class="sign-up" action="#">
			<div id="message"></div>
			${formConstructor('Log In', false)}
			<div class="button-wrapper sign">
				${btnConstructor('btnLogIn', 'btn-main', 'Log In')}
				${btnConstructor('btnLogOut', 'ghost', 'Cancel')}	
			</div>
		</form>`;
	contentBox(signUpPage);
	//Bind functions to buttons
	btnSystemLogIn();
	btnLogOutHome();
}

function dashboardPage() {
	let userName = `${userFirstName} ${userLastName[0]}.`;
	userCurrentList = '';
	topContent.innerHTML = `<nav>
		<div class="container">
			<h1 class="logo">
				<span>To</span>do
			</h1>
			<div class="scope">
				<span class="user">${userName}</span>
				<span id="breadcrumbs"></span>
			</div>
			<div class="button-wrapper log">
			${btnConstructor('btnAccountSettings', 'btn-small', 'Account Settings')}
			${btnConstructor('btnLogOut', 'btn-small', 'Log Out')}	
			</div>
		</div>
	</nav>
	<header class="page-header">
		<div class="container  container-small">
			<div class="page-header-bg"></div>
			<h2 id="pageTitle"></h2>
			<div id="controllers">
			</div>
		</div>
	</header>`;

	//page specifics
	pageTitle.innerText = 'Dashboard';
	breadcrumbs.innerHTML = bcConstructor('All Lists');
	controllers.innerHTML = btnConstructor('btnNewList', 'btn-main', 'New List');
	//load lists
	userLoadLists();

	//Bind functions to buttons
	btnAccountSettings.addEventListener('click', (event) => {
		event.preventDefault();
		userAccountSettings();
	});
	btnLogOutHome();
	btnNewList.addEventListener('click', (event) => {
		event.preventDefault();
		newListPage();
	});
}

function newListPage() {
	//header changes
	pageTitle.innerText = 'New List';
	breadcrumbs.innerHTML += bcConstructor('List Name');
	controllers.innerHTML =
		btnConstructor('btnCreateList', 'btn-main', 'Create List') + btnConstructor('btnCancel', 'ghost', 'Cancel');
	//main content
	listPageConstructor();
	//Bind functions to input
	getNewListItem();
	//Bind functions to buttons
	btnCreateList.addEventListener('click', newList);
	btnDashboardCancel();
}

function thisListPage() {
	controllers.innerHTML =
		btnConstructor('btnUpdateList', 'btn-main', 'Update') + btnConstructor('btnCancel', 'ghost', 'Cancel');
	//main content
	listPageConstructor();
	//Bind functions to buttons
	btnUpdateList.addEventListener('click', updateList);
	btnDashboardCancel();
}

function userAccountSettings() {
	//header changes
	pageTitle.innerText = 'Account Settings';
	breadcrumbs.innerHTML = bcConstructor('Account Settings');
	controllers.innerHTML =
		btnConstructor('btnUpdate', 'btn-main', 'Update') + btnConstructor('btnCancel', 'ghost', 'Cancel');
	//main content

	mainContent.innerHTML = `<section>
	<div class="container container-small">
	<div id="message"></div>
		<form id="accountSettings" class="account-settings" action="#">
		${formConstructor('', true)}
		</form>
	</div>
</section>`;

	//set values to input
	firstName.value = userFirstName;
	lastName.value = userLastName;
	email.value = userEmail;
	password.value = userPassword;

	//Bind functions to buttons
	btnUpdate.addEventListener('click', (event) => {
		event.preventDefault();
		userAccountSettingsUpdate();
	});
	btnDashboardCancel();
}

//buttons
function btnDashboardCancel() {
	btnCancel.addEventListener('click', (event) => {
		event.preventDefault();
		dashboardPage();
	});
}
function btnLogOutHome() {
	btnLogOut.addEventListener('click', (event) => {
		event.preventDefault();
		localStorage.setItem('loggedIn', '0');
		startApp();
	});
}

function btnSystemSignUp() {
	btnSignUp.addEventListener('click', (event) => {
		event.preventDefault();
		signUp();
	});
}
function btnSystemLogIn() {
	btnLogIn.addEventListener('click', (event) => {
		event.preventDefault();
		logIn();
	});
}

//Constructors

function bcConstructor(bcName) {
	return `<span class="breadcrumb-item">${bcName}</span>`;
}

function btnConstructor(btnId = '', btnClass = 'ghost', btnText = 'Text here') {
	return '<button id="' + btnId + '"class="' + btnClass + '">' + btnText + '</button>';
}

function formConstructor(formName, hasNameInput) {
	let formTitle;
	function nameInput() {
		if (hasNameInput) {
			return (
				'<div class="name">' +
				'<input type="text" name="firstName" id="firstName" placeholder="First name" maxlength="20" />' +
				'<input type="text" name="lastName" id="lastName" placeholder="Last name"/>' +
				'</div>'
			);
		} else {
			return '';
		}
	}
	if (formName === '') {
		formTitle = '';
	} else {
		formTitle = `<h2>${formName}</h2>`;
	}
	const form =
		formTitle +
		nameInput() +
		'<input type="email" name="email" id="email" placeholder="Email" />' +
		'<input type="password" name="password" id="password" placeholder="Password" />';
	return form;
}

function listPageConstructor() {
	mainContent.innerHTML = `<section>
	<div class="container container-small">
	<div id="message"></div>
		<div class="list-content">
			<div class="list-input">
				<label for="listName">List name</label>
				<input id="listName" type="text" placeholder="List name" maxlength="15">
				<form id="listNewItemForm" action="#">
					<label for="listNewItem">New to-do item</label>
					<input id="listNewItem" type="text" placeholder="New to-do item. To ADD, write it and press ENTER.">
				</form>
			</div>
			<ul id="listItems">
			</ul>
		</div>
	</div>
</section>`;
}
