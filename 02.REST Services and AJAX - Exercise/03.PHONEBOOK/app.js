function attachEvents() {
   
   let buttonLoad = document.getElementById('btnLoad');
   let ulElement = document.getElementById('phonebook');   
   let buttonCreate = document.getElementById('btnCreate');

   const url = `https://phonebook-nakov.firebaseio.com/phonebook.json`;
   //GET
   buttonLoad.addEventListener('click', ()=>{
       fetch(url)
       .then(res=>res.json())
       .then(data=>{
        ulElement.innerHTML = '';
        Object.keys(data).forEach((key)=>{
            let buttonDelete = document.createElement('button'); 
            let liElement = document.createElement('li');
            buttonDelete.textContent = 'Delete';        
            liElement.textContent = `${data[key].person}: ${data[key].phone}`;
            
            const deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
            //DELETE
            buttonDelete.addEventListener('click', ()=>{
                fetch(deleteUrl, {method: "DELETE" })
            });
            liElement.appendChild(buttonDelete);
            ulElement.appendChild(liElement);
        });       
       });           
   });
   //POST
   buttonCreate.addEventListener('click', ()=>{
    let personInputElement = document.getElementById('person');
    let phoneInputElement = document.getElementById('phone');
    let obj = {person: personInputElement.value, phone: phoneInputElement.value};
       fetch(url, {method: "POST", body: JSON.stringify(obj) });
   });

}

attachEvents();
