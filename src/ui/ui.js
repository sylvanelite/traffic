import { FontData } from '../data/FontData.js';
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
		CHARACTER_ABILITY:'CHARACTER_ABILITY',
		GENERIC_HOVER:'GENERIC_HOVER',
		OK_BUTTON:'OK_BUTTON',
		TOWN_LABEL:'TOWN_LABEL',
		NEIGHBOUR:'NEIGHBOUR'
	};
	
	static drawClickableRect(ctx,effect,x,y,width,height,canHover,isDisabled){
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
			case UI.EFFECT.CHARACTER_ABILITY:
				passiveStroke='1px solid purple';
				passiveFill='rgba(200,0,200,0)';
				hoverFill='rgba(200,0,200,0.7)';
				break;
			case UI.EFFECT.GENERIC_HOVER:
				passiveStroke='';
				passiveFill='rgba(200,200,200,0)';
				hoverFill='rgba(200,200,200,0.7)';
				break;
			case UI.EFFECT.OK_BUTTON:
				passiveStroke='3px solid black';
				passiveFill='rgba(200,200,200,5)';
				hoverFill='rgba(200,200,200,0.7)';
				break;
			case UI.EFFECT.TOWN_LABEL:
				passiveStroke='';
				passiveFill='rgba(200,200,200,0)';
				hoverFill=passiveFill;
				blockedFill =  'rgba(128,128,128,1)';
				break;
			case UI.EFFECT.TOWN_LOGO:
				ctx.fillStyle='rgba(255,255,255,0.7)';
				if(isDisabled){
					ctx.fillStyle='rgba(255,0,0,0.7)';
				}
				if(Renderer.isMouseOver({x,y,width,height})){
					ctx.beginPath();
					ctx.arc(x+width/2, y+height/2, width/2, 0, 2 * Math.PI);
					ctx.fill();
				}
				return;//don't draw a rect
				break;
			case UI.EFFECT.NEIGHBOUR:
				passiveStroke='';
				if(Renderer.isMouseOver({x,y,width,height})){
					passiveStroke='3px solid black';
				}
				passiveFill = '#b1d0ff';
				hoverFill='#b1d0ff';
				break;
			default:
				passiveStroke='1px solid black';
				passiveFill='rgba(200,200,200,0.7)';
		}
		ctx.fillStyle = passiveFill;
		ctx.fillRect(x,y,width,height);
		if(passiveStroke){
			ctx.strokeStyle = passiveStroke;
			ctx.strokeRect(x,y,width,height);
		}
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

	static FONT={
		'OK':'OK',
		'STAT_ATTACK':'STAT_ATTACK',
		'ABILITY_DESC':'ABILITY_DESC',
		'TOWN_LABEL':'TOWN_LABEL',
		'TOWN_LOGO':'TOWN_LOGO',
		'NEIGHBOUR':'NEIGHBOUR'
	};



	static drawBitmapText(ctx,text,x,y,customFont){
		if(customFont){
			if(customFont == UI.FONT.TOWN_LABEL){
				for(const ch of text){
					const scaleFactor =1.333;
					const chData = FontData.boxy[ch.charCodeAt(0)];
					const boxySprite = Renderer.getSprite(
						'font/boxy_bold_font.png',
						x,y-chData.height,chData.width,chData.height,chData.x,chData.y
					);
					Renderer.drawSpriteScaled(boxySprite,chData.width*scaleFactor,chData.height*scaleFactor,ctx);
					x+=chData.width*scaleFactor;
				}
				return;
			}
		}
		ctx.fillStyle = '#000';
		//TODO: actually use bitmap font
		ctx.fillText(text, x,y);
	}
	static getBitmapTextDimensions(ctx,text,customFont){
		//TODO: return length based on bitmap dimensions
		const dims = ctx.measureText(text);
		return {
			width:dims.width,
			height:15
		}
	}
}

export {UI};

