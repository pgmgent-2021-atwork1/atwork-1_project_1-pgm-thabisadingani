(() => {
	const app = {
		initialize() {
			console.log('1. Application started');
			this.cacheElements();
			this.buildUI();
      this.registerHTMLForListeners();
      this.getQuaryParameter();
		},
		cacheElements() {
			console.log('2. cache all existing DOM elements');
			this.$nav__linksSide = document.querySelector('.nav__links--side');
      this.$burger = document.querySelector('.burger');
      this.$webshop__cards = document.querySelector('.webshop--cards')
      this.$btn = document.querySelectorAll('.category button');
      this.$eason  = document.querySelectorAll('.flowerBox');
      this.$backToTheTop = document.querySelector('.arrow');

      this.$how__shoppinBag = document.querySelector('.show__shoppinBag');
      this.$hoppingCart = document.querySelector('.shoppingCart');  
      this.$btnCloseCart = document.querySelector('.btn__closing--cart');   
		},
		buildUI() {
      console.log('3. Build the user interface')
      if(this.$webshop__cards){
        this.$webshop__cards.innerHTML = this.generateHTMLForWebshop();
      }else{console.log("no webshop");};
     
		},
		generateHTMLForWebshop() {
      let tempStr = "";
			bouquets.forEach((item, index) => {
				tempStr += `<div class="cards"><a class="more__productInfo" href ="boeket.html?type=${item.type}"><img class = "web__image add__details" data-type="${item.type}" src="${item.image}" alt=""><a href="#"></a><h4><span class=" add__details underline"> ${item.title}</span> <span class="price">${item.prijs}</span></h4></a></div>`;
      });
			return tempStr;
    },
		registerHTMLForListeners() {
      this.$burger.addEventListener('click', () => {
        this.showSideMenu(); 
    });
      this.$btn.forEach(item =>{
        item.addEventListener('click', () => {
          this.getSeasonForFlowers(item);
        })
      });
      this.$how__shoppinBag.addEventListener('click', () =>{
        // prompt("i work");
        this.showShoppingCart();
        
      });
      this.$btnCloseCart.addEventListener('click', () =>{
        this.removeShoppingCart();
      });
      window.addEventListener('scroll', () => {
        this.getPageScroll();
      });
      this.$backToTheTop.addEventListener('click', () => {
        this.getBackToTheTop();
      });
    },
    showShoppingCart(){
      this.$hoppingCart.classList.add('hidden');
    },
    removeShoppingCart(){
      this.$hoppingCart.classList.remove('hidden');
    },

		showSideMenu() {
      if(this.$nav__linksSide.classList.contains('open')){
        this.$nav__linksSide.classList.remove('open');
      }else{
        this.$nav__linksSide.classList.add('open');} 
    },
    getPageScroll(){
      if (window.pageYOffset > 300){ //show the back to top arrow
        this.$backToTheTop.classList.add('btnAppears'); 
      }else{ //hide it the bback to the top arrow
        this.$backToTheTop.classList.remove('btnAppears'); 
     }
    },
    getBackToTheTop(){
        window.scrollTo(0, 0);
    },
    getQuaryParameter(){
      
      const search = window.location.search;
  
      const params = new URLSearchParams(search);

      const urlType = params.get('type');
     
      if (urlType !== null){

        let selected__item = '';
        selected__item = bouquets.find((bouquet) => bouquet.type === urlType);
        console.log(selected__item);

        this.$product__details = document.querySelector('.product__details');
        console.log(this.$product__details.innerHTML);

        let tempStr = `<div class="bouquet__info"><img src ="${selected__item.image}"><h1>Boeket ${selected__item.type}</h1><h5>${selected__item.prijs}</h5></div>`;
        console.log(tempStr);

        this.$product__details.innerHTML = tempStr;

      }
    },
    getSeasonForFlowers(items){
      for (let i = 0; i < this.$btn.length; i++){
        this.$btn[i].classList.remove("active");
      }
        items.classList.add("active");
  
      //showSeason 
      this.$eason.forEach(show => {
        show.style.display = "none";
        let $easons = items.textContent.toLowerCase();
        if(show.getAttribute("data-att") === $easons || $easons ==="all"){
          show.style.display = "block";
        }
      })

    },
		generateBackToTopArr() {
			
		}
	};
	app.initialize();
})();
