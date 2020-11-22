
var dog, normalDog, happyDog, foodStock, foodS, database
var feed, add
var fedTime, lastFed
var foodObj;

function preload(){

    normalDog = loadImage("dogImg.png");
    happyDog = loadImage("dogImg1.png");

}

function setup(){

    var canvas = createCanvas(800,500);

    dog = createSprite(700,240,10,10);
    dog.addImage(normalDog);
    dog.scale = 0.12;

    database = firebase.database();

    foodObj = new Food();

    foodStock=database.ref('Food');
    foodStock.on("value",function(data){
        foodS=data.val();
        foodObj.updateFoodStock(foodS)
    })

    

    feed=createButton("Feed the dog");
    feed.position(780,115);
    feed.mousePressed(feedDog);

    add=createButton("Add food");
    add.position(880,115);
    add.mousePressed(addFoods);

    

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
        lastFed=data.val();
    })

    


}

function draw(){
    background(46,139,87);

    foodObj.display();

    fill(255,255,254);
    textSize(15);
    
    if(lastFed>=12){
        text("Last Feed : "+lastFed%12 + " PM",200,30);
    }

    else if(lastFed==0){
        text("Last Feed : 12 AM",200,30);
    }

    else{
        text("Last Feed : "+lastFed + " AM",200,30);
    }
    



    drawSprites();
}

function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);

    foodS = foodS - 1;

    database.ref('/').update({
        Food:foodS,
        FeedTime:hour()
    })

}

function addFoods(){
    foodS++

    foodObj.updateFoodStock(foodObj.getFoodStock()+1);
    
    database.ref('/').update({
        Food:foodS
    })
}



