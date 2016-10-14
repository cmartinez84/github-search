var GithubSearch = require('./../js/search.js').githubSearchModule;

$(function(){
    var githubSearch = new GithubSearch();

    $("button").click(function(){
        var searchName = $("#searchName").val();
        githubSearch.search(searchName);
        // console.log(searchName);
    });
});
