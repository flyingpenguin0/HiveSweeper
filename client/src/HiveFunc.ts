import { Window } from "./modules/game";

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

export const Shuffle = (beeNum : number, widthNum : number, heightNum : number ) : Array<Cell> => {
	//const width : number = Math.floor(window.innerWidth/widthNum);
	//const height : number = width*2/Math.sqrt(3);
	const height : number = Math.floor(window.innerHeight*0.8/(heightNum*0.75));
	const width : number = 0.5*height*Math.sqrt(3);
	const totNum : number = (widthNum*2-1)*(heightNum-1)*0.5+widthNum;

	/* let list : Array<number> = [Array.from(Array(totNum).keys())].map((x) =>{
			return(x++)
		}); */
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
				cell.left = (cell.index-1) * width;
				break;
			case cell.index == widthNum :
				neighborlist = [widthNum-1, widthNum*2-1] ;
				cell.top = 0;
				cell.left = (widthNum-1)*width;
				break;

			// left row ( bottom-left corner / start of odd row / start of even row )
			case cell.index == (2*widthNum-1)*(0.5*(heightNum-1))+1 :
				neighborlist = [cell.index-widthNum+1, cell.index+1];
				cell.top = (heightNum - 1) * 0.75 * height;
				cell.left = 0;
				break;
			case (cell.index-1)%(2*widthNum-1) == 0 :
				neighborlist = [cell.index-widthNum+1, cell.index+1, cell.index+widthNum];
				cell.top = (cell.index - 1)/(2*widthNum-1) * 2 * 0.75 * height;
				cell.left = 0;
				break;
			case (cell.index-widthNum-1)%(2*widthNum-1) == 0 :
				neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = ((cell.index-widthNum-1)/(2*widthNum-1)* 2 + 1) * 0.75 * height;
				cell.left = 0.5*width;
				break;

			// right row ( bottom-right corner / end of odd row / end of even row )
			case cell.index == totNum:
				neighborlist = [cell.index-widthNum, cell.index-1];
				cell.top = (heightNum - 1) * 0.75 * height;
				cell.left = (widthNum-1)*width;
				break;
			case (cell.index + widthNum -1)%(2*widthNum-1)==0:
				neighborlist = [cell.index-widthNum, cell.index-1, cell.index+widthNum-1];
				cell.top = ((cell.index+widthNum-1)/(2*widthNum-1) * 2 - 2) * 0.75 * height;
				cell.left = (widthNum-1)*width;
				break;
			case cell.index % (2*widthNum-1)==0:
				neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = ( cell.index/(2*widthNum-1) * 2 - 1) * 0.75 * height;
				cell.left = (widthNum-1.5)*width;
				break;

			// bottom row ( middle of bottom row )
			case (totNum - cell.index) < (widthNum - 1) :
				neighborlist = [cell.index-widthNum-1, cell.index-widthNum, cell.index-1, cell.index+1];
				cell.top = (heightNum - 1) * 0.75 * height;
				cell.left = (widthNum - totNum + cell.index - 1) * width;
				break;

            // not on any borders && on an odd row
            case 1 < cell.index%(2*widthNum-1) && cell.index%(2*widthNum-1) < widthNum:
                neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = Math.floor(cell.index/(2*widthNum-1)) * 2 * 0.75 * height ;
				cell.left = (cell.index % (2*widthNum-1) - 1) * width ;
                break;
            // not on any borders && on an even row
            case widthNum+1 < cell.index%(2*widthNum-1) && cell.index%(2*widthNum-1) < 2*widthNum - 1:
                neighborlist = [cell.index-widthNum, cell.index-widthNum+1, cell.index-1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = (Math.floor(cell.index/(2*widthNum-1)) * 2 + 1) * 0.75 * height;
				cell.left = (cell.index%(2*widthNum-1)-widthNum-1 +0.5)*width;
                break;
		}
		
		neighborlist.forEach((num : number) : void => {
			if(cells[num-1].isBee) cell.neighbor++;
		});
		
        return(cell);
	});
	console.log(cells2);
	return( cells2);
}

export const timeFormatter = (num : number) : string | undefined => {
	if(num>=3600 && num<=86400) return `${Math.floor(num/3600)}Hr ${Math.floor((num%3600)/60)}Min  ${num%60}Sec}`;
	else if(num<3600 && num>=60) return `${Math.floor(num/60)}Min ${num%60}Sec`;
	else if(num<60 && num>=0) return `${num}Sec`;
}