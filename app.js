const createLi = (customer)=>{  
    if(customer.error){
        return handleError(customer.error)
    }
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

const handleError = (error)=>{
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

const customerList= document.getElementById('customer-list');
fetch('/api/customers')
    .then(result => result.json())
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
        .then(result => result.json())
        .then(customer => {
            console.log(customer)
            customerList.appendChild(createLi(customer));
        })
        .catch(error => console.log(error))
})