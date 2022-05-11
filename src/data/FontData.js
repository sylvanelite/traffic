const FontData = {};

const boxy = {
'32': {x:0 ,y:0 ,width:1 ,height:1 },
//SPACE 
'33': {x:1 ,y:0 ,width:4 ,height:8   },
//! 
'34': {x:6 ,y:0 ,width:7 ,height:8   },
//" 
'35': {x:14 ,y:0 ,width:9 ,height:8   },
//# 
'36': {x:24 ,y:0 ,width:7 ,height:8   },
//$ 
'37': {x:32 ,y:0 ,width:10 ,height:8   },
//% 
'38': {x:43 ,y:0 ,width:9 ,height:8   },
//& 
'39': {x:53 ,y:0 ,width:4 ,height:5   },
//' 
'40': {x:58 ,y:0 ,width:5 ,height:8   },
//( 
'41': {x:64 ,y:0 ,width:5 ,height:8   },
//) 
'42': {x:70 ,y:0 ,width:6 ,height:7   },
//* 
'43': {x:77 ,y:0 ,width:8 ,height:8   },
//+ 
'44': {x:86 ,y:2 ,width:5 ,height:6  },
//, 
'45': {x:92 ,y:2 ,width:6 ,height:4  },
//- 
'46': {x:99 ,y:3 ,width:5 ,height:6  },
//. 
'47': {x:104 ,y:0 ,width:6 ,height:8   },
/// 
'48': {x:1 ,y:9 ,width:7 ,height:8   },
//0 
'49': {x:9 ,y:9 ,width:4 ,height:8   },
//1 
'50': {x:14 ,y:9 ,width:7 ,height:8   },
//2 
'51': {x:22 ,y:9 ,width:7 ,height:8   },
//3 
'52': {x:30 ,y:9 ,width:7 ,height:8   },
//4 
'53': {x:38 ,y:9 ,width:7 ,height:8   },
//5 
'54': {x:46 ,y:9 ,width:7 ,height:8   },
//6 
'55': {x:54 ,y:9 ,width:7 ,height:8   },
//7 
'56': {x:62 ,y:9 ,width:7 ,height:8   },
//8 
'57': {x:70 ,y:9 ,width:7 ,height:8   },
//9 
'58': {x:1 ,y:18 ,width:4 ,height:8   },
//: 
'59': {x:6 ,y:18 ,width:4 ,height:8   },
//; 
'60': {x:11 ,y:18 ,width:6 ,height:8   },
//< 
'61': {x:18 ,y:19 ,width:6 ,height:6  },
//= 
'62': {x:25 ,y:18 ,width:6 ,height:8   },
//> 
'63': {x:32 ,y:18 ,width:8 ,height:8   },
//? 
'64': {x:41 ,y:18 ,width:8 ,height:8   },
//@ 
'65': {x:1 ,y:27 ,width:7 ,height:8   },
//A 
'66': {x:9 ,y:27 ,width:7 ,height:8   },
//B 
'67': {x:17 ,y:27 ,width:7 ,height:8   },
//C 
'68': {x:25 ,y:27 ,width:7 ,height:8   },
//D 
'69': {x:33 ,y:27 ,width:7 ,height:8   },
//E 
'70': {x:41 ,y:27 ,width:7 ,height:8   },
//F 
'71': {x:49 ,y:27 ,width:7 ,height:8   },
//G 
'72': {x:57 ,y:27 ,width:7 ,height:8   },
//H 
'73': {x:65 ,y:27 ,width:4 ,height:8   },
//I 
'74': {x:70 ,y:27 ,width:7 ,height:8   },
//J 
'75': {x:78 ,y:27 ,width:7 ,height:8   },
//K 
'76': {x:86 ,y:27 ,width:7 ,height:8   },
//L 
'77': {x:94 ,y:27 ,width:9 ,height:8   },
//M 
'78': {x:1 ,y:36 ,width:8 ,height:8   },
//N 
'79': {x:10 ,y:36 ,width:7 ,height:8   },
//O 
'80': {x:18 ,y:36 ,width:7 ,height:8   },
//P 
'81': {x:26 ,y:36 ,width:8 ,height:8   },
//Q 
'82': {x:35 ,y:36 ,width:7 ,height:8   },
//R 
'83': {x:43 ,y:36 ,width:7 ,height:8   },
//S 
'84': {x:51 ,y:36 ,width:8 ,height:8   },
//T 
'85': {x:60 ,y:36 ,width:7 ,height:8   },
//U 
'86': {x:68 ,y:36 ,width:7 ,height:8   },
//V 
'87': {x:76 ,y:36 ,width:9 ,height:8   },
//W 
'88': {x:86 ,y:36 ,width:7 ,height:8   },
//X 
'89': {x:94 ,y:36 ,width:8 ,height:8   },
//Y 
'90': {x:103 ,y:36 ,width:7 ,height:8   },
//Z 
'91': {x:1 ,y:45 ,width:5 ,height:8   },
//[ 
'92': {x:7 ,y:45 ,width:6 ,height:8   },
//\ 
'93': {x:14 ,y:45 ,width:5 ,height:8   },
//] 
'94': {x:20 ,y:45 ,width:8 ,height:6   },
//^ 
'95': {x:29 ,y:49 ,width:6 ,height:4  },
//_ 
'96': {x:36 ,y:45 ,width:5 ,height:8   },
//` 
'97': {x:1 ,y:27 ,width:7 ,height:8   },
//A 
'98': {x:9 ,y:27 ,width:7 ,height:8   },
//B 
'99': {x:17 ,y:27 ,width:7 ,height:8   },
//C 
'100': {x:25 ,y:27 ,width:7 ,height:8   },
//D 
'101': {x:33 ,y:27 ,width:7 ,height:8   },
//E 
'102': {x:41 ,y:27 ,width:7 ,height:8   },
//F 
'103': {x:49 ,y:27 ,width:7 ,height:8   },
//G 
'104': {x:57 ,y:27 ,width:7 ,height:8   },
//H 
'105': {x:65 ,y:27 ,width:4 ,height:8   },
//I 
'106': {x:70 ,y:27 ,width:7 ,height:8   },
//J 
'107': {x:78 ,y:27 ,width:7 ,height:8   },
//K 
'108': {x:86 ,y:27 ,width:7 ,height:8   },
//L 
'109': {x:94 ,y:27 ,width:9 ,height:8   },
//M 
'110': {x:1 ,y:36 ,width:8 ,height:8   },
//N 
'111': {x:10 ,y:36 ,width:7 ,height:8   },
//O 
'112': {x:18 ,y:36 ,width:7 ,height:8   },
//P 
'113': {x:26 ,y:36 ,width:8 ,height:8   },
//Q 
'114': {x:35 ,y:36 ,width:7 ,height:8   },
//R 
'115': {x:43 ,y:36 ,width:7 ,height:8   },
//S 
'116': {x:51 ,y:36 ,width:8 ,height:8   },
//T 
'117': {x:60 ,y:36 ,width:7 ,height:8   },
//U 
'118': {x:68 ,y:36 ,width:7 ,height:8   },
//V 
'119': {x:76 ,y:36 ,width:9 ,height:8   },
//W 
'120': {x:86 ,y:36 ,width:7 ,height:8   },
//X 
'121': {x:94 ,y:36 ,width:8 ,height:8   },
//Y 
'122': {x:103 ,y:36 ,width:7 ,height:8   },
//Z 
'123': {x:42 ,y:45 ,width:5 ,height:8   },
//{ 
'124': {x:48 ,y:45 ,width:5 ,height:8   },
//| 
'125': {x:54 ,y:45 ,width:5 ,height:8   },
//{ 
'126': {x:60 ,y:45 ,width:9 ,height:5  },
//~

};
const monogram = {};

FontData.boxy = boxy;
FontData.monogram = monogram;

export { FontData };
