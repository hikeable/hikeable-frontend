import Image from 'next/image'
import Link from 'next/link';

  
import styles from "../styles/landing.module.css"

export const Landing = ({}) => {
    
    return (
        <>
            <div className='landing_background'
            >
                <Image
                src={"/michael-chiara-QlY4oiFbT9o-unsplash.webp"}
                alt="Background Image of some people walking a trail"
                fill
                objectFit='cover'
                />
            </div>
           
            <h1
            className={styles.h1}
             >Hiking.Simplified
            </h1>

            <p
            className={styles.p}
            > 
            <Link href="/searchbypref">
                Start Walking
            </Link>
            </p>
        
        
        </>
    );
}
