import db from '../../models';

const postTrip = async body => db.TripRequest.create(body);
export default postTrip;
