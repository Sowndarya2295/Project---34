//Create variables here
var dog, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg1.png");
  dogHappy = loadImage("dogHappy.png");
  bgImage = loadImage("bgImage.jpg");
}

function setup() {

  database = firebase.database();

  createCanvas(500,500);
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(bgImage);

  drawSprites();
  //add styles here
  
  textSize(25);
  fill("white");
  text("Food remaining :" + foodS , 80 ,130);
  text("Press Up Arrow Key to feed the peckish dog!!",50,80);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
   if(x<=0){
     x = 0;
   } else{
     x = x-1;
   }

   database.ref('/').update({
     Food:x
   })

  }




