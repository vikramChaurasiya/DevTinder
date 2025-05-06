import React from 'react'

const Usercard = ({user}) => {
    console.log(user);
    const {firstName,lastName,photoUrl,age,gender, about,skills} = user;
    
  return (
    <div>
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src={user.photoUrl}
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-primary">Interested</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Usercard
