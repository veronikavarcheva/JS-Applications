import monkeys from './monkeys.js';

window.addEventListener('load', async() => {
    const mainEl = document.querySelector('section');

// initialize templates
const mainString = await (await fetch('./main.hbs')).text();
const mainTemplate = Handlebars.compile(mainString);
Handlebars.registerPartial('monkey', await (await fetch('./monkey.hbs')).text());
// render HTML

const html = mainTemplate({monkeys});
mainEl.innerHTML = html;
//set up interaction
const monkeysEl = document.querySelector ('.monkeys');
    monkeysEl.addEventListener('click', (e)=>{
    // console.log(e.target.tagName)
    if(e.target.tagName!=='BUTTON'){
    return;
    }
    const pElement = e.target.parentNode.querySelector('p');
    pElement.removeAttribute('style');
    
    });

});
