# Present 'Em

Present 'Em is a simple jQuery plugin which basically initiates an image viewer within the browser with **_much_** less fuss. Hence, you just present 'em :sunglasses:

## What you need

* jQuery (as of now :wink:)
* Images to be presented in gallery.
* Thumbnail images.

## How to use

- Include the `jquery.presentem.js` file after icluding jQuery.
- Include the `jquery.presentem.css` stylesheet in head.
- Create a section in your page which has thumbnails of original larger images. Clicking any one of those thumbnails will launch the gallery starting from first image.
- This will __require__ you to add a  `data-hqimg` attribute in every one of your thumbnail `img` tag containing the __relative__ path of corresponding larger image.
- Example :

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

That's it!

## License

![CC BY 4.0 License](https://i.creativecommons.org/l/by/4.0/88x31.png)
"Present ' Em" by Saksham Saxena is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).