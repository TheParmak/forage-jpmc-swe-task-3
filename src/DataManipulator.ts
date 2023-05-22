import { ServerRespond } from './DataStreamer';

export interface Row {
  stock: string,
  top_ask_price: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
	const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
	const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
	const ratio = priceABC / priceDEF;
	const upperBound = 1 + 0.05;
	const lowerBound = 1 - 0.05;
    // return serverResponds.map((el: any) => {

	return {
		price_abc: priceABC,
		price_def: priceDEF,
		ratio,
		timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
		upper_bound: upperBound,
		lower_bound: lowerBound,
		trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
		// stock: el.stock,
		// top_ask_price: el.top_ask && el.top_ask.price || 0,
		// timestamp: el.timestamp,
	};
    // })
  }
}
