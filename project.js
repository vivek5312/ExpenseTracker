let form=document.getElementById('my-form');
let expenseAmount=document.getElementById('num');
let description=document.getElementById('description');
let category=document.getElementById('Category');
let button=document.getElementById('btn');
let list=document.getElementById('list')


form.addEventListener('submit',onSubmit);
list.addEventListener('click',removeItem);
list.addEventListener('click',editaction);


function onSubmit(e){
    e.preventDefault();
  
   
    const user={
        expenseAmount:expenseAmount.value,
       
        category:category.value,
        description:description.value,
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
//create list
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${user.expenseAmount}:${user.category}:${user.description}`));
    list.appendChild(li);
//create delete button
    const delbtn = document.createElement('button');
    delbtn.className = 'deletebtn';
    delbtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delbtn);
 //create edit button
    const editbtn=document.createElement('button');
   editbtn.className='editbtn';
   editbtn.appendChild(document.createTextNode('Edit'));
   li.appendChild(editbtn);

    
  
}


function removeItem(e) {
    if (e.target.classList.contains('deletebtn')) {
      
        const li = e.target.parentElement;
        const list = li.parentElement;
        list.removeChild(li);
  
        // Remove from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = Array.from(list.children).indexOf(li);
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  
    function editaction(e) {
      if (e.target.classList.contains('editbtn')) {
        const li = e.target.parentElement;
        const expenseAmountValue = li.firstChild.textContent.split(': ')[0];
        const categoryValue = li.firstChild.textContent.split(':')[1];
        const descriptionValue = li.firstChild.textContent.split(': ')[2];
    
        // Set the values in the form for editing
        expenseAmount.value = expenseAmountValue;
        category.value = categoryValue;
        description.value = descriptionValue;
    
        // Remove the edited user from the list and local storage
        li.parentElement.removeChild(li);
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = Array.from(list.children).indexOf(li);
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
