
import { Renderer } from "./renderer.js";

//used for drawing generic UI effects that are not sprite-based
//should replace rect/text and hover
class UI{
	
	static EFFECT = {
		CHARACTER_HIGHLIGHT:'CHARACTER_HIGHLIGHT',
		CHARACTER_SELECTED:'CHARACTER_SELECTED',
		SEAT_SELECT:'SEAT_SELECT',
		COMBAT_CHARACTER_FATIGUE:'COMBAT_CHARACTER_FATIGUE',
		COMBAT_CHARACTER_SANITY:'COMBAT_CHARACTER_SANITY',
		COMBAT_ICON_FATIGUE:'COMBAT_ICON_FATIGUE',
		COMBAT_ICON_SANITY:'COMBAT_ICON_SANITY',
	};
	
	static drawClickableRect(ctx,effect,x,y,width,height,canHover,isDisabled,text){
		let blockedFill =  'rgba(200,0,0,0.7)';//style to use when it can't be clicked on
		let hoverFill = 'rgba(200,200,200,0.7)';//style to use when it can be clicked on
		let passiveStroke = '1px solid black';   //style to use when drawing without mouse over
		let passiveFill = 'rgba(200,200,200,0.7)';
		switch(effect){
			case UI.EFFECT.CHARACTER_HIGHLIGHT:
				passiveStroke='3px solid orange';
				passiveFill='rgba(200,200,200,0.5)';
				break;
			case UI.EFFECT.CHARACTER_SELECTED:
				passiveStroke='3px solid black';
				passiveFill='rgba(0,200,0,0.7)';
				break;
			case UI.EFFECT.SEAT_SELECT:
				passiveStroke='1px solid black';
				passiveFill='rgba(255,255,255,1)';
				break;
			case UI.EFFECT.COMBAT_CHARACTER_FATIGUE:
				passiveStroke='3px solid orange';
				passiveFill='rgba(200,150,100,0.7)';
				hoverFill='rgba(200,150,100,0.7)';
				break;
			case UI.EFFECT.COMBAT_CHARACTER_SANITY:
				passiveStroke='3px solid purple';
				passiveFill='rgba(200,0,200,0.7)';
				hoverFill='rgba(200,0,200,0.7)';
				break;
			case UI.EFFECT.COMBAT_ICON_FATIGUE:
				passiveStroke='1px solid orange';
				passiveFill='rgba(200,150,100,0)';
				hoverFill='rgba(200,150,100,0.7)';
				break;
			case UI.EFFECT.COMBAT_ICON_SANITY:
				passiveStroke='1px solid purple';
				passiveFill='rgba(200,0,200,0)';
				hoverFill='rgba(200,0,200,0.7)';
				break;
			default:
				passiveStroke='1px solid black';
				passiveFill='rgba(200,200,200,0.7)';
		}
		ctx.strokeStyle = passiveStroke;
		ctx.fillStyle = passiveFill;
		ctx.fillRect(x,y,width,height);
		ctx.strokeRect(x,y,width,height);
		if(!canHover){return;}
		if(isDisabled){
			ctx.fillStyle = blockedFill;
			ctx.fillRect(x,y,width,height);
			return;
		}
		if(Renderer.isMouseOver({x,y,width,height})){
			ctx.fillStyle = hoverFill;
			ctx.fillRect(x,y,width,height);
		}
		
	}

	static drawBitmapText(ctx,text,x,y,customFont){
		if(customFont){
			//TODO: different font?
		}
		//TODO: actually use bitmap font
		ctx.fillText(text, x,y);
	}
}

export {UI};

