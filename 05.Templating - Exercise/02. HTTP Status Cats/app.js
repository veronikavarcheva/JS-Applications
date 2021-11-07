window.addEventListener('load', async() => {
    const mainEl = document.querySelector ('#allCats');
// initialize templates
const listString = await (await fetch('./list.hbs')).text();
const listTemplate = Handlebars.compile(listString);
Handlebars.registerPartial('cat', await (await fetch('./cat.hbs')).text());
//render HTML

const html = listTemplate({cats: cats});
mainEl.innerHTML = html;
//set up interaction
    mainEl.addEventListener('click', (e)=>{
    // console.log(e.target.tagName)
    if(e.target.tagName!=='BUTTON'){
    return;
    }
    const divStatusElement = e.target.parentNode.querySelector('.status');
    console.log(divStatusElement.style);
    
    if(divStatusElement.style.display === 'none'){
        divStatusElement.style.display = 'block'; //divStatusElement.removeAttribute('style')
        e.target.textContent = 'Hide status code';  
    }else{
        divStatusElement.style.display = 'none';
        e.target.textContent = 'Show status code';
    }

    });

});
