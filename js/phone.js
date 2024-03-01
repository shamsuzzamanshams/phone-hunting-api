const loadPhone = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones,isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    // clear website

    phoneContainer.textContent='';
    // display show all container if there are more then 12 phone
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all',isShowAll);
    // display only first 12 phone if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
    // add card

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggoleLoadingSpinner(false);
}



//search phone 
const handelSearch = (isShowAll) =>{
    toggoleLoadingSpinner(true)
    const searchfield = document.getElementById('searchfield');
    const searchText = searchfield.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

// loading-spinner

const toggoleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handel show all

const handelShowAll =() =>{
    handelSearch(true);
}

// handel show details
const handelShowDetails = async (id) =>{
    // console.log('show details',id);
    // load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone);
}

// show the modal
const showPhoneDetails = (phone) =>{
    console.log(phone);

    // for name
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerHTML=phone.name;

    // for details
    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML= `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS Available'}</p>
    `

    // show modal
    show_details_modal.showModal();
}

loadPhone();