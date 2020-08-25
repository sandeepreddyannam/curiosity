
function fetchData(url) {
	return fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			return json;
		});
}

render();

function render() {
	const url = "https://flipkart-configuration-table.now.sh/api";

	fetchData(url).then(res => {
		const responseMock = res.config;
		// Table
		const fieldKeys = renderTables(responseMock);

		// Search listeners.
		const searchEl = document.querySelector('.search');
		searchEl.addEventListener('input', (event) => {handleSearch(responseMock, fieldKeys, event)} );
	
		const showChkboxEl = document.querySelector('.show-select');
		showChkboxEl.addEventListener('change', (event) => {
			handleSelectChange(fieldKeys, event);
		})
	
		renderDoneButton(fieldKeys);
	})
	
}

function renderTables(responseMock) {
	const bodyEl = document.querySelector('.table-body');
	const fieldKeys = [];
	const searchFields = [];

	responseMock.map(item => {
		const {key, label, field, description, selected} = item;
		fieldKeys.push(key);
		searchFields.push(label);

		// TODO: try with innnerHTML.
		// const $ = document.querySelector.bind(document); $('#container');
		// 'beforebegin'
		// insertAdjacentElement

		const trEl = document.createElement('tr');

		// label
		const lableTd = document.createElement('td');

		const checkboxEl = createCheckBox(selected, key);

		const lableEl = document.createElement('label');

		const labDiv = document.createElement('div');
		labDiv.textContent = label;
		lableEl.appendChild(checkboxEl);
		lableEl.appendChild(labDiv);
		lableEl.setAttribute('class', 'row');

		lableTd.appendChild(lableEl);

		// input fields
		const inputTd = document.createElement('td');
		const inputBox = getInputBox(field, key, selected);
		inputTd.appendChild(inputBox);

		// description
		const descTd = document.createElement('td');
		descTd.textContent = description;

		trEl.appendChild(lableTd);
		trEl.appendChild(inputTd);
		trEl.appendChild(descTd);

		bodyEl.appendChild(trEl);
		
	});

	return fieldKeys;

}

function handleSelectChange(fieldKeys, event) {
		fieldKeys.map(key => {
			const el = document.getElementById(key);
			const flag = el.dataset['selected'];
	
			if (event.target.checked) {
				if(flag === 'false') {
					el.closest('tr').classList.add('hide');
				} 
			} else {
				el.closest('tr').classList.remove('hide');
			}
			
		});

}

function handleSearch(responseMock, fieldKeys, event) {
	const searchText = event.target.value;
	
	if(searchText) {
		// Hide all elements if something is present in search.
		fieldKeys.map(key => {
			const fieldEl = document.getElementById(key);
			fieldEl.closest('tr').classList.add('hide');
		});
	} 
		
	const result = responseMock.reduce((acc, curr, index) => {
		const currLabel = curr.label.toLowerCase();
		const desription = curr.description.toLowerCase();

		if(currLabel.indexOf(searchText) > -1 || desription.indexOf(searchText) > -1 ) {
			acc.push(curr.key);
		}
		return acc;
	}, []);

	result && result.map(key => {
		const el = document.getElementById(key);
		el.closest('tr').classList.remove('hide');
	});
}

function renderDoneButton(fieldKeys) {
	const containerEl = document.querySelector('.container');
	const divEl = document.createElement('div');
	divEl.className ='btn-container';

	const btnEl = document.createElement('button');
	btnEl.textContent = 'Done';
	btnEl.className ='done';
	btnEl.addEventListener('click', event => {
		getResultJson(fieldKeys, event);
	});
	divEl.appendChild(btnEl);
	containerEl.appendChild(divEl);
}

function getResultJson(fieldKeys, _event) {
	const res = {};

	fieldKeys.map(key => {
		const el = document.getElementById(key);
		Object.assign(res, {[key]: el.value})
	});
	console.log('**** RESULT *****', res);
}


function getInputBox(field, key, selected) {
	const { defaultValue, type, options } = field;

	switch (type) {
		case 'select':
			const selectEl = document.createElement('select');
			selectEl.disabled = !selected;
			selectEl.name = 'select-option';
			selectEl.id = key;
			selectEl.dataset['selected'] = selected;
			selectEl.innerHTML = `${options.map(item => { return `<option value='${item}' selected='${item === defaultValue}'>${item}</option>`})}`
			return selectEl;
		default:
			const inputEl = document.createElement('input');
			inputEl.value = defaultValue;
			inputEl.disabled = !selected;
			inputEl.id = key;
			inputEl.dataset['selected'] = selected;
			return inputEl;
	}
}

function createCheckBox(selected, key) {
	const inputEl = document.createElement('input');
	inputEl.type = 'checkbox';
	
	if(selected) {
		inputEl.checked = selected;
	}
	
	inputEl.addEventListener('change', (ev) => {
		const userInputEl = document.getElementById(key);
		
		if(!event.target.checked) {
			userInputEl.disabled = true;
			userInputEl.dataset['selected'] = false;
		} else {
			userInputEl.disabled = false;
			userInputEl.dataset['selected'] = true;
		}

	});
	return inputEl;
}

