const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhone(phones);
}

const displayPhone = phones => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    // clear website

    phoneContainer.textContent='';
    // display show all container if there are more then 12 phone
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // display only first 12 phone
    phones = phones.slice(0,12);
    
    // add card

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
}

//search phone 
const handelSearch = () =>{
    const searchfield = document.getElementById('searchfield');
    const searchText = searchfield.value;
    console.log(searchText);
    loadPhone(searchText);
}

// loadPhone();