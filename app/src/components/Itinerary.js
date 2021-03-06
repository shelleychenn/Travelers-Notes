import React from 'react';
import ItineraryEntry from './ItineraryEntry';

const Itinerary = ({ itineraryEntries, deleteItineraryEntry }) => {
  return (
    <div className="itinerary">
      <table className="itinerary-table">
        <thead>
          <tr>
            <th className="date">Date</th>
            <th className="time">Time</th>
            <th className="activity">Activity</th>
            <th className="location">Location</th>
            <th className="budget">Budget</th>
            <th className="notes">Notes</th>
          </tr>
        </thead>
        <br />
        <tbody>
          {itineraryEntries.map((itineraryEntry, index) => (
            <>
              <ItineraryEntry
                itineraryEntry={itineraryEntry}
                key={index}
                deleteItineraryEntry={deleteItineraryEntry}
              />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Itinerary;
