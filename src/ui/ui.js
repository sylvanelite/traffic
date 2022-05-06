
import { Renderer } from "./renderer.js";

//used for drawing generic UI effects that are not sprite-based
//should replace rect/text and hover
class UI{
	
	static EFFECT = {
		CHARACTER_HIGHLIGHT:'CHARACTER_HIGHLIGHT',
		CHARACTER_SELECTED:'CHARACTER_SELECTED',
	};
	
	static drawClickableRect(ctx,effect,x,y,width,height,canHover,isDisabled,text){
		let blockedStyle =  'rgba(200,0,0,0.7)';
		let hoverStyle = 'rgba(200,200,200,0.7)';
		switch(effect){
			case UI.EFFECT.CHARACTER_HIGHLIGHT:
				ctx.strokeStyle='3px solid orange';
				ctx.fillStyle='rgba(200,200,200,0.5)';
				break;
			case UI.EFFECT.CHARACTER_SELECTED:
				ctx.strokeStyle='3px solid black';
				ctx.fillStyle='rgba(0,200,0,0.7)';
				break;
			default:
				ctx.strokeStyle='1px solid black';
				ctx.fillStyle='rgba(200,200,200,0.7)';
		}
		ctx.fillRect(x,y,width,height);
		ctx.strokeRect(x,y,width,height);
		if(!canHover){return;}
		if(isDisabled){
			ctx.fillStyle = blockedStyle;
			ctx.fillRect(x,y,width,height);
			return;
		}
		if(Renderer.isMouseOver({x,y,width,height})){
			ctx.fillStyle = hoverStyle;
			ctx.fillRect(x,y,width,height);
		}
		
	}
}

export {UI};

