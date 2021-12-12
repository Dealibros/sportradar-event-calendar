import styles from '../styles/Home.module.css'
import { useState } from 'react';


export default function EventForm({ sports, showModal, setShowModal }) {
  const [timeDate, setTimeDate] = useState('');
  const [theSport, setTheSport] = useState('');
  const [teamOne, setTeamOne] = useState('');
  const [teamTwo, setTeamTwo] = useState('');

  async function insertSport() {
    const addSport = await fetch('/api/events/', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeDate,
          theSport,
          teamOne,
          teamTwo
        }),
        });
        const sport = await addSport.json();
        window.location.reload();
      }

      const handleClose = () => {
        setShowModal(false)
      }

  return (
showModal && <div className={styles.modalBackdrop} >
  <div className={styles.modal}>
    <form className={styles.newEventForm}
      onSubmit={async (e) => {
        e.preventDefault();
      }}
    >
      <div>
        <h3 className={styles.titleCard}>Add New Event</h3>
        <label>
        <input
          type="datetime-local"
          name="timeDate"
          value={timeDate}
          onChange={(event) => setTimeDate(event.currentTarget.value)}
          required
        />
        </label>

        <label htmlFor="sport-select">Select Sport:
        <select
          name="sport"
          id="sport"
          onChange={(event) => setTheSport(event.currentTarget.value)}
          required
          >

          <option value="Sports" disabled selected hidden>Sports</option>
          {sports.map((sport) => (
            <option key={`sport-${sport.id}`} value={sport.sport}>
              {sport.sport}
            </option>
          ))}
         </select>
         </label>

        <label>
        <input
          type="teamOne"
          name="teamOne"
          value={teamOne}
          onChange={(event) => setTeamOne(event.currentTarget.value)}
          placeholder="Team One"
          required
        />
        </label>

        <label>
        <input
          type="teamTwo"
          name="teamTwo"
          value={teamTwo}
          onChange={(event) => setTeamTwo(event.currentTarget.value)}
          placeholder="Team Two"
          required
        />
        </label>

        <button className={styles.buttonForm} onClick={(event) => {
          event.preventDefault();
          insertSport(
          timeDate,
          theSport,
          teamOne,
          teamTwo
          )
        window.location.reload();
        handleClose()
      }}
          >Create Event</button>
      </div>
    </form>
  </div>
</div>
  );
}
