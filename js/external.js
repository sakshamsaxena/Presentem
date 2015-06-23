$(window).load(function(){
	var wid=500,ht=500;
	$("button").click(function(){
		if($("#width").val() && $("#height").val()) {
		wid = $("#width").val();
		ht = $("#height").val();
		alert("You've set the frame dimensions. Now click on an image to launch gallery.");}
		else {
		alert("You haven't set the frame dimensions. Using default dimensions (500,500)")}
		return wid,ht;
	})
    $("div#outer_ring img").click(function() {
        $("div#outer_ring img").presentem({fWidth:wid, fHeight:ht});
    });
	
	
});

