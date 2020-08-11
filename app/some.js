class SomeTimes {
    constructor() {
        this.elemPincodeContainer = document.querySelector('.pincode-cont');

        this.initSometimes()
    }

    initSometimes() {
        this.elemPincodeContainer.addEventListener('click', this.onPincodeSubmit);
        this.elemPincodeContainer.addEventListener('click', this.onPincodeSubmit);
        this.elemPincodeContainer.addEventListener('click', this.onPincodeSubmit);
        this.elemPincodeContainer.addEventListener('click', this.onPincodeSubmit);
        this.elemPincodeContainer.addEventListener('click', this.onPincodeSubmit);

    }

    onPincodeSubmit() {

    }
}

const someTimes = () => {
    const elemPincodeContainer = document.querySelector('.pincode-cont');
    
    return {
        init: function() {
            return
        }
    }
}

someTimes.init();
class SomeTimes {
    getCartProducts(); // put it in some loaded method.
			var finalRes = {};
			var actualRes = {};
			var pincodesArr = [];

			function handlePincodeChange (event) {
				event && event.preventDefault();
				const pincode = document.querySelector('.pincode').value;
				console.log('pincode', pincode, actualRes);

				const focusEl = document.querySelector('.pincode-dropdown');
				focusEl.classList.remove('show');
				
				if(pincode.length === 6 && !event.target.value) {
					
					
					pincodesArr.push(pincode);
					// localStorage.setItem('pincodes', JSON.stringify(pincodesArr));
				}
				console.log(pincodesArr);

				let unavailable = {};
				actualRes.map(item => {
					const arr = item.availability.unavailable_pincodes;
					arr.map(unavailablePincode => {
						if (pincode === unavailablePincode) {
							unavailable[item.product_id] = true;
						} else {
							unavailable[item.product_id] = false;
						}
					});
				});

				unavailable && Object.keys(unavailable).map(pid => {
					const el = document.getElementById(pid);
					if (el && unavailable[pid]){
						el.textContent = `Currently Out Of stock for ${pincode}`;
						el.classList.add('unavailable');
					} else {
						el.textContent = '';
						el.classList.remove('unavailable');
					}
				});
			}

			function changePincode () {
				const pincode = document.querySelector('.pincode');
				pincode.value = '';
				pincode.focus();
			}

			function handlePincodeFocus () {
				const focusEl = document.querySelector('.pincode-dropdown');
				focusEl.classList.add('show');
					let pinEls;

					if (pincodesArr.length > 0) {
						pincodesArr.map(pin => {
						pinEls += `<li>${pin}</li>`
					});
					focusEl.innerHTML = `<ul>${pinEls}</ul>`;
					}
					
			}

			function getCartProducts () {
				const url = 'https://flipkart-mock-cart.now.sh/';
				fetch(url).then(
					res => res.json()
				).then(json => {
					console.log('json', json);
					actualRes = json;
					loadProducts(json);
					renderPriceSummary();
				})
			}

			function loadProducts(json) {

				json && json.map(item => {
					renderProduct(item);
				})
			}

			function renderProduct(item) {
				const summary = item.product_meta;
				const pricing = item.pricing;
				const availability = item.availability;
				const purchaseInfo = item.purchase_instructions;
				const pid = item.product_id;
				const maxLimit = purchaseInfo.max_purchase_limit;

				
				// constructing final response.
				finalRes = { ...finalRes,
					[pid] : {
						sp: pricing.selling_price,
						quantity: 1,
						deliveryCharge: pricing.delivery_charge,
						saving: pricing.mrp - pricing.selling_price
					}
				};

				const containerEl = document.querySelector('.items');

				const containerDiv = document.createElement('div');
				containerDiv.className = 'item';
				containerEl.appendChild(containerDiv);

				const summaryDiv = document.createElement('div');
				summaryDiv.className = 'sum-cont';
				containerDiv.appendChild(summaryDiv);

				renderImage(summary, summaryDiv, pid, maxLimit);
				renderSummary(summary, pricing, summaryDiv);
				renderDeliveryInfo(pricing, containerDiv, pid);
			}

			function renderDeliveryInfo(pricing, parent, pid) {
				const deliveryCharge = pricing && pricing.delivery_charge;
				// if (!deliveryCharge) {
				// 	return;
				// }
				const divParentEl = document.createElement('div');
				divParentEl.className = 'dlvry-cls';

				const divEl = document.createElement('div');
				divEl.innerHTML = deliveryCharge ? `Delivery Charge: &#8377;${deliveryCharge}` : '';
				const unavailableDivEl = document.createElement('div');
				unavailableDivEl.id = pid;
				unavailableDivEl.className = 'hide-unavailable';

				divParentEl.appendChild(divEl);
				divParentEl.appendChild(unavailableDivEl);
				parent.appendChild(divParentEl);
				
			}

			function renderSummary(summary, pricing, parent) {
				const title = summary.title;
				const mrp = pricing && pricing.mrp;
				const sellingPrice = pricing && pricing.selling_price;

				const contEl = document.createElement('div');
				const titleEl = document.createElement('div');
				const priceEl = document.createElement('div');

				titleEl.textContent = title;
				titleEl.className = 'title';

				const spEl = document.createElement('span');
				spEl.textContent = sellingPrice.toLocaleString('en-IN');
				spEl.className = 'sp';

				const mrpEl = document.createElement('span');
				mrpEl.textContent = mrp.toLocaleString('en-IN'); // striked out
				mrpEl.className = 'mrp';

				const discountEl = document.createElement('span');
				const discount = ((mrp - sellingPrice) / mrp) * 100;
				discountEl.textContent = `${Math.round(discount)}% off`;
				discountEl.className = 'discount';

				priceEl.appendChild(spEl);
				priceEl.appendChild(mrpEl);
				priceEl.appendChild(discountEl);
				
				contEl.className = 'summary-cls';
				contEl.appendChild(titleEl);
				contEl.appendChild(priceEl);

				parent.appendChild(contEl);
			}

			function renderImage(summary, parent, pid, maxLimit) {
				const img = summary.img;
				const divEl = document.createElement('div');
				const imgEl = document.createElement('img');
				imgEl.src = img;
				divEl.className = 'img-cls';
				divEl.appendChild(imgEl);

				renderCounter(divEl, pid, maxLimit);

				parent.appendChild(divEl);
			}

			function renderCounter(parent, pid, maxLimit) {
				const input = document.createElement('input');
				input.maxLength = '1';
				input.value = 1; 
				input.className = "input";

				const decEl = document.createElement('button');
				decEl.onclick = removeItem(pid, input);


				const incEl = document.createElement('button');
				incEl.onclick = addItem(pid, input, maxLimit);

				decEl.textContent = '-';
				incEl.textContent = '+';

				const divEl = document.createElement('div');

				divEl.appendChild(decEl);
				divEl.appendChild(input);
				divEl.appendChild(incEl);

				parent.appendChild(divEl);
				console.log('final', finalRes);
			}

			function addItem (pid, input, maxLimit) {
				const toast = document.querySelector('.toast');
				return event => {
					console.log(pid, maxLimit);
					if (finalRes[pid].quantity < maxLimit) {
						finalRes[pid].quantity = finalRes[pid].quantity + 1;
						input.value = finalRes[pid].quantity;
						updatePriceSummary();
						console.log(finalRes, pid);
					} else {
						toast.classList.add('show-toast');
						const toastId = setTimeout(hideToast, 3000);
						console.log('timerId', toastId);
					}
					
				}
			}

			function hideToast () {
				const toast = document.querySelector('.toast');
				toast.classList.remove('show-toast');
			}

			function removeItem (pid, input) {
				return event => {
					console.log(pid);
					if (finalRes[pid].quantity > 1) {
						finalRes[pid].quantity = finalRes[pid].quantity - 1;
						input.value = finalRes[pid].quantity;
					}
					updatePriceSummary();
					console.log(finalRes, pid);
				}
			}

			function renderPriceSummary () {
				const priceCont = document.querySelector('.summary');

				const itemQuantity = getQuantity();
				const finalItemPrice = getFinalItemPrice();
				const deliveryCharge = getDeliveryCharge();
				const amountPayable = finalItemPrice + deliveryCharge;

				// price of items
				const priceDiv = document.createElement('div');
				const itemPriceEl = document.createElement('div');
				itemPriceEl.textContent = `Price (${itemQuantity} items)`;
				itemPriceEl.id = 'quantity';

				const rupeesDiv = document.createElement('div');
				rupeesDiv.innerHTML = `&#8377;${finalItemPrice.toLocaleString('en-IN')}`;
				rupeesDiv.id = 'quantityRs';
				
				priceDiv.appendChild(itemPriceEl);
				priceDiv.appendChild(rupeesDiv);
				priceDiv.className = 'final-price';

				// delivery of items
				const deliveryEl = document.createElement('div');
				const chargeEl = document.createElement('div');
				chargeEl.textContent = 'Delivery charge'

				const rupeesEl = document.createElement('div');
				rupeesEl.innerHTML = `&#8377;${deliveryCharge.toLocaleString('en-IN')}`;
				rupeesEl.id = 'deliveryRs';
				
				deliveryEl.appendChild(chargeEl);
				deliveryEl.appendChild(rupeesEl);
				deliveryEl.className = 'final-price';
				deliveryEl.classList.add('border-cls');

				// total amount
				const totalEl = document.createElement('div');
				const totalTextEl = document.createElement('div');
				totalTextEl.textContent = 'Amount Payable';

				const totalRupeesEl = document.createElement('div');
				totalRupeesEl.innerHTML = `&#8377;${amountPayable.toLocaleString('en-IN')}`;
				totalRupeesEl.id = 'totalRs';
				
				totalEl.appendChild(totalTextEl);
				totalEl.appendChild(totalRupeesEl);
				totalEl.className = 'final-price';

				// saved amount
				const savedEl = document.createElement('div');
				savedEl.innerHTML = `Your total savings on this order &#8377;${getSavedAmount().toLocaleString('en-IN')}`;
				savedEl.className = 'saved';
				savedEl.id = 'savedRs'
				
				priceCont.appendChild(priceDiv);
				priceCont.appendChild(deliveryEl);
				priceCont.appendChild(totalEl);

				priceCont.appendChild(savedEl);
			}

			function getQuantity() {
				let q = 0;
				Object.keys(finalRes).forEach(key => {
					q = q + finalRes[key].quantity;
				});

				return q;
			}

			function getFinalItemPrice() {
				let q = 0;
				Object.keys(finalRes).forEach(key => {
					q = q + (finalRes[key].sp * finalRes[key].quantity);
				});

				return q;
			}
			function getDeliveryCharge() {
				let q = 0;
				Object.keys(finalRes).forEach(key => {
					q = q + finalRes[key].deliveryCharge;
				});

				return q;
			}

			function getSavedAmount() {
				let q = 0;
				Object.keys(finalRes).forEach(key => {
					q = q + (finalRes[key].quantity * finalRes[key].saving);
				});

				return q;
			}

			function updatePriceSummary () {
				const quantity = document.getElementById('quantity');
				const quantityRs = document.getElementById('quantityRs');
				const deliveryRs = document.getElementById('deliveryRs');
				const totalRs = document.getElementById('totalRs');
				const savedRs = document.getElementById('savedRs');

				const itemQuantity = getQuantity();
				const finalItemPrice = getFinalItemPrice();
				const deliveryCharge = getDeliveryCharge();
				const savedAmount = getSavedAmount();
				const amountPayable = finalItemPrice + deliveryCharge;

				quantity.textContent = `Price (${itemQuantity} items)`;
				quantityRs.innerHTML = `&#8377;${finalItemPrice.toLocaleString('en-IN')}`;
				deliveryRs.innerHTML = `&#8377;${deliveryCharge.toLocaleString('en-IN')}`;
				totalRs.innerHTML = `&#8377;${amountPayable.toLocaleString('en-IN')}`;
				savedRs.innerHTML = `Your total savings on this order &#8377;${savedAmount.toLocaleString('en-IN')}`;
			}


}

const some = new SomeTimes();