//Create variables here
var dog;
var HappyDog;
var database;
var foodS;
var foodStalk;
var dog;
var happydog;
var foodObj;
var feed,addFood;
var lastFed;


function preload()
{
	//load images here
  dogImage=loadImage("images/Dog.png");
  happydog=loadImage("images/happydog.png");
  milkBottle=loadImage("images/Milk.png")

}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  dog=createSprite(250,300,20,20)
  dog.addImage(dogImage)
  dog.scale=0.15
  foodStalk=database.ref('food');
  foodStalk.on("value",readStalk);
  textSize(20)
  foodObj=new Food()

  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46, 139, 87)
  foodObj.display();

  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill(255,255,255)
  textSize(15)
  if(lastFed>=12){
    text("lastfed: "+lastFed%12+" PM",350,30)
  }
  else if(lastFed===0){
    text("lastFed: 12 AM",350,30)
  }
  else{
    text("lastFed: "+lastFed+" AM",350,30)
  }
  drawSprites();
    
  }
  
  function readStalk(data){
    foodS=data.val();
   foodObj.updateFoodStalk(foodS)
  }
  function addFoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
  }
  function feedDog(){
    dog.addImage(happydog)
    if(foodObj.getFoodStalk()<=0){
foodObj.updateFoodStalk(foodObj.getFoodStalk()*0)
    }
    else{
      foodObj.updateFoodStalk(foodObj.getFoodStalk()-1)
    }
    database.ref('/').update({
      food:foodObj.getFoodStalk(),
      feedTime:hour()
    })
  }





