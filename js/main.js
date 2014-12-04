'use strict'; // Remonte d'avantage les erreurs de code

 //Nombre de page dans chaque chapitre.
var chapterNb = [[0,'0'],[32,'jpg'],[33,'jpg'],[31,'png'],[34,'png']];

//------------------------------------------------------------------------ Chargement initial
//----------------------------------------------------------------------------------------------------------------------------Active
$(document).ready(function(){
//-------------------------------------------On Start
	
//------------------------------------------------------------OnStart------------Header Search Box Focus & Clear

	var msgDefault = 'Rechercher';
	
	//Clear search text on focus
	/*$( "#headerSearch" ).focus(function() {
		$( "#headerSearch" ).val('');
	});*/
	
	//Toggle show/hide login box with
	$('#btn_login_register').click(function(){
		$('#login_form').css('display')=='none' ? $('#login_form').css('display','inline-block') : $('#login_form').css('display','none');
	})
	
	//Form login verification
	$('#login_form').submit(login);
	
	var mangaSearch = [];

	//Convert the 2d array into a regular array
	for (var i = 0; i < mangaList.length; i++){
		mangaSearch[i] = mangaList[i][0];
	}
	
	$( "#tags" ).autocomplete({
      source: mangaSearch //Table us eto populat the auto autocomplete
    ,
	select: function( event, ui ) { //Redirect when selecting a list item
      	  if (window.location.pathname.indexOf('/somemanga.html') >= 0){
				window.location.href = "../manga/somemanga.html";
			}else{
				window.location.href = "manga/somemanga.html";
			}
 
        return false;
      } }
	);
	
	//Redirect with the enter key
	$("#tags").keydown(function(e) {
		  if(e.keyCode == 13) { // left
		  if (window.location.pathname.indexOf('/somemanga.html') >= 0){
				window.location.href = "../manga/somemanga.html";
			}else{
				window.location.href = "manga/somemanga.html";
			}
		  }
		});

});	//--On start End

//------------------------------------------------------Header
//Login button
function login(){
	if($('#login_form input[name="user"]').val()!=''){
		$('#btn_login_register').css('display','none');
		$('#div_login_register').append('<div id="div_login_temp"><p>Welcome, ' + getTrimMangaTitle($('#login_form input[name="user"]').val(),6) + '</p></div>');
		$('#div_login_temp').append('<input type="button" value="Logout" />');
		$('#login_form').css('display','none');
		
		//Logout button listener
		$("#div_login_temp input").click(function(){
			$('#div_login_temp').remove();
			$('#btn_login_register').css('display','inline-block');
		});
			
		return false; //False to avoid page from reloading
	}else{
		//empty username
		return false;
	}
}

//getTrimMangaTitle
function getTrimMangaTitle(mTitle, t){
	var trimTitle = mTitle.length > t ? mTitle.substring(0,t) + '...' : mTitle;
	return trimTitle;
}



























