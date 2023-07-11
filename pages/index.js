
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';

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
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.paragraph}>
          I'm Justin Zhu, a junior at the University of Utah, deeply passionate about exploring the limitless possibilities of computer science. With a solid foundation in programming, algorithms, and data structures, I've tackled diverse challenges and honed my skills. Through collaborative assignments and personal projects, I've developed effective teamwork, communication, and adaptability.
        </p>
        <p className={utilStyles.para2}>Personal Projects:</p>
        <a href="/posts/SM64Difference" className={utilStyles.link}>Check Out The Current Super Mario 64: 16 Star Leaderboards!</a>
        <br/>
        <br/>
        <a href="/posts/NBARandomPlayers" className={utilStyles.link}>First Post</a>
      </section>
    </Layout>
  );
}