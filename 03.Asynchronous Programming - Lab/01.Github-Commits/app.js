function loadCommits() {
  // Try it with Fetch API
  const username = document.getElementById('username').value;
  const repo = document.getElementById('repo').value;
  const ulElement = document.getElementById('commits');
   ulElement.textContent = '';
  let url = `https://api.github.com/repos/${username}/${repo}/commits`; 

  fetch(url)
   .then(res => {
       console.log(res);
       
       if(res.status == 404){
           throw new Error(`${res.status} (Not Found)`);
       }
       return res.json();
   })
   .then(data => {
       console.log(data);
       
    
       data.forEach(d => {
           let liElement = document.createElement('li');
           liElement.textContent = `${d.commit.author.name}: ${d.commit.message}`;
           ulElement.appendChild(liElement);
       })
   })
   .catch (error => {
       console.log(error);       
       
       let liElement = document.createElement('li');
       liElement.textContent = `${error}`;
       ulElement.appendChild(liElement);
   });
}