import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

function EventList({ sports, showModal, setShowModal }) {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');

  // To show the events from only the selected sport
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
        const allEvents = await response.json();
        setEvents(allEvents);
      }
      getEvents();
    }
  }, [filter]);

  // check if the event should be deleted

  const handleDelete = async (item) => {
    const answer = window.confirm(
      `Are you sure you want to delete this event:
      ${item.sport} on ${format(
        new Date(item.timedate),
        'eee., dd.MM.yyyy, HH:mm',
      )}?`,
    );

    // to Delete selected event

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
        <select
          className={styles.select}
          name="sport"
          id="sport-filter"
          onChange={(e) => setFilter(e.currentTarget.value)}
        >
          <option value="">All Sports</option>
          {sports.map((sport) => (
            <option key={`choose-sport-${sport.id}`} value={sport.sport}>
              {sport.sport}
            </option>
          ))}
        </select>
        <br />
        <button
          className={styles.buttonCreateEvent}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create New Event
        </button>
      </div>
      <ol>
        {events.map((event) => (
          <div key={`event-${event.id}`} className={styles.card}>
            <ol>
              <div>
                <h2>{`${event.sport}`}</h2>
                <h2>{`${event.teamone} - ${event.teamtwo}`}</h2>
                <h3>{`${format(
                  new Date(event.timedate),
                  'eee. dd.MM.yyyy, HH:mm',
                )}`}</h3>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(event)}
                >
                  <FontAwesomeIcon
                    size="sm"
                    icon={faTrashAlt}
                    aria-hidden="true"
                    title="Delete item"
                  />{' '}
                  Delete
                </button>
              </div>
            </ol>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default EventList;
