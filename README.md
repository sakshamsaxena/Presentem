# Present 'Em

Present 'Em is a simple jQuery plugin which basically initiates an image viewer within the browser with **_much_** less fuss. Hence, you just present 'em :sunglasses:

### Features

* Light and flexible
* Intuitive gallery
* Adjustable frame
* Preloader for images
* Ways to initiate : __many__! 
* Ways to kill : 3 ('X' button at top right, 'Esc' key on keyboard, clicking anywhere outside frame)

### Options

- `fHeight` sets frame height (in pixels)
- `fWidth` sets frame width (in pixels)

### What you need

* jQuery (as of now :wink:)
* Images to be presented in gallery.
* Thumbnail images.

### How to use

- Include the `jquery.presentem.js` file after icluding jQuery.
- Include the `jquery.presentem.css` stylesheet in head.
- Create a section in your page which has thumbnails of original larger images. (You need an `img` tag, as this tag is looked up only )
- This will __require__ you to add a  `data-hqimg` attribute in every one of your thumbnail `img` tag containing the __relative__ path of corresponding larger image.
- Call `presentem()` by attaching it to the thumbnail images selector. (You need to attach `presentem()` to the `img` tags with `data-hqimg` attribute )

### Example (Conservative approach) :

HTML 
```html
<div id="thumbs">
    <img src="imgs/thumbs/thumb_01.jpg" data-hqimg="hq_imgs/hq_img_01.jpg">
    <img src="imgs/thumbs/thumb_02.jpg" data-hqimg="hq_imgs/hq_img_02.jpg">
    <img src="imgs/thumbs/thumb_03.jpg" data-hqimg="hq_imgs/hq_img_03.jpg">
    <img src="imgs/thumbs/thumb_04.jpg" data-hqimg="hq_imgs/hq_img_04.jpg">
</div>
```
JavaScript : 
```javascript
$("div#thumbs img").click(function(){
    $("div#thumbs img").presentem();
})
```

### Example (Free-thinker approach):

HTML
```html
<section>
    <img src="imgs/thumbs/thumb_01.jpg" data-hqimg="hq_imgs/hq_img_01.jpg" class="view">
</section>
<section>
    <img src="imgs/thumbs/thumb_02.jpg" data-hqimg="hq_imgs/hq_img_02.jpg" class="view">
</section>
<section>
    <img src="imgs/thumbs/thumb_03.jpg" data-hqimg="hq_imgs/hq_img_03.jpg" class="view">
</section>
<section>
    <img src="imgs/thumbs/thumb_04.jpg" data-hqimg="hq_imgs/hq_img_04.jpg" class="view">
</section>
```
Javascript :
```javascript
$(window).load(function(){
    $(".view").presentem({fHeight:400, fWidth:600});
})
```
That's it! Get a peek at it at this [demo](http://sakshamsaxena.github.io/Presentem/).

### License

<p align="center">
    <img src="https://i.creativecommons.org/l/by/4.0/88x31.png" alt="CC BY 4.0 License">
</p>
"Present ' Em" by Saksham Saxena is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).