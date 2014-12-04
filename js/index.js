'use strict'; // Remonte d'avantage les erreurs de code



//-------------------On Start----------------//
$(document).ready(function(){


	generateTopList();
	generateLatestMangaList();
	
	//Boutton Random
	$("#btn_random").click(function(){
		
		emptyM1();
		generateRandomMangaList();
		$("#main_div_p1_2").show("slow");
		fakeLoading();
	});

	//Boutton Latest
	$("#btn_latest").click(function(){
		generateLatestMangaList();
		fakeLoading();
	});
	
	//Boutton A-Z
	$("#btn_az").click(function(){
		$container.isotope({ sortBy: 'name' })
	});
	
	//Boutton Collapse
	$("#btn_collapse").click(function(){
		
		var height = parseInt($("#main_div_p1_2").height());
		//alert(height);
		if(height>10){
			$("#main_div_p1_2").hide("slow", emptyM1);
		}else{
			generateLatestMangaList();
			fakeLoading();
		}
	});
	
//-------------Isotope-------------//
	// init Isotope
	var $container = $('#main_div_p2_2').isotope({
	itemSelector: '.m2',
	layoutMode: 'fitRows',
	getSortData: {
		name: '.m2_t',
		volume: '.m2_v parseInt',
		year: '.m2_d parseInt'
	}
  });

  // bind sort button click
	$('#sorts').on( 'click', 'button', function() {
		var sortValue = $(this).attr('data-sort-value');
		$container.isotope({ sortBy: sortValue });
	});

  // change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
		});
	});

//------------------------Fin Isotope----------------//

});	//--On start End


//Creation d'une liste random
function generateRandomMangaList(){
	var div = '';
	var randomIdNoReapeat = [];
	var rndThumbNoReapeat = [];
	var id = '';
	
	emptyM1();
	rndThumbNoReapeat = getRandomNoRepeat(12,70);
	randomIdNoReapeat = getRandomNoRepeat(12,mangaList.length-1);
	
	for(var i = 0; i < 12; i++){
		
		div = '<div id="m' + i + '" class="m1">' + 
		'<div class="m1_img">' +
		'<a href="manga/somemanga.html"><img class="thumb" src="' + getThumbnailById(rndThumbNoReapeat[i]) + '"/></a></div>' +
		'<p class="m1_t">' + getTrimMangaTitle(getMangaTitleById(randomIdNoReapeat[i]),11) + '</p>' +
		'<p class="m1_d">' + getMangaYearById(randomIdNoReapeat[i]) + '</p>' +
		'<p class="m1_c">Vol: ' + getMangaChapterById(randomIdNoReapeat[i]) +'</p>' +
		'</div>';
		
		$( "#main_div_p1_2" ).append( div );
		id = '#m' + i;
		$( id ).css( "background", getRandomColor() );
	}
}
//Creation de latest list
function generateLatestMangaList(){
	var div = '';
	var randomIdNoReapeat = [];
	var rndThumbNoReapeat = [];
	var id = '';
	
	emptyM1();
	rndThumbNoReapeat = getRandomNoRepeat(12,70);
	randomIdNoReapeat = getRandomNoRepeat(12,mangaList.length-1);
	
	for(var i = 0; i < randomIdNoReapeat.length; i++){
		
		div = '<div id="m' + i + '" class="m1">' +
		'<div class="m1_img">' +
		'<a href="manga/somemanga.html"><img class="thumb" src="' + getThumbnailById(rndThumbNoReapeat[i]) + '"/></a></div>' +
		'<p class="m1_t">' + getTrimMangaTitle(getMangaTitleById(randomIdNoReapeat[i]),11) + '</p>' +
		'<p class="m1_d">' + getRandomReleaseTime() + '</p>' +
		'<p class="m1_c">Vol: ' + getMangaChapterById(randomIdNoReapeat[i]) +'</p>' +
		'</div>';
		
		$( "#main_div_p1_2" ).append( div );
		id = '#m' + i;
		$( id ).css( "background", getRandomColor() );
	}
	
	$("#main_div_p1_2").show("slow");
}
//Creation d'une liste top
function generateTopList(){
	var div = '';
	var randomId = '';
	var id = '';
	for(var i = 0; i <= 22; i++){
		var book = '';
		if(getMangaYearById(i).indexOf("present") >= 0){
			book='<img src="images/openedbook.png" />';
		}else{
			book='<img src="images/closedbook.gif" />';
		}
		div = '<div id="m2_' + i + '" class="m2">' + 
		'<div class="m2_img">' + book + '</div>' +//m2_img
		'<div class="m2_1">' +
		'<a href="manga/somemanga.html" class="m2_link"><p class="m2_t ">' + getTrimMangaTitle(getMangaTitleById(i),30) + '</p></a>' +
		'<p class="m2_c">Vol: <span class="m2_v">' + 	getMangaChapterById(i) + '</span></p>' +
		'</div>' +//m2_1
		'<div class="m2_2">' +
		'<p class="m2_d">' + getMangaYearById(i) + '</p>' +
		'</div>' +//m2_2
		'</div>';//m2
		
		$( "#main_div_p2_2" ).append( div );
	}
}

//getRandomMangaId
function getRandomMangaId(){
	var id = 0;
	id = Math.floor(Math.random() * mangaList.length);
	return id;
}

//getMangaTitleById
function getMangaTitleById(id){
	var title = mangaList[id][0];
	return title;
}

//getMangaChapterById
function getMangaChapterById(id){
	var mChapter = mangaList[id][3];
	return mChapter;
}

//getMangaYearById
function getMangaYearById(id){
	var mYear = mangaList[id][4];
	return mYear;
}

//getRandomReleaseTime
function getRandomReleaseTime(){
	var mTime = '';
	var rnd = Math.floor(Math.random()*5 + 1);
	
	if (rnd ==1){
		mTime = 1 + ' hour ago';
	}else{
		mTime = rnd + ' hours ago';
	}
	return mTime;
}

//getThumbnailById
function getThumbnailById(id){
	return 'images/small/' + id + '.jpg'
}

//Vider la div p1_2
function emptyM1(){
	$("#main_div_p1_2").empty();
}
//Fake Loading bar
function fakeLoading(){

	$( "#main_div_p1_2" ).append( '<div id="progress_bar"></div>' );

	$("#progress_bar").animate({
      width:'+=50%',
    }, 300, function() {
   $( "#progress_bar" ).remove();
  });

}
//Creer une couleur hexadecimal au hazard
function getRandomColor() {
    var lettres = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += lettres[Math.round(Math.random() * 15)];
    }
    return color;
}
//getRandomNoRepeat - Duplicate manga on front page can be avoided with this n=number of numbers wanted, r = range
function getRandomNoRepeat(n, r) {
    var oNumbers = []; // ordered array
    for (var i = 0; i < r; i++) {
        oNumbers[i] = i + 1;
    }
    var rNumber;// random number between 0 and range
    var result = []; // Array of non repeating numbers
    for (var i = 0; i < n; i++) {
        rNumber = Math.floor(Math.random() * oNumbers.length);
        result[i] = oNumbers[rNumber];
        oNumbers.splice(rNumber,1);//Remove selected index from array
    }
    return result;
}