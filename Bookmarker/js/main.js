//listen to the form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }
    var bookmark ={
        name:siteName,
        url:siteUrl
    }
    
    /*
    //Local Storage tests(only stores strings)
    //parsing json(comes from Html)
    localStorage.setItem('test','Hello World');
    console.log(localStorage.getItem('test'));
    console.log(localStorage.removeItem('test'));*/

    //test if bookmark is null
    if(localStorage.getItem('bookmarks')==null){
        var bookmarks =[];
        bookmarks.push(bookmark);
        //set to localstorage
        //but this is a json array and we need to save it as a string
        //json.stringify turns it to a string
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else{
        //if there is something in bookarks fetch it from local storage
        //Json.parse turns a string back into json
      var bookmarks= JSON.parse (localStorage.getItem('bookmarks'));
      //add bookmarks to array
      bookmarks.push(bookmark);
        //reset back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();
    //Re-fetch bookmarks
    fetchBookmarks();

    //prevents default behavior i.e form from submitting
    e.preventDefault();
}
//delete bookmark
function deleteBookmark(url){
    //get bookmarks from localstorage
    var bookmarks= JSON.parse (localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i =0;i<bookmarks.length;i++){
        if(bookmarks[i].url ==url){
            //remove the array using splice 
            //splice removes the element from the array and then returns the removes element
            bookmarks.splice(i,1);
        }
    }
    //re-set back to localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //refetch bookmarks
    fetchBookmarks();
}

//fetch bookmark
function fetchBookmarks(){
    var bookmarks= JSON.parse (localStorage.getItem('bookmarks'));
   //get output id to print it in bookmarksresult div
   var bookmarksResults = document.getElementById('bookmarksResults');
   //build output
   //innerhtml puts whatever we give it nto that spot
   bookmarksResults.innerHTML ='';
   //iterate through the array and put output inside a div
   for(var i =0;i<bookmarks.length;i++){
       var name= bookmarks[i].name;
       var url = bookmarks[i].url;
       //append it t the page
       bookmarksResults.innerHTML+='<div class="well">'+
                                    '<h3>'+name+
                                    '<a class="btn btn-default" target = "_blank"  href="'+url+'"> Visit </a> '+
                                    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target = ""  href="#"> Delete </a> '+

                                    '</h3>'+
                                    '</div>';
   }
}

function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    //regular expression to format a url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }
    return true;

}
