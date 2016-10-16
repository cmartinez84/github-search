var GithubSearch = require('./../js/results-interface.js').githubSearchModule;

$(function(){
    var githubSearch = new GithubSearch();

    $("button").click(function(){
        var searchName = $("#searchName").val();
        githubSearch.search(searchName);
        githubSearch.getRepos(searchName);
    });
});
