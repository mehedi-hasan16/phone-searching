const loadingSpinner = document.getElementById('loading-spinner');
const loadPhoneData = (searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayPhone(data.data, dataLimit));
}

const displayPhone = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML='';
    const seeMoreBtn = document.getElementById('seemore-btn');
    if (dataLimit && phones.length>10){
        phones = phones.slice(0, 10);
        seeMoreBtn.classList.remove('d-none');
    }else{
        seeMoreBtn.classList.add('d-none');
    }
    //no phone found
    const notAvailable = document.getElementById('not-available');
    if(phones.length === 0){
        notAvailable.classList.remove('d-none');
        loadingSpinner.classList.add('d-none')   
    } else{
        notAvailable.classList.add('d-none');
    }
    phones.forEach(phone=>{
        const {phone_name, image, slug} =phone;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div class="card p-3">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="showPhoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
        loadingSpinner.classList.add('d-none')        
    })
}
//process phone data limit 
 const processDataPhoneLimit = (dataLimit) =>{
    loadingSpinner.classList.remove('d-none');
    loadPhoneData(textField.value, dataLimit);
    console.log(textField.value, dataLimit);
 }

// searching function 
const textField = document.getElementById('text-field');
document.getElementById('search-btn').addEventListener('click',function(){
    processDataPhoneLimit(10);
})

// enter button function 
document.getElementById('text-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processDataPhoneLimit(10);
    }
});
//see more btn
document.getElementById('seemore-btn').addEventListener('click',function(){
    processDataPhoneLimit();
})

const showPhoneDetails =(phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const {name,releaseDate}=data.data;
        const {memory,displaySize,chipSet}=data.data.mainFeatures;
        const exampleModalLabel = document.getElementById('exampleModalLabel').innerText=name;
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML='';
        const div = document.createElement('div');
        div.innerHTML=`
                 <div>
                    <p>Display: ${displaySize}</p>
                    <p>Chipset: ${chipSet}</p>
                    <p>Memory: ${memory}</p>
                    <p>Release Date: ${releaseDate ? releaseDate : 'not available date'}</p>
                </div>
        `;
        modalBody.appendChild(div);
    })
}
