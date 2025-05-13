import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFeed } from '../utils/feedSlice';



const Usercard = ({user}) => {
    // console.log(user);
    const { _id, firstName,lastName, photoUrl ,age,gender, about} = user;
    const dispatch = useDispatch();

    const handelSendRequest = async(status, userId ) => {
      try {
        const res = await axios.post(
          BASE_URL + "/request/send/" + status + "/" + userId,
          {},
          {withCredentials: true},
        )
        dispatch(removeUserFeed(userId));


      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div>
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src={photoUrl}
                alt="photo"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => handelSendRequest("ignored", _id)}>Ignore</button> 
                <button className="btn btn-primary" onClick={() => handelSendRequest("interested" , _id)} >Interested</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Usercard
