
window.addEventListener('load', async ()=>{

   const templateString = await (await fetch('./main-template.hbs')).text();
   
   Handlebars.registerPartial('town', await( await fetch('./town-template.hbs')).text());
  
   const templateFn = Handlebars.compile(templateString);
  

    document.querySelector('#btnLoadTowns').addEventListener('click', renderTowns);
    const inputElement = document.querySelector('#towns');
    const rootElement = document.querySelector('#root');
    
    function renderTowns(e){
        e.preventDefault();
        const towns = inputElement.value.split(', ');
       
  
    const generatedHTML = templateFn({ towns: towns });   

    rootElement.innerHTML = generatedHTML;
    }
});


