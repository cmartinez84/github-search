var apiKey = require('./../.env').apiKey;

function GithubSearch(){
    this.searchName = "";
}
GithubSearch.prototype.search = function(searchName){
    var classScope = this;
    this.searchName = searchName;
    $.get('https://api.github.com/users/' +searchName +'?access_token=' + apiKey).then(function(response){
        $("#userName").text(response.login);
        $("#fullName").text(response.name);
        $("#email").text(response.email);
        $("#numberOfRepos").text(response.public_repos);
        $("#link").attr("href", response.html_url);
        $("#avatar").attr("src", response.avatar_url);
        classScope.pagination(response.public_repos);
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, no username was found with the name" + searchName+" , please try again.");
    });
};
GithubSearch.prototype.pagination = function(totalRepos){
    var classScope = this;
    var numberOfPages = Math.ceil(totalRepos/30);
    for(var i = 1; i<= numberOfPages; i++){
        $("#pages").append("<span class='getPage'> " + i + " </span>");
    }
    $(".getPage").click(function(){
        var page = $(this).text();
        $("ul#repos").empty();
        classScope.getRepos(page);
    });

};
GithubSearch.prototype.getRepos = function(page){
    var searchName = this.searchName;
    $.get('https://api.github.com/users/' +searchName +'/repos?page='+page+'&per_page=30?access_token=' + apiKey).then(function(response){
        response.forEach(function(repo){
            $("ul#repos").append("<li>"+ repo.name + "</li>");
            $("li").last().click(function(){
                var dateCreated = repo.created_at;
                 dateCreated = dateCreated.substring(0,10);
                var updatedAt = repo.updated_at;
                updatedAt = updatedAt.substring(0,10);
                var description;
                if(repo.description){
                     description = repo.description;
                }
                else{
                     description = "no description";
                }
                $("h1#repoName").text(repo.name);
                $("#description").text(description);
                $("#dateCreated").text(dateCreated);
                $("#language").text(repo.language);
                $("#updatedAt").text(updatedAt);
                $("a#link").attr("href", repo.html_url);
            });
        });
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, it does not look like this user has any repos. Tell them to get moving");
    });
};

exports.githubSearchModule = GithubSearch;
