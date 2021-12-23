export type Cell = {
	index : number;
	isBee : boolean;
	neighbor : number;
	isOpen : boolean;
	isFlagged : boolean;
	isQuestion : boolean;
	top : number;
	left : number;
}

const Shuffle = (beeNum : number, widthNum : number, heightNum : number ) =>{
	const width : number = 100;
	const height : number = 0.5*width*Math.sqrt(3);
	const totNum : number = (widthNum*2+1)*heightNum*0.5;

	let list : Array<number> = [...Array(totNum).keys()];
	let shuffledList : Array<number> = list
		.map((value) => ({ value, sort: Math.random() }))
 		.sort((a, b) => a.sort - b.sort)
 		.map(({ value }) => value);
	let beeList = shuffledList.splice(beeNum, totNum-beeNum);
	
	let cells : Cell[] = list.map(cell => {
		if(beeList.includes(cell)){
			return({index:cell, isBee:true, neighbor:0, isOpen:false, isFlagged:false, isQuestion:false, top:0, left:0});
		} else {
			return({index:cell, isBee:false, neighbor:0, isOpen:false, isFlagged:false, isQuestion:false, top:0, left:0});
		}
	});

	let cells2 : Cell[] = cells.map(cell => {
		let neighborlist : Array<number> = [];
		Switch( cell.index ){
			// first row ( top-left corner / middle of top row / top-right corner )
			case 1 :
				neighborlist = [2, widthNum+1];
				cell.top = 0;
				cell.left = 0;
				break;
			case widthNum :
				neighborlist = [widthNum-1, widthNum*2-1];
				cell.top = 0;
				cell.left = (cell.index-1) * width;
				break;
			case cell.index < widthNum :
				neighborlist = [cell.index-1, cell.index+1, cell.index+widthNum-1, cell.index+widthNum];
				cell.top = 0;
				cell.left = (widthNum-1)*width;
				break;

			// left row ( bottom-left corner / start of odd row / start of even row )
			case (2*widthNum-1)*(0.5*heightNum-1)+1 :
				neighborlist = [cell.index-widthNum+1, cell.index+1];
				cell.top = 0;
				cell.left = 0;
				break;
			case (cell.index-1)%(2*widthNum-1) == 0 :
				neighborlist = [];
				cell.top = (cell.index - 1)/(2*widthNum-1) * 0.75 * height;
				cell.left = 0;
				break;
			case (cell.index-widthNum-1)%(2*widthNum-1) == 0 :
				neighborlist = [];
				cell.top = 0;
				cell.left = 0.5*width;
				break;

			// right row ( bottom-right corner / end of odd row / end of even row )
			case :
				neighborlist = [];
				break;
			case :
				neighborlist = [];
				break;
			case :
				neighborlist = [];
				break;

			// bottom row ( middle of bottom row )
			case :
				neighborlist = [];
				break;
		}

		let neighBeeNum : number = 0;
		if(
		neighbor.forEach(num => {
			if(cells[num-1].isBee) neighBeeNum++;
		});
		
        return(cell);
	});
}