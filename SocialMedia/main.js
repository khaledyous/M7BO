class RecipeCard{
    id;
    user;
    userImg;
    userName;
    youtube;
    photo;
    ratingDiv;
    title;
    rating;
    ratingStar1;
    ratingStar2;
    ratingStar3;
    ratingStar4;
    ratingStar5;
    interactionDiv;
    interactionLike;
    interactionComment;
    interactionShare;
    interacctionSave;
    htmlElement;
    addToList;
    constructor(newId, newTitle, newPhoto, newYt, newUserName, newUserImg, addToList){
        this.id = newId;
        this.addToList = addToList;
        this.youtube = newYt

        this.htmlElement = document.createElement("li");
        this.htmlElement.classList = "list-listItem";

        this.user = document.createElement("div");
        this.user.classList = "post__user";

        this.userName = document.createElement("p");
        this.userName.classList = "user__Name";
        this.userName.innerText = newUserName;
        this.userImg = document.createElement("img");
        this.userImg.classList = "user__img";
        this.userImg.setAttribute("src", newUserImg);

        this.title = document.createElement("a");
        this.title.classList = "post__nameRecipe";
        this.title.innerText = newTitle;
        this.title.setAttribute("href", this.youtube);

        this.photo = document.createElement("img");
        this.photo.classList = "post__img";
        this.photo.setAttribute("src", newPhoto);

        this.ratingDiv = document.createElement("div");
        this.ratingDiv.classList = "post__ratingDiv";
        this.rating = document.createElement("figure");
        this.rating.classList = "post__rating";

        this.ratingStar1 = document.createElement("i");
        this.ratingStar1.classList = "fa-regular fa-star";
        this.ratingStar2 = document.createElement("i");
        this.ratingStar2.classList = "fa-regular fa-star";
        this.ratingStar3 = document.createElement("i");
        this.ratingStar3.classList = "fa-regular fa-star";
        this.ratingStar4 = document.createElement("i");
        this.ratingStar4.classList = "fa-regular fa-star";
        this.ratingStar5 = document.createElement("i");
        this.ratingStar5.classList = "fa-regular fa-star";

        this.interactionDiv = document.createElement("div");
        this.interactionDiv.classList = "interaction__div";
        this.interactionLike = document.createElement("i");
        this.interactionLike.classList = "fa-regular fa-heart";
        this.interactionComment = document.createElement("i");
        this.interactionComment.classList = "fa-regular fa-comment";
        this.interactionShare = document.createElement("i");
        this.interactionShare.classList = "fa-regular fa-paper-plane";
        this.interactionSave = document.createElement("i");
        this.interactionSave.classList = "fa-regular fa-bookmark";
        this.interactionDiv.appendChild(this.interactionLike);
        this.interactionDiv.appendChild(this.interactionComment);
        this.interactionDiv.appendChild(this.interactionShare);
        this.interactionDiv.appendChild(this.interactionSave);
        
        
        this.render();
        this.StarRating();
    }

    render(){
        this.user.appendChild(this.userImg);
        this.user.appendChild(this.userName);
        this.htmlElement.appendChild(this.user);
        this.ratingDiv.appendChild(this.title);
        this.ratingDiv.appendChild(this.rating);
        
        
        this.htmlElement.appendChild(this.photo);
        
        this.rating.appendChild(this.ratingStar1);
        this.rating.appendChild(this.ratingStar2);
        this.rating.appendChild(this.ratingStar3);
        this.rating.appendChild(this.ratingStar4);
        this.rating.appendChild(this.ratingStar5);
        this.htmlElement.appendChild(this.ratingDiv);
        this.htmlElement.appendChild(this.interactionDiv);
        this.addToList.appendChild(this.htmlElement);
    }

    StarRating(){
        let starArray = this.rating.querySelectorAll(".fa-star");
        let randomStarNumber = Math.ceil(Math.random() * 5);
        for (let i = 0; i < randomStarNumber; i++) {
            starArray[i].classList.add("fa-solid");
        }
    }
}

class RecipeList{
    id;
    htmlElement
    
    constructor(newId){
        this.id = newId;
        this.htmlElement = document.createElement("ul");
        this.htmlElement.id = this.id;
        this.htmlElement.classList.add("main__list");
        this.render();
    }

    render(){
        document.querySelector("main").appendChild(this.htmlElement);
    }
}

function fetchData(){
    Promise.all([
        fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
        fetch("https://randomuser.me/api/")
    ])
    
    .then((responses) => {
        return Promise.all(responses.map(function (response){
            return response.json()
        }));
    })
    .then((data) =>{
        console.log(data);
        let info  = data
        let recipeId = info[0].meals[0].idMeal
        let recipeTitle = info[0].meals[0].strMeal
        let recipeImg = info[0].meals[0].strMealThumb
        let recipeA= info[0].meals[0].strYoutube
        let userName = info[1].results[0].name.first + " " + info[1].results[0].name.last;
        let userImg = info[1].results[0].picture.thumbnail
        console.log(userName);
        console.log(userImg);
        
        new RecipeCard(recipeId, recipeTitle, recipeImg, recipeA, userName, userImg, document.getElementById(list.id))
    
        observeLastElement()
    })
}

function observeLastElement(){
    let target = document.querySelector(".list-listItem:last-child");

    if(target){
        let io = new IntersectionObserver(callback, { threshold: 0});
        io.observe(target);
    }
}

function callback(entries, observer){
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            fetchData();
        }
    })
}

let list = new RecipeList("js--recipesList")
fetchData();


/*
    extra:
    - footer met home, search, make post, reels en profile
    - "stories", categorieën met random food pic
    - 
*/