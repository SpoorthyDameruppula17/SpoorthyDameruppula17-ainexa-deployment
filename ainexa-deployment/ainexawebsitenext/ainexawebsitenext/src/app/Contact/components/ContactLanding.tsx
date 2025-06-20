'use client';

import React from "react";
import Text from "../../../componets/Text";
import styles from '../css/ContactLanding.module.css';

const ContactLanding = () => {
  return (
    <div>
      <div className={styles.contactContainer}>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.34203530906!2d78.2432323956461!3d17.41228101562799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1748456443785!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>

        <div className={styles.formContainer}>
          <Text text="Drop us a Line" style={{ textAlign: "center" }} />
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Description" rows={5} required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <Text text="Ainexa" style={{ fontWeight: "bold" }} />

        <Text
          text="📧 General Inquiries: contact@ainexa.in"
          style={{ display: "block" }}
        />
        <Text
          text="📧 Careers: hr@ainexa.in"
          style={{ display: "block" }}
        />

        <Text text="Hours" style={{ marginTop: 20, fontWeight: "bold" }} />
        <ul className={styles.hoursList}>
          <li>
            <Text text="Mon – Fri: 10:00 am – 08:00 pm" />
          </li>
          <li>
            <Text text="Sat – Sun: Closed" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactLanding;
