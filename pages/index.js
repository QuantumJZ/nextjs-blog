
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <style>{`
          body {
            background-color: ${isDarkMode ? '#000' : '#fff'};
            color: ${isDarkMode ? '#fff' : '#000'};
          }
        `}</style>
      </Head>
      <div className="center">
        <Link href="https://github.com/QuantumJZ"><Image priority src="/images/GithubLogo.jpg" className={utilStyles.borderSquare} height={50} width={50} alt=""/></Link>
      </div>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.paragraph}>
          I'm Justin Zhu, a junior at the University of Utah, deeply passionate about exploring the limitless possibilities of computer science. With a solid foundation in programming, algorithms, and data structures, I've tackled diverse challenges and honed my skills. Through collaborative assignments and personal projects, I've developed effective teamwork, communication, and adaptability.
        </p>
        <p className={utilStyles.para2}>Personal Projects:</p>
        <a href="/posts/NBARandomPlayers" className={utilStyles.link}>Test Your NBA Knowledge</a>
        <br/>
        <br/>
        <a href="/posts/NumberPlacementGame" className={utilStyles.link}>Play The 20 Number Challenge</a>
        <br/>
        <br/>
        <a href="/posts/SM64Difference" className={utilStyles.link}>Check Out The Current Super Mario 64: 16 Star Leaderboards!</a>
      </section>
    </Layout>
  );
}