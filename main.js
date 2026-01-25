import { init,draw_sprite,createTexture  } from "./2d_engine/2d_engine.js";

var ts = {}
var x = 0

init(async ()=>{
    ts.f = await createTexture(glGlobal,"./fried-chicken-breast-cheese-tomato-french-fries-ketchup-green-salad-side-view-jpg.jpg");
    ts.s = await createTexture(glGlobal,"./sample_640×426.jpeg");
    ts.a = await createTexture(glGlobal,"./astronaut-256.png");
},(dt)=>{
    x += 0.001;
    x = x%1;
    draw_sprite(ts.f,0.5,x,x);
    draw_sprite(ts.s,0.5,x,-0.5)
    draw_sprite(ts.a,0.5,-0.5,x)
});
