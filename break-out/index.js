const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector("#score")
const blockWidth = 100
const blockHeight = 20
const boardWidth = 800
const boardHeigth = 500
const userStart = [300,10]
let currentPosition = userStart
const ballStart = [335,30]
let ballCurrrentPosition = ballStart
let timerid;
let xDirection = -2
let yDirection = 2
const ballDiameter = 30
let score = 0;
//Create The Blocks
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }    
}

const blocks = [
    new Block(10,450),
    new Block(120,450),
    new Block(230,450),
    new Block(340,450),
    new Block(450,450),
    new Block(560,450),
    new Block(670,450),
    new Block(10,400),
    new Block(120,400),
    new Block(230,400),
    new Block(340,400),
    new Block(450,400),
    new Block(560,400),
    new Block(670,400),
    new Block(10,350),
    new Block(120,350),
    new Block(230,350),
    new Block(340,350),
    new Block(450,350),
    new Block(560,350),
    new Block(670,350),
    
]

// draw the blocks
function addBlock(){
/**/
for (let i = 0; i < blocks.length; i++){
    const block = document.createElement('div');
block.classList.add('blocks')
block.style.left = blocks[i].bottomLeft[0] + 'px'
block.style.bottom = blocks[i].bottomLeft[1] + 'px'
grid.appendChild(block)
}
}
addBlock()

/*add user*/
const user = document.createElement('div')
user.classList.add('user')
user.style.left = currentPosition[0] + 'px'
user.style.bottom = currentPosition[1]+ 'px'
grid.appendChild(user)

//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px' 
}

//draw ball
function drawBall() {
    ball.style.left = ballCurrrentPosition[0] + 'px'
ball.style.bottom = ballCurrrentPosition[1]+ 'px'
}

//moveUser

function moveUser(e){
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
            currentPosition[0] -= 15 
            drawUser()
            break;
            }

            case 'ArrowRight':
                if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 1 
                drawUser()
                break;
                }
        default:
            break;
    }
}
document.addEventListener('keydown',moveUser)

const ball  = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)
   
//move ball
function moveBall() {
     ballCurrrentPosition[0] += xDirection
     ballCurrrentPosition[1] += yDirection
     drawBall()
     checkForCollisions()
    }
 timerid = setInterval(moveBall, 15)

 function checkForCollisions() {
      // check for block collisions
      for (let i = 0; i < blocks.length; i++) {
    if  ((ballCurrrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrrentPosition[0] < blocks[i].bottomRight[0])
    && ((ballCurrrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrrentPosition[1] < blocks[i].topLeft[1])){
        const allBlocks = Array.from(document.querySelectorAll('.blocks'))
        allBlocks[i].classList.remove('blocks')
        blocks.splice(i,1)
        changeDirection()
        score++
        scoreDisplay.innerHTML = score

        //check for win
        if(blocks.length === 0){
            scoreDisplay.innerHTML = 'YOU WIN'
            clearInterval(timerid)
            document.removeEventListener('keydown', moveUser)
        }
    
    }
        
       }
        
      
      // check for user collisions
      if (
        (ballCurrrentPosition[0] > currentPosition[0] && ballCurrrentPosition[0] < currentPosition[0] + blockWidth) 
      &&(ballCurrrentPosition[1] > currentPosition[1] && ballCurrrentPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection()
      }
    //check for wall collisions
    if(
       ballCurrrentPosition[0]>= (boardWidth - ballDiameter) ||
       ballCurrrentPosition[1] >= (boardHeigth - ballDiameter)||
       ballCurrrentPosition[0] <= 0 
    ) {
        changeDirection()
    }
    //check for game over
    if (ballCurrrentPosition[1]<=0) {
        clearInterval(timerid)
        scoreDisplay.innerHTML = "you lose"
        document.removeEventListener('keydown', moveUser)
    }

 }

// change direction of ball
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return   
    }
   if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
   }
   if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
   }
   if (xDirection === -2 && yDirection === 2 ) {
    xDirection = 2
    return
   }
}
