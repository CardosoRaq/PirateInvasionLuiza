class Cannon{

    constructor(x,y,width,height, angle){

        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.angle= angle;

        this.cannon_image= loadImage("assets/canon.png");
        this.cannon_base=loadImage("assets/cannonBase.png");
    }

    display(){

        if(keyIsDown(RIGHT_ARROW)&& this.angle< 60){
            this.angle= this.angle +1;
// ou this.angle+= 1;
        }

        if(keyIsDown(LEFT_ARROW)&& this.angle > -20){
            this.angle=this.angle-1;

        }

       //mostrar o cano do canhão
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.cannon_image,0,0, this.width, this.height);
        pop();
    
    
    
        //mostrar a base do canhão
       image(this.cannon_base,70,20,200,200);
       
       noFill();// mostra apenas a borda da figuras 
    }






}