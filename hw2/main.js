const app = document.getElementById("album-app");
const slideshow = document.getElementById("slideshow");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let container = document.getElementById("img-container");
let chosenImg = container.firstElementChild.firstElementChild;
let index = 0;
let currentkey = "nature";

const imageList = {
    "nature" : ["https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg", "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg", "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg", "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567__340.jpg", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg", "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg", "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg", "https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg", "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706__340.jpg", "https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228__340.jpg", "https://cdn.pixabay.com/photo/2021/09/03/15/37/mountain-6596074__340.jpg", "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954__340.jpg", "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg", "https://cdn.pixabay.com/photo/2021/09/15/21/29/lake-6627781__340.jpg", "https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742__340.jpg", "https://cdn.pixabay.com/photo/2016/08/09/21/54/lake-1581879__340.jpg", "https://cdn.pixabay.com/photo/2021/08/27/18/50/water-6579313__340.jpg", "https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__340.jpg"],
    "buildings" : ["https://cdn.pixabay.com/photo/2015/05/15/14/21/architecture-768432__340.jpg", "https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489__340.jpg", "https://cdn.pixabay.com/photo/2013/04/11/19/46/building-102840__340.jpg", "https://cdn.pixabay.com/photo/2021/08/20/14/53/monastery-6560623__340.jpg", "https://cdn.pixabay.com/photo/2018/04/28/10/55/architecture-3357028__340.jpg", "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667__340.jpg", "https://cdn.pixabay.com/photo/2018/01/21/01/46/architecture-3095716__340.jpg", "https://cdn.pixabay.com/photo/2016/06/28/00/13/castle-1483681__340.jpg", "https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009__340.jpg", "https://cdn.pixabay.com/photo/2020/04/04/03/08/city-5000648__340.jpg", "https://cdn.pixabay.com/photo/2016/02/19/11/36/canal-1209808__340.jpg"],
    "animals" : ["https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__480.jpg", "https://cdn.pixabay.com/photo/2014/11/03/17/40/leopard-515509__340.jpg", "https://cdn.pixabay.com/photo/2018/07/14/17/46/raccoon-3538081__340.jpg", "https://cdn.pixabay.com/photo/2014/11/21/17/27/frog-540812__340.jpg", "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg", "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg", "https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512__340.jpg", "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247__340.jpg", "https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045__340.jpg", "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875__340.jpg", "https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228__340.jpg", "https://cdn.pixabay.com/photo/2017/08/12/17/11/roe-deer-2634729__340.jpg", "https://cdn.pixabay.com/photo/2013/06/29/21/18/wolf-142173__340.jpg", "https://cdn.pixabay.com/photo/2021/09/19/12/19/animal-6637774__340.jpg"],
    "food" : ["https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827__340.jpg", "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__340.jpg", "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246__340.jpg", "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062__340.jpg", "https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846__340.jpg", "https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056__340.jpg", "https://cdn.pixabay.com/photo/2015/03/26/09/40/blueberries-690072__340.jpg", "https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305__340.jpg", "https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908__340.jpg", "https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040__340.jpg", "https://cdn.pixabay.com/photo/2016/09/15/19/24/salad-1672505__340.jpg", "https://cdn.pixabay.com/photo/2017/08/30/17/12/waffle-hearts-2697904__340.jpg"],
    "girlfriend" : [],
}

function magnify(img) {
    const imgURL = img.src;
    index = imageList[currentkey].indexOf(imgURL);
    if(index === 0)  prev.style.visibility = "hidden";
    else  prev.style.visibility = "visible";
    if(index === imageList[currentkey].length - 1)  next.style.visibility = "hidden";
    else  next.style.visibility = "visible";
    slideshow.style.backgroundImage = `url(${ imgURL })`;
    chosenImg.classList.remove("chosen-img");
    img.classList.add("chosen-img");
    chosenImg = img;
}

function GOprev() {
    next.style.visibility = "visible";
    -- index;
    if(index === 0)  prev.style.visibility = "hidden";
    const imgURL = imageList[currentkey][index];
    slideshow.style.backgroundImage = `url(${ imgURL })`;
    chosenImg.classList.remove("chosen-img");
    const img = container.children[index].firstElementChild;
    img.classList.add("chosen-img");
    chosenImg = img;
}

function GOnext() {
    prev.style.visibility = "visible";
    ++ index;
    if(index === imageList[currentkey].length - 1)  next.style.visibility = "hidden";
    const imgURL = imageList[currentkey][index];
    slideshow.style.backgroundImage = `url(${ imgURL })`;
    chosenImg.classList.remove("chosen-img");
    const img = container.children[index].firstElementChild;
    img.classList.add("chosen-img");
    chosenImg = img;
}

function changeAlbum(album) {
    if (imageList[album.id].length === 0){
        alert("This album is empty!");
    }
    else  if(album.id !== currentkey){  // TODO: 判斷是否為同一相簿
        const oldalbum = document.getElementById(currentkey);
        oldalbum.firstElementChild.classList.remove("chosen");
        oldalbum.firstElementChild.classList.add("album-icon");
        console.log(oldalbum.firstElementChild);
        album.firstElementChild.classList.remove("album-icon");
        album.firstElementChild.classList.add("chosen");
        currentkey = album.id;
        index = 0;
        prev.style.visibility = "hidden";
        next.style.visibility = "visible";
        slideshow.style.backgroundImage = `url(${ imageList[currentkey][index] })`;
        app.removeChild(container);
        container = document.createElement("div");
        container.id = "img-container";
        imageList[currentkey].forEach((src) => {
            const newnode = document.createElement("div");
            newnode.classList.add("img-box");
            const newimg = document.createElement("img");
            newimg.src = src;
            newimg.classList.add("img");
            newimg.addEventListener("click", () => {magnify(newimg)});
            newnode.appendChild(newimg);
            container.appendChild(newnode);
        })
        container.firstElementChild.firstElementChild.classList.add("chosen-img");
        app.appendChild(container);
    }
}