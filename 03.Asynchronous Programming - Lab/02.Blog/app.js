function attachEvents() {
    const buttonLoadPostsElement = document.querySelector('#btnLoadPosts');
    const postTitleElement = document.querySelector('#post-title');
    const postBodyElement = document.querySelector('#post-body');
    const ulPostCommentsElement = document.querySelector('#post-comments');
    const buttonViewPostElement = document.querySelector('#btnViewPost');
    const postsSelectElement = document.querySelector('#posts');
   
    const baseUrl = 'https://blog-apps-c12bf.firebaseio.com';

    buttonLoadPostsElement.addEventListener('click', () => {
        fetch(`${baseUrl}/posts.json`)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
            let options = Object.keys(data).map(key => `<option value="${key}">${data[key].title}</option>`).join('\n');
            // console.log(options);
            postsSelectElement.innerHTML = options;
            // console.log(postsSelectElement);

        });
    });
    
    
    // buttonViewPostElement.addEventListener('click', () => {
    //     deleteChild();
    //     fetch(`${baseUrl}/posts/${postsSelectElement.value}.json`)
    //     .then(res => {
    //         console.log(res);
    //         return res.json();            
    //     })
    //     .then(data => {
    //         console.log(data);
          
    //         postTitleElement.textContent = data.title;
    //         postBodyElement.innerText = data.body;
    //         data.comments.forEach(comment => {
    //         const li = document.createElement('li');
    //         li.textContent = comment.text;
    //         ulPostCommentsElement.appendChild(li);
    //         console.log(ulPostCommentsElement);
    //         })            
    //     })
    // })

    // function deleteChild() {
    //     let child = ulPostCommentsElement.lastElementChild; 
    //     while (child) {
    //         ulPostCommentsElement.removeChild(child);
    //         child = ulPostCommentsElement.lastElementChild;
    //     }
    // }


    //another way:When the button with ID "btnViewPost" is clicked:
    buttonViewPostElement.addEventListener('click', () => {
        fetch(`${baseUrl}/posts/${postsSelectElement.value}.json`)
            .then(res => {
                console.log(res);
                return res.json();            
            })
            .then(data => {
                console.log(data);
                postTitleElement.textContent = data.title;
                postBodyElement.innerText = data.body;
                let output = data.comments.reduce((acc, val) => {acc.push(`<li id="${val.id}">${val.text}</li>`);
                 return acc;
                }, [])
                console.log(output);
                
                ulPostCommentsElement.innerHTML = output.join('\n');
            });

    });
    
}

attachEvents();
