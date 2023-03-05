import React from "react"
import styles from "../styles/footer.module.css";


export const Footer = () => {

    const year = new Date().getFullYear();

    return (

            <footer className={styles.footer_style}>{`Copyright © Hikeable ${year}`}</footer>

        
    );

}