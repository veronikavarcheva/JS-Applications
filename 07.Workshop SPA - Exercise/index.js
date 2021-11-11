const userModel = firebase.auth();
const db = firebase.firestore();

//казваме на Sammy, че ще визуализира отделните страници на SPA в елемента с id="root" и казваме, че Sammy ще използва библиотелката handlebars  и файловете с разширение .hbs
const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');
    //get визуализира всяка една от различните странички, за разлика от post, put, delete
    //home routes:
    this.get('/home', function(context) {
        console.log(context);
        db.collection('offers')
        .get()
        .then((response)=>{
            // context.offers = response.docs.map((offer) => { return { id: offer.id, ...offer.data() }})
            context.offers = [];
            response.forEach((offer) => {
                // console.log(offer.id, offer.data()));  
                context.offers.push({ id: offer.id, ...offer.data() });          
             // console.log(context);
            });
          extendContext(context) 
            .then(function(){
            this.partial('./templates/home.hbs');
            });       
        })       
        .catch(errorHandler)                
    });
    //user routes:
    this.get('/register', function(context){
        extendContext(context)
            .then(function(){
                this.partial('./templates/register.hbs');
            });    
    });
    this.get('/logout', function(context){
        userModel.signOut()
            .then(()=> {
                clearUserData();
                this.redirect('#/home');
            })
            .catch(errorHandler);
    });

    this.post('/register', function(context){
        console.log(context);
        const {email, password, rePassword} = context.params;
        // ако не е изпълнено условието, няма да се случва нищо
        if(email === '' || password < 6 || password !== rePassword){

            if(password !== rePassword){
                alert('Passwords do not match!');                       
            }

            if(password < 6){
                alert('Password should be at least 6 characters long!');           
            } 
            
            if(email === ''){
                alert('Email input must be filled');            
            }
            return;
        }
       
        userModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                console.log(userData);
                this.redirect('#/login');
            })
            .catch(errorHandler);
    });

    this.post('/login', function(context){
        console.log(context);
        const {email, password} = context.params;
        userModel.signInWithEmailAndPassword(email, password)
            .then((userData)=> {
                console.log(userData);//userData e обект, к.съдържа допълнителна информация за user-a
                saveUserData(userData);//изпълняваме функция, която приема този обект userData
                this.redirect('#/home');
            })
            .catch(errorHandler);
    });

    this.get('/login', function(context){
        extendContext(context)
        .then(function(){
            this.partial('./templates/login.hbs');
        });       
    });
    //offers routes:
    this.get('/create-offer', function(context){
        extendContext(context)
        .then(function(){
            this.partial('./templates/createOffer.hbs');
        });      
    });
    this.get('/edit-offer/:id', function(context){
        extendContext(context)
        .then(function(){
            this.partial('./templates/editOffer.hbs');
        });       
    });
    this.post('/create-offer', function(context){
        console.log(context);        
        const { productName, price, imageUrl, description, brand } = context.params;
        
        db.collection('offers').add({
            productName, 
            price, 
            imageUrl,
            description, 
            brand,
            salesman: getUserData().uid,
            clients: [],  
        })
            .then((createdProduct)=> {
                console.log(createdProduct);
                this.redirect('#/home');                
            })
            .catch(errorHandler);        
    });
    //details routes:
    this.get('/details/:offerId', function(context){
        // console.log(context);
        const { offerId } = context.params;
        db.collection('offers').doc(offerId).get()
        .then((response)=> {
            const {uid} = getUserData();
            // console.log(response.data());
            const actualOfferData = response.data();
            const imTheSalesman = actualOfferData.salesman === uid;
            const userIndex = actualOfferData.clients.indexOf(uid);
            // console.log(userIndex);
            const imInTheClientsList = userIndex > -1;
            // console.log(imInTheClientsList);        
            
            context.offer = {...response.data(), imTheSalesman, id: offerId, imInTheClientsList };
            // console.log(context.offer);
            
            extendContext(context)
            .then(function(){
                this.partial('./templates/details.hbs'); 
            });   
        });
           
    });
    this.get('/delete/:offerId', function(context) {
        // console.log(context);        
        const {offerId} = context.params;
        // console.log(offerId);
        db.collection('offers').doc(offerId).delete()
            .then(()=>{
                this.redirect('#/home')
            })
            .catch(errorHandler);
    });
    this.get('/edit/:offerId', function(context) {
        const { offerId } = context.params;
        // console.log(context);
        db.collection('offers').doc(offerId).get()
         .then((response)=>{
            //  console.log(response.data());
             context.offer = { id: offerId, ...response.data()};
             extendContext(context)
                .then(function(){
                this.partial('./templates/editOffer.hbs');
                });
         });        
    });
    this.post('/edit/:offerId', function(context) {
        const { offerId, productName, price, brand, description, imageUrl } = context.params;
        // console.log(context.params);//Sammy.Object
        // console.log(...context.params);//standart js object        
        db.collection('offers').doc(offerId).get()
            .then((response) => {
                return db.collection('offers').doc(offerId).set({
                    ...response.data(),
                    productName,
                    price, 
                    brand, 
                    description,
                    imageUrl, 
                });              
            })
            .then((response)=> {
                this.redirect(`#/details/${offerId}`)
            })
            .catch(errorHandler);
    }); 
    this.get('#/buy/:offerId', function (context) {
        // console.log(context.params.offerId);
        const {offerId} = context.params;
        // console.log(getUserData().uid);
        const {uid} = getUserData();

        db.collection('offers').doc(offerId).get()
            .then((response) => {
                const offerData = {...response.data()};
                offerData.clients.push(getUserData().uid);

                return db.collection('offers').doc(offerId).set(offerData);
            })
            .then((response)=>{
                this.redirect(`#/details/${offerId}`)
            })
            .catch(errorHandler);
    });
});
       

//когато се зареди страницата т.е когато за първи самата апликация се вдигне като инстанция и когато първоначално се зареди, ние ще достъпваме home
(()=>{
    app.run('#/home');
})();

//loadPartial e функция, на която трябва да подадем обект, ключовете, на който са имената на съответния partial, а за value даваме пътя до съответния partial
function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.email = user ? user.email : '';
  
    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    });
}

function errorHandler(error){
    alert(error.message);    
}

function saveUserData(data){
    const { user: { email, uid} } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
}

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; 
}

function clearUserData(){
    this.localStorage.removeItem('user');
}
