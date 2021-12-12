import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function EventList({ sports, showModal, setShowModal  }) {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      async function filterEvents() {
        const response = await fetch(`/api/sports/${filter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const filterEvent = await response.json();
        setEvents(filterEvent);
      }
      filterEvents();
    } else {
      async function getEvents() {
        const response = await fetch(`/api/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const allEvents= await response.json();
        setEvents(allEvents);
      }
      getEvents();
    }
  }, [filter]);

  const handleDelete = async (item) => {
    const answer = window.confirm(
      `Are you sure you want to delete the event:
      ${item.sport} on ${format(
        new Date(item.timedate),
        'eee., dd.MM.yyyy, HH:mm',
      )}?`
    );

    if (answer === true) {
      await fetch(`/api/events/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item.id,
        }),
      });
      window.location.reload();
    }
  };

  return (
    <div>
      <h3 className={styles.secondTitle}>All Events</h3>
      <div className={styles.topDiv}>
      <select className={styles.select}
        name="sport"
        id="sport-filter"
        onChange={(e) => setFilter(e.currentTarget.value)}
      >

        <option value="">Select Sport</option>
        {sports.map((sport) => (
          <option key={`choose-sport-${sport.id}`} value={sport.sport}>
            {sport.sport}
          </option>
        ))}
      </select>
      <br/>
      <button className={styles.buttonCreateEvent} onClick={()=>{setShowModal(true)}}>Create New Event</button>
      </div>
      <ol>
        {events.map((event) => (
          <div className={styles.card}>
          <ol key={`event-${event.id}`}>
            <div>
              <h2>{`${event.sport}`}</h2>
              <h2>{`${event.teamone} - ${event.teamtwo}`}</h2>
               <h3>{`${format(new Date(event.timedate),
                'eee. dd.MM.yyyy, HH:mm')}`}</h3>
              <button className={styles.deleteButton} onClick={() => handleDelete(event) }>
              <FontAwesomeIcon
                size="m"
                icon={faTrashAlt}
                aria-hidden="true"
                title="Delete item"
                /> Delete</button>
            </div>
          </ol>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default EventList;
