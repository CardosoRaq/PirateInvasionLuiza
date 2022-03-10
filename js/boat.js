class Boat{

    constructor(x, y, width, height, boatPos){

        this.body = Bodies.rectangle(x,y,width, height);
        this.width = width;
        this.height = height;

        this.image = loadImage("/assets/boat.png");
        this.boatPosition = boatPos;
        World.add(world, this.body);

    }

    display(){

        push();
        
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.width, this.height);


        pop();



    }

    remove(index){

        setTimeout(() => {

            Matter.World.remove(world, boats[index].body);
            delete boats[index];

        }, 2000); //2000 milisegundos = 2 segundos


    }



}