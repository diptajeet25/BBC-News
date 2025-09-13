function loadCategory()
{
    fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res=>res.json())
    .then(data=>
    {
       
        let newsCategory=document.getElementById("newsCategory");
        for(let i=0; i<data.categories.length; i++)
        {
            let newsID=data.categories[i].id;
            let li=document.createElement("li");
            li.innerHTML=`<p id=${data.categories[i].id} class="cursor-pointer  li-btn hover:bg-slate-200 p-1 text-lg active:bg-slate-300 newscatagoryList" onclick=fetchNewsCategoryWise('${newsID}') > ${data.categories[i].title}</p>`;      
            newsCategory.appendChild(li);
        }
    }
    );
};

loadCategory();

function fetchnews()
{
    fetch(`https://news-api-fs.vercel.app/api/categories/main`)
    .then(res=>res.json())
    .then(data=>
    {
        

        displayNews(data.articles);
    });
}
fetchnews();

function addColor(data)
{

    let btn=document.getElementsByClassName('li-btn');
    for(let i of btn)
    {
        i.classList.remove('active-btn');
    }
    let activeBtn =document.getElementById(data);

    activeBtn.classList.add('active-btn');
}

function fetchNewsCategoryWise(categoryId)
{
    addColor(categoryId);
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then(res=>res.json())
    .then(data=>
    {
        displayNews(data.articles);
    });
}

function displayNews(articles)
{
    console.log(articles);
    let newsContainer=document.getElementById("newsContainer");
    newsContainer.innerHTML="";
    if(articles.length===0 )
    {
        newsContainer.innerHTML=`<h2 class="text-3xl font-bold text-center text-red-600">No News Found</h2>`;
        return;
    }
    for(let i=0; i<articles.length; i++)
    {
        let div=document.createElement("div");
        let x=articles[i].title;
        div.innerHTML=`
        <div class="flex flex-col h-full rounded-lg p-1 shadow-lg bg-white">
        <img class="w-full" src="${articles[i].image.srcset[0].url}" alt="${articles[i].title}">
        <h2 class="text-xl font-bold m-2">${articles[i].title}</h2>
        <p class="m-1">${articles[i].time}</p>
<div class="mt-2 my-2 flex flex-col lg:flex-row gap-2 justify-start items-start">
  <a class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded" onclick="bookmarkAdd('${x}')">Bookmark</a>
  <a href="${articles[i].link}" target="_blank" class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">View Details</a>
</div>


        </div>
        `
        newsContainer.appendChild(div);
    }
}
let total=0;
function bookmarkAdd(title)
{
    total++;
    let bookmarkCount=document.getElementById("bookmarkCount")
    bookmarkCount.innerText=total;
    let bookmarkcontainer=document.getElementById("bookmarkcontainer");
    let div=document.createElement('div');
    div.innerHTML=`<div class="flex rounded-lg flex-col gap-2 justify-start items-start bg-white p-2 my-2">
    <h2 class="text-lg">${title}</h2>
    <button class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded deleteButton">Delete</button>
    `
           bookmarkcontainer.appendChild(div);
       let deleteBtn = div.querySelector('.deleteButton');
       deleteBtn.addEventListener('click',()=>
    {
        div.remove();
        total--;
         bookmarkCount.innerText=total;
    });
}