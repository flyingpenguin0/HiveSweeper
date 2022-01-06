export const levelArray = [
	{level:1, widthNum:10, heightNum:9, beeNum:15 },
	{level:2, widthNum:20, heightNum:11, beeNum:35},
	{level:3, widthNum:26, heightNum:15, beeNum:75},
	{level:4, widthNum:36, heightNum:21, beeNum:130},
];

export type Cell = {
	index : number,
	isBee : boolean,
	neighbor : number,
	isOpen : boolean,
	isFlagged : boolean,
	isQuestion : boolean,
	top : number,
	left : number
}

export const Shuffle = (level : number ) : Array<Cell> => {
	
	const beeNum : any = levelArray.find((elem)=>elem.level==level)?.beeNum;
	const widthNum : any = levelArray.find((elem)=>elem.level==level)?.widthNum;
	const heightNum : any = levelArray.find((elem)=>elem.level==level)?.heightNum;

	const height : number = Math.floor(window.innerHeight*0.8/(heightNum*0.75));
	const width : number = 0.5*height*Math.sqrt(3);
	const totNum : number = (widthNum*2-1)*(heightNum-1)*0.5+widthNum;

	let list = new Array(totNum).fill(null).map((_, i) => i + 1);
	let shuffledList : Array<number> = list.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);

	let beeList = shuffledList.slice(0, beeNum);
	
	let cells : Array<Cell> = list.map(cell => {
		if(beeList.includes(cell)){
			return({index:cell, isBee:true, neighbor:0, isOpen:false, isFlagged:false, isQuestion:false, top:0, left:0});
		} else {
			return({index:cell, isBee:false, neighbor:0, isOpen:false, isFlagged:false, isQuestion:false, top:0, left:0});
		}
	});

	let cells2 : Array<Cell> = cells.map(cell => {
		let neighborlist : Array<number> = [];
		switch( true ){
			// first row ( top-left corner / middle of top row / top-right corner )
			case cell.index == 1 :
				neighborlist = [2, widthNum+1];
				cell.top = 0;
				cell.left = 0;
				break;
			case cell.index < widthNum :
				neighborlist = [cell.index-1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum] ;
				cell.top = 0;
				cell.left = (cell.index-1);
				break;
			case cell.index == widthNum :
				neighborlist = [widthNum-1, widthNum*2-1] ;
				cell.top = 0;
				cell.left = (widthNum-1);
				break;

			// left row ( bottom-left corner / start of odd row / start of even row )
			case cell.index == (2*widthNum-1)*(0.5*(heightNum-1))+1 :
				neighborlist = [cell.index-widthNum+1, cell.index+1];
				cell.top = (heightNum - 1) * 0.75;
				cell.left = 0;
				break;
			case (cell.index-1)%(2*widthNum-1) == 0 :
				neighborlist = [cell.index-widthNum+1, cell.index+1, cell.index+widthNum];
				cell.top = (cell.index - 1)/(2*widthNum-1) * 2 * 0.75;
				cell.left = 0;
				break;
			case (cell.index-widthNum-1)%(2*widthNum-1) == 0 :
				neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = ((cell.index-widthNum-1)/(2*widthNum-1)* 2 + 1) * 0.75;
				cell.left = 0.5;
				break;

			// right row ( bottom-right corner / end of odd row / end of even row )
			case cell.index == totNum:
				neighborlist = [cell.index-widthNum, cell.index-1];
				cell.top = (heightNum - 1) * 0.75;
				cell.left = (widthNum-1);
				break;
			case (cell.index + widthNum -1)%(2*widthNum-1)==0:
				neighborlist = [cell.index-widthNum, cell.index-1, cell.index+widthNum-1];
				cell.top = ((cell.index+widthNum-1)/(2*widthNum-1) * 2 - 2) * 0.75;
				cell.left = (widthNum-1);
				break;
			case cell.index % (2*widthNum-1)==0:
				neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = ( cell.index/(2*widthNum-1) * 2 - 1) * 0.75;
				cell.left = (widthNum-1.5);
				break;

			// bottom row ( middle of bottom row )
			case (totNum - cell.index) < (widthNum - 1) :
				neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+1];
				cell.top = (heightNum - 1) * 0.75;
				cell.left = (widthNum - totNum + cell.index - 1);
				break;

            // not on any borders && on an odd row
            case 1 < cell.index%(2*widthNum-1) && cell.index%(2*widthNum-1) < widthNum:
                neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = Math.floor(cell.index/(2*widthNum-1)) * 2 * 0.75;
				cell.left = (cell.index % (2*widthNum-1) - 1);
                break;
            // not on any borders && on an even row
            case widthNum+1 < cell.index%(2*widthNum-1) && cell.index%(2*widthNum-1) < 2*widthNum - 1:
                neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = (Math.floor(cell.index/(2*widthNum-1)) * 2 + 1) * 0.75;
				cell.left = (cell.index%(2*widthNum-1)-widthNum-1 +0.5);
                break;
		}
		
		neighborlist.forEach((num : number) : void => {
			if(cells[num-1].isBee) cell.neighbor++;
		});
		
        return(cell);
	});
	return( cells2);
}

export const getNeighbor = (index : number, widthNum : number, heightNum : number) : Array<number> => {
	const totNum : number = (widthNum*2-1)*(heightNum-1)*0.5+widthNum;
	switch( true ){
		// first row ( top-left corner / middle of top row / top-right corner )
		case index == 1 :
			return [2, widthNum+1];
		case index < widthNum :
			return [index-1, index+1, index+widthNum-1, index+widthNum];
		case index == widthNum :
			return [widthNum-1, widthNum*2-1] ;
		// left row ( bottom-left corner / start of odd row / start of even row )
		case index == (2*widthNum-1)*(0.5*(heightNum-1))+1 :
			return [index-widthNum+1, index+1];
		case (index-1)%(2*widthNum-1) == 0 :
			return [index-widthNum+1, index+1, index+widthNum];
		case (index-widthNum-1)%(2*widthNum-1) == 0 :
			return [index-widthNum, index-widthNum+1, index+1, index+widthNum-1, index+widthNum];
		// right row ( bottom-right corner / end of odd row / end of even row )
		case index == totNum:
			return [index-widthNum, index-1];
		case (index + widthNum -1)%(2*widthNum-1)==0:
			return [index-widthNum, index-1, index+widthNum-1];
		case index % (2*widthNum-1)==0:
			return [index-widthNum, index-widthNum+1, index-1, index+widthNum-1, index+widthNum];
		// bottom row ( middle of bottom row )
		case (totNum - index) < (widthNum - 1) :
			return [index-widthNum, index-widthNum+1, index-1, index+1];
		// not on any borders && on an odd row
		case 1 < index%(2*widthNum-1) && index%(2*widthNum-1) < widthNum:
			return [index-widthNum, index-widthNum+1, index-1, index+1, index+widthNum-1, index+widthNum];
		// not on any borders && on an even row
		case widthNum+1 < index%(2*widthNum-1) && index%(2*widthNum-1) < 2*widthNum - 1:
			return [index-widthNum, index-widthNum+1, index-1, index+1, index+widthNum-1, index+widthNum];
		default :
			return [];
}}

export const getDimension = (level : number) => {
	const widthNum : any = levelArray.find((elem)=>elem.level==level)?.widthNum;
	const heightNum : any= levelArray.find((elem)=>elem.level==level)?.heightNum;

	const maxHeight : number = window.innerHeight*0.75/(heightNum*0.75);
	const maxWidth : number = window.innerWidth/widthNum;

	let height : number;
	let width : number;

	if(maxHeight*0.5 >= maxWidth/Math.sqrt(3)){
		width = maxWidth;
		height = width*2/Math.sqrt(3);
	} else {
		height = maxHeight;
		width = height*0.5*Math.sqrt(3);
	}
	return {width:width, height:height}
}