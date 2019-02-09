import _ from "lodash";
import { Ball, RADIUS, AimLine, rowToTopPosition, colToLeftPosition, BOX_TILE_SIZE } from "./renderers";

const NO_COLISION = 0;
const SIDE = 1;
const TOP_BOTTOM = 2;
const distance = ([x1, y1], [x2, y2]) =>
        Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        
let aim_vector = {start: [0,0], current: [0,0]};        

function collidesWithBox(entities, ball) {
    let boxes = Object.keys(entities).filter(key => key.startsWith("box"));
    let colType = NO_COLISION;
    for(var boxId in boxes) {
        let box = entities[boxes[boxId]];
         let box_y = rowToTopPosition(box.col);
         let box_x = colToLeftPosition(box.row);
         if (ball.position[0] + RADIUS + ball.speed[0] > box_x && 
            ball.position[0] + ball.speed[0] < box_x + BOX_TILE_SIZE && 
            ball.position[1] + RADIUS > box_y && 
            ball.position[1] < box_y + BOX_TILE_SIZE) {
                return SIDE;
        } else if (ball.position[0] + RADIUS > box_x && 
            ball.position[0] < box_x + BOX_TILE_SIZE && 
            ball.position[1] + RADIUS + ball.speed[1] > box_y && 
            ball.position[1] + ball.speed[1] < box_y + BOX_TILE_SIZE) {
                return TOP_BOTTOM;
        }
    }
    return colType;
}

const MoveBall = (entities, { time, screen }) => {

    let ball_size = RADIUS; 
    let ball_rad = ( ball_size / 2);   
    
    Object.keys(entities).forEach(ballId => {
        if(! ballId.startsWith("ball")) return;
        let ball = entities[ballId];
        if(ball.state != "moving") return;
        
        let next_position = [
            ball.position[0] + ( ball.speed[0] * ball.direction[0] ),
            ball.position[1] + ( ball.speed[1] * ball.direction[1] )
        ];
        
        let isCollision = collidesWithBox(entities, ball);

        if(next_position[0] > ( screen.width - ball_size - 7 ) || next_position[0] < ball_rad) {
            ball.direction[0] *= -1; 
        }

        if(next_position[1] < ball_rad + entities.scorebar.height + 3) {
            ball.direction[1] *= -1; 
        }

        if(next_position[1] > (screen.height - ball_size - entities.floor.height - 5)) {        
            if(ballId == "ball") {
                entities.ball.state = "stopped";
                entities.ball.position = [
                    next_position[0],
                    entities.ball.start[1],
                ];
            } else {
                delete entities[ballId]; 
            }
        } else {
            // all is good, update new position now
            ball.position = next_position;        
        }
        
    });
    
    return entities;
};

const AimBallsStart = (entities, { touches }) => {
    if(entities.ball.state == "stopped") {
        touches.filter(x => x.type === "start").forEach(t => {        
            aim_vector.start = [t.event.pageX, t.event.pageY];
            aim_vector.current = [t.event.pageX, t.event.pageY];
            aim_line = [
                entities.ball.position[0] + RADIUS / 2,
                entities.ball.position[1] + RADIUS / 2
            ];
            entities['aimline'] = {
                start: aim_line,
                end: aim_line,
                strokewidth: 3,
                renderer: AimLine
            };        
	    });
    
        touches.filter(t => t.type === "move").forEach(t => {
            aim_vector.current = [t.event.pageX, t.event.pageY];
            let d = distance(aim_vector.start, aim_vector.current);
            if(d > 10) {
                let end_x = entities.aimline.start[0] + ((aim_vector.current[0] - aim_vector.start[0])*(-1*(d/2)));
                let end_y = entities.aimline.start[1] + ((aim_vector.current[1] - aim_vector.start[1])*(-1*(d/2)));
                entities.aimline.end = [end_x, end_y];
                entities.aimline.strokewidth = (d/5); 
            }
        });
    }

	return entities;
};

const AimBallsRelease = (entities, { time, touches }) => {
	touches.filter(t => t.type === "end").forEach(t => {
        aim_vector.current = [t.event.pageX, t.event.pageY];
        delete entities.aimline;
        let d = distance(aim_vector.start, aim_vector.current);
        if(t.event.pageY > entities.floor.height && d > 10 && entities.ball.state == "stopped") {
            let x1 = (aim_vector.current[0] - aim_vector.start[0]);
            let y1 = (aim_vector.current[1] - aim_vector.start[1]);            
            entities.ball.direction[0] = x1 * -1;
            entities.ball.direction[1] = y1 * -1;
            entities.ball.speed[0] = 1;
            entities.ball.speed[1] = 1;
            entities.ball.state = "moving";
            last_ball_spawn = time.current;
        }
	});
	return entities;
};

const SpawnBall = (entities,  { touches }) => {
    touches.filter(t => t.type === "press").forEach(t => {
            entities["ball" + ++Object.keys(entities).length] = {
                type: "ball",
                state: "moving",
                color: "white",
                position: [t.event.pageX, t.event.pageY],
                renderer: Ball,
                speed: [2.0, 2.0], 
                direction: [-3.5,-0.5]
            };
            entities.scorebar.balls++;
        }
    );
    return entities;
};
  
export { MoveBall, SpawnBall, AimBallsStart, AimBallsRelease };