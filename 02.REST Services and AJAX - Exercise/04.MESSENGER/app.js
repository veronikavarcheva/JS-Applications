function attachEvents() {
    const url = `https://rest-messanger.firebaseio.com/messanger.json`;    
    let sendButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');

    refreshButton.addEventListener('click', refreshMessages);
    function refreshMessages(){
        fetch(url)
        .then((response)=> response.json())
        .then((data)=>{
        // console.log(Object.entries(data));
        let textAreaElement = document.getElementById('messages');
        textAreaElement.value = '';
        textAreaElement.disabled = false;
        Object.entries(data).forEach((element)=>{
            textAreaElement.value += `${element[1].author}: ${element[1].content}\n`;
            });
        });               
    }
      
    sendButton.addEventListener('click', sendMessage);
    function sendMessage(){
        let inputAuthorElement = document.getElementById('author');
        let inputContentElement = document.getElementById('content');
        let obj = {author: inputAuthorElement.value, content: inputContentElement.value};
        fetch(url, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(obj) })
        .then(()=>{
            inputAuthorElement.value = '';
            inputContentElement.value = '';
            refreshMessages();
        }); 
        
    }
       
   
}

attachEvents();
