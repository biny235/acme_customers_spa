const createLi = (customer)=>{  
    const li = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "&times"
    removeBtn.classList.add('btn', 'btn-danger','close')
    li.classList.add('list-group-item','fade', 'show','d-flex','justify-content-between','align-items-center')
    li.append(customer.email, removeBtn);
    removeBtn.addEventListener("click", ()=>{
        li.classList.remove('show')
        fetch(`/api/customers/${customer.id}`,{
            method: 'delete'
        })
        setTimeout(()=>{
            li.remove()
        },200)
    })
    return li
};

const postError = (error)=>{
    message = document.getElementById('message');
    message.innerHTML = error;
    message.classList.add('alert','alert-danger', 'alert-dismissible','fade','show')
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('close');
    removeBtn.innerHTML = '&times';
    message.append(removeBtn)
    removeBtn.addEventListener('click', ()=>{
        message.classList.remove('show')
        setTimeout(()=>{
            message.innerHTML = ''
        }, 200)
    })
}

function handleErrors(response) {
    if (!response.ok) {
        return response.json()
            .then(res => {
                console.log(res.err.errors[0].message)
                postError(res.err.errors[0].message)
                throw Error(res.err.errors[0].message)
                })       
    }
    return response.json();
}

const customerList= document.getElementById('customer-list');
fetch('/api/customers')
    .then(handleErrors)
    .then(customers => {        
        customers.forEach(customer => {
            customerList.appendChild(createLi(customer));
        });
    })
    .catch(error => console.log(error))

const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', ()=>{
    const email = document.getElementById('email').value
    console.log(email)   
    fetch('/api/customers',{
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 
            'Content-Type': 'application/json' 
        },        
        })
        .then(handleErrors)
        .then(customer => {
            console.log(customer)
            customerList.appendChild(createLi(customer));
        })
        .catch(error => console.log(error))
})