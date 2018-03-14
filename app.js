var jquery=require("jquery")
window.$ = window.jQuery = jquery;
const searchForm=$("#search-form");
const searchInput=$("#search-input")


searchForm.submit((e)=>{
   const searchTerm=searchInput.value;
   console.log(searc)
e.preventDefault()
})
