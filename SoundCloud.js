/* $(document).ready(function(){

  let trackInput = document.getElementById('search');
  let submitButton = document.getElementById('submitButton');
  submitButton.onclick = SearchTracks;
*/

$(document).ready(function(){

	SC.initialize({
		client_id: 'fd4e76fc67798bfa742089ed619084a6',
	});
	//console.log(SC);
	var clientId = 'fd4e76fc67798bfa742089ed619084a6';
	var sound;
	var stopPlaying = $('#playStop');
	playlist = $('#musicResults');
	var isPlaying = false;
	var clear = $('#clear');

//Play specific track
/*	$(document).on('click', '#play', function(){
		SC.stream("/tracks/293").then(function(player) {
			sound = player;
			player.play();
		});
	});
*/

	$(document).on('click', '#song', function(){
		SC.stream("/tracks/" + $(this).data('id')).then(function(player) {
			sound = player;
			sound.play();
			stopPlaying.text('Stop');
		});

		$(document).on('click', stopPlaying, function(){
			if (!isPlaying) {
				sound.pause();
				stopPlaying.text('Click a link to play the song');
			}
		});
	});

	function songs(div){
		SC.get('/tracks',{
			q: $('#search').val()
		}).then(function(results){
			 	  console.log(results)
			 for(var i = 0; i < results.length; i++){
				 // console.log(results[i].id);
				 var playMe = "<li><a href='#' id='song' data-id=" + results[i].id + ">" + results[i].user.username + " " + results[i].title + "</li>"
				 var image = $('<img />', {
			     src: results[i].artwork_url,
			     width: '200px',
			     height: '100px'
			 }).appendTo($('#musicResults'));
				 div.append(playMe);
			 }
		});
	}

	$(document).on('click', '#search-button', function(){
		songs(playlist);
	});

});
