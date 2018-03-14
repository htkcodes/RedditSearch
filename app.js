import reddit from './redditapi'

var jquery=require("jquery")
window.$ = window.jQuery = jquery;
const searchForm=$("#search-form");
const searchInput=document.getElementById('search-input');



searchForm.submit((e)=>{
	 const searchTerm=searchInput.value;
	 //Sort
	const sortBy=document.querySelector('input[name="sortby"]:checked').value;

	console.log(sortBy)
	
	const searchLimit=document.getElementById('limit').value;

	console.log(searchLimit)

	//Checking input

	if(searchTerm == '')
	{
		displayMessage('Add a search term','alert-danger')
	}

e.preventDefault()


reddit.search(searchTerm,searchLimit,sortBy)
.then(results=>{

let output=`<div class="card-colums">`;
results.forEach(post=>{

	let image=post.preview ? post.preview.images[0].source.url:'https://zdnet2.cbsistatic.com/hub/i/r/2016/05/27/c16d537c-b457-4d84-9b88-8e97ede57180/thumbnail/770x578/f0b848edb037a70d6e0821c061087214/screen-shot-2016-05-27-at-09-25-51.jpg';
	output+=`
	<div class="card">
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" class="btn btn-primary">Read More</a>
  </div>
</div>


	`
})
output+=`</div>`;
document.getElementById('results').innerHTML=output;
})
})

function displayMessage(message,className){
//
const div=document.createElement('div');
div.className=`alert ${className}`;

div.appendChild(document.createTextNode(message));

const searchContainer=document.getElementById('search-container');

const search=document.getElementById('search');

searchContainer.insertBefore(div,search);

//Timeout

setTimeout(function(){
	document.querySelector('.alert').remove()
},3000)
}

function truncateText(text,limit)
{
	const shortened=text.indexOf(' ',limit);
	if(shortened == -1 ) return text;

	return text.substring(0,shortened);
}


