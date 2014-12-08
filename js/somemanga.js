'use strict'; // Remonte d'avantage les erreurs de code

$(document).ready(function(){

//--------------------------------------------------------------OnStart-------------------------------------manga/somemanga.html

		// Add click listener to images
		$("#manga_img").click(loadNextMangaPage);	
		
		// Generates the navigation li
		liUpdate();
	
	
		//Add click listener to next chapters button
		$( ".next_chapter li" ).click(loadNextChapter);
		
		//Add click listener to previous chapters button
		$( ".pre_chapter li" ).click(loadPreviousChapter);
		
		//Add change listener on select
		$( "#chapter_select" ).change(selectChapter);
		
		//Keyboard left and right arrow listener
		$("body").keydown(function(e) {
		  if(e.keyCode == 37) { // left
			loadPreviousMangaPage();
		  }
		  else if(e.keyCode == 39) { // right
			loadNextMangaPage();
		  }
		});
		
		//Zoom Button
		$( "#zoom_btn" ).click(toggleImgZoom);
		
		//Add click listener to previous chapters button
		$( "#m_btn_back" ).click(loadPreviousMangaPage);

});	//--On start End

function loadNextMangaPage(){
	
	var curChapter = getChapterCurNb();
	var curPage = getPageCurNb();

	//Shrink image if x_large
	if ( $("#div_manga_img").hasClass('x_large') ){ 
		
		//Necessary for smooth transition
		$( "#manga_img" ).hide( 1, function() {
			toggleImgZoom();
		});
		$( "#manga_img" ).show(1);
	}
	
	//Change chapter when the end is reach
	if((curPage == chapterNb[curChapter][0]) && (curChapter != chapterNb.length-1)){ 

		curChapter++;
		curPage=0;
		//Change select state
		setSelectState(curChapter);
		$('#cur_chapter').html(curChapter);
	
	//No more page to view
	}else if (curChapter == chapterNb.length-1 && curPage== chapterNb[curChapter][0]){
		console.log('No next chapter');
		return 0;
	}
	//var type = chapterNb[c-1][1]; //get jpg or png
	var ext = getMangaExtension(curChapter);
	// Add padding to the page number -1 > 001
	curPage++;
	var page = getPadding(curPage);
	window.location.href = "#top_manga_div";//Scroll to top after clicking
	$('#manga_img').attr('src', '../m/shinozaki/'+ curChapter +'/' + page + '.' + ext);
		
	liUpdate();
}
function loadPreviousMangaPage(){
	
	var curChapter = getChapterCurNb();
	var curPage = getPageCurNb();
	
	//Change to previous chapter
	if((curPage == 1) && (curChapter > 1) && (chapterNb.length > 1)){ 
		curChapter--;
		curPage=chapterNb[curChapter][0] +1;
		//Change select state
		setSelectState(curChapter);
		$('#cur_chapter').html(curChapter);
	}else if (curChapter==1 & curPage==1){
		console.log('No previous page');
		return 0;
	}
	//var type = chapterNb[c-1][1]; //get jpg or png
	var ext = getMangaExtension(curChapter);
	// Add padding to the page number -1 > 001
	curPage--;
	var page = getPadding(curPage);
	$('#manga_img').attr('src', '../m/shinozaki/'+ curChapter +'/' + page + '.' + ext);
	
	liUpdate();
}

function loadThisMangaPage(z){

	var c = getChapterCurNb();
	var page = getPadding(z.innerHTML);
	var ext = getMangaExtension(c);

	if(page != '...'){
		$('#manga_img').attr('src', '../m/shinozaki/'+ c +'/' + page + '.' + ext);
	}

	liUpdate();
}
function selectChapter(){
	var sIndex = $("#chapter_select").prop("selectedIndex");
	var ext = getMangaExtension(sIndex+1);
	$('#manga_img').attr('src', '../m/shinozaki/'+ (sIndex+1) +'/' + '001' + '.' + ext);
	
	//h1 update
	$('#cur_chapter').html(sIndex+1);
	
	liUpdate();
	
	//Remove focus
	$('#chapter_select').blur();
}
function loadNextChapter(){
	var chapter = getChapterCurNb();
 
	if(chapter<chapterNb.length-1){
		var ext = getMangaExtension(chapter+1);
		$('#manga_img').attr('src', '../m/shinozaki/'+ (chapter+1) +'/' + '001' + '.' + ext);
		$('#cur_chapter').html(chapter+1);
		//Change select state
		setSelectState(chapter+1);
	}else{
		console.log('No next chapter');
	}
	liUpdate();
}
function loadPreviousChapter(){
	var chapter = getChapterCurNb();
 
	if(chapter>1){
		var ext = getMangaExtension(chapter-1);
		$('#manga_img').attr('src', '../m/shinozaki/'+ (chapter-1) +'/' + '001' + '.' + ext);
		$('#cur_chapter').html(chapter-1);
		//Change select state
		setSelectState(chapter-1);
	}else{
		console.log("No previous chapter");
	}
	liUpdate();
}
function setSelectState(a){
	
	var id = '#chapter_select option:nth-child(' + (a) +')';
	$(id).prop('selected', true);
}
function getMangaExtension(chapter){
	var ext = chapterNb[chapter][1];
	
	return ext;
}
function getPadding(a){
	var page = "" + a;
	var pad = "000";
	page = pad.substring(0, pad.length - page.length) + page;

	return page;
}

function getPageCurNb(){
	var a = $('#manga_img')[0].src;
	var b = a.indexOf('/',a.indexOf('/m/')+3); //First '/' after /m/
	var page = parseInt(a.substr(b+3,3)); // get current page number
	
	return page;
}

function getChapterCurNb(){
	var a = $('#manga_img')[0].src;
	var b = a.indexOf('/',a.indexOf('/m/')+3); //First '/' after /m/
	var chapter = parseInt(a.substr(b+1,1));// get current chapter number
	
	return chapter;
}

function liUpdate(){
	
	/*var ali = '</li><!--';
	var lia= '--><li>'*/
	var liGroup = '<!--';
	var curPage = getPageCurNb();
	var chapter = getChapterCurNb();
	
	$( ".btn_mid" ).empty();// Step 1: remove all li
	
	if( curPage < 5){ //Display 1-5 & last 2
		for(var i = 1;i<=8;i++) liGroup += '--><li>' + i + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		liGroup +=  '--><li>' + (chapterNb[chapter][0]-1) + '</li><!--';
		liGroup +=  '--><li>' + chapterNb[chapter][0] + '</li><!--';
	}else if(curPage > chapterNb[chapter][0]-5){ // display first 2 and last 5
		liGroup +=  '--><li>' + 1 + '</li><!--';
		liGroup +=  '--><li>' + 2 + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		for(var i = (chapterNb[chapter][0]-7);i<=(chapterNb[chapter][0]);i++) liGroup += '--><li>' + i + '</li><!--';
	}else{ // Display first 2 & last 2 & 5 pages centered on current page
		liGroup +=  '--><li>' + 1 + '</li><!--';
		liGroup +=  '--><li>' + 2 + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		for(var i = (curPage-2);i<=(curPage+2);i++) liGroup += '--><li>' + i + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		liGroup +=  '--><li>' + (chapterNb[chapter][0]-1) + '</li><!--';
		liGroup +=  '--><li>' + chapterNb[chapter][0] + '</li><!--';	
	}

	$( ".btn_mid" ).append( liGroup );
	
	//Attach click to the li
	$( ".btn_mid li" ).click(function() {
	  //console.log(this);
	  loadThisMangaPage(this);
	  
	});

	//current page highlighted on the li bar
	var liNb = $('#btn_mid').children().length; //number of li
	
	//Comparing the text in the li with the current page. Test need to be done on an individual ul. #btn_mid
	for(i = 1; i <= liNb; i++){
		var curLi = '#btn_mid li:nth-child(' + i + ')';
		if($(curLi).text() == curPage){
			var allLi = '.btn_mid li:nth-child(' + i + ')'; //This one is the class
			$( allLi ).addClass( 'ch_selected' );
		}
	}	
}
function toggleImgZoom(){


	if ( $("#div_manga_img").hasClass('x_large') ){
		var image = $('#manga_img');
		var originalWidth = image[0].naturalWidth; 
		var originalHeight = image[0].naturalHeight;
		
		$("#div_manga_img").removeClass('x_large');
		$("#div_manga_img").css('position','static');
		$("#div_p_div_manga_img").height('auto');
		$("#div_manga_img").width('auto');
		$("#manga_img").css('max-height','auto');
		$("#manga_img").css('max-width','auto');

		
	} else {

		var width = $("#manga_img").width();
		var height = $("#manga_img").height();
		var proportion =  height / width;
	
		width = $("body").width();
		$("#div_manga_img").addClass('x_large');
		$("#div_manga_img").css('position','absolute');
		$("#div_manga_img").css('left','0');
		$("#div_manga_img").width(width);
		$("#div_p_div_manga_img").height(width * proportion);
		$("#manga_img").css('height','95%');
		$("#manga_img").css('width','95%');
	}
}